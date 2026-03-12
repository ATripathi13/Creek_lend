import crypto from 'crypto';

/** SHA-256 hash a value (lowercased) as required by Meta CAPI */
function sha256(value: string): string {
    return crypto.createHash('sha256').update(value.toLowerCase().trim()).digest('hex');
}

export interface CapiEventPayload {
    eventName: string;         // e.g. 'Lead', 'CompleteRegistration'
    eventId: string;           // Deduplication ID — pass applicationId
    sourceUrl: string;         // The page URL where conversion happened
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    clientIp?: string;
    clientUserAgent?: string;
    fbClickId?: string;        // fbclid cookie if captured
    fbBrowserId?: string;      // _fbp cookie if captured
    customData?: Record<string, unknown>;
}

/**
 * Fires a server-side conversion event to the Meta Conversions API.
 *
 * How it works:
 *  1. The browser-side Meta Pixel fires a client event (uses fbq).
 *  2. Simultaneously, we fire the same event from our Node.js server
 *     via CAPI using the same `eventId` for deduplication.
 *  3. Meta de-dupes browser + server hits, giving us full coverage
 *     even when users have ad-blockers or iOS privacy restrictions.
 *
 * Docs: https://developers.facebook.com/docs/marketing-api/conversions-api/
 */
export async function sendCapiEvent(payload: CapiEventPayload): Promise<void> {
    const pixelId = process.env.META_PIXEL_ID;
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (!pixelId || !accessToken) {
        console.warn('[CAPI] META_PIXEL_ID or META_ACCESS_TOKEN not set — skipping.');
        return;
    }

    const userData: Record<string, string> = {};
    if (payload.email) userData.em = sha256(payload.email);
    if (payload.phone) userData.ph = sha256(payload.phone.replace(/\D/g, ''));
    if (payload.firstName) userData.fn = sha256(payload.firstName);
    if (payload.lastName) userData.ln = sha256(payload.lastName);
    if (payload.clientIp) userData.client_ip_address = payload.clientIp;
    if (payload.clientUserAgent) userData.client_user_agent = payload.clientUserAgent;
    if (payload.fbClickId) userData.fbc = payload.fbClickId;
    if (payload.fbBrowserId) userData.fbp = payload.fbBrowserId;

    const eventTime = Math.floor(Date.now() / 1000); // Unix timestamp

    const body: Record<string, unknown> = {
        data: [
            {
                event_name: payload.eventName,
                event_time: eventTime,
                event_id: payload.eventId,      // Used for browser-server deduplication
                event_source_url: payload.sourceUrl,
                action_source: 'website',
                user_data: userData,
                custom_data: payload.customData ?? {},
            },
        ],
    };

    // In development / staging, add the test event code to see events in
    // Meta Events Manager → Test Events tab without affecting live data.
    if (process.env.META_TEST_EVENT_CODE) {
        body.test_event_code = process.env.META_TEST_EVENT_CODE;
    }

    const url = `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const result = await response.json();

        if (!response.ok) {
            console.error('[CAPI] FB API error:', JSON.stringify(result));
        } else {
            console.log(`[CAPI] Event "${payload.eventName}" sent. events_received: ${result.events_received}`);
        }
    } catch (err) {
        // Fire-and-forget: log but never throw — submission must not fail due to CAPI issue
        console.error('[CAPI] Network error sending CAPI event:', err);
    }
}
