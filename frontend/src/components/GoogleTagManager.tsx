"use client";
import Script from "next/script";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
// Your server-side GTM container URL (prevents ad-blocker drop-off)
// e.g. https://gtm.creeklend.com  — falls back to standard GTM if not set
const GTM_SERVER_URL =
    process.env.NEXT_PUBLIC_GTM_SERVER_URL || "https://www.googletagmanager.com";

export function GTMScript() {
    if (!GTM_ID) return null;

    return (
        <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
                __html: `
(function(w,d,s,l,i){
  w[l]=w[l]||[];
  w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
  var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
  j.async=true;
  j.src='${GTM_SERVER_URL}/gtm.js?id='+i+dl;
  f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');
`,
            }}
        />
    );
}

export function GTMNoScript() {
    if (!GTM_ID) return null;

    return (
        <noscript>
            <iframe
                src={`${GTM_SERVER_URL}/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
            />
        </noscript>
    );
}

/**
 * Push a custom event to the GTM dataLayer.
 * Useful for funnel step progressions and conversion events.
 *
 * Example usage:
 *   pushDataLayerEvent('form_step_complete', { step: 2, stepName: 'Identification' });
 *   pushDataLayerEvent('application_submitted', { applicationId: 'abc-123' });
 */
export function pushDataLayerEvent(event: string, payload?: Record<string, unknown>) {
    if (typeof window === "undefined") return;
    const w = window as any;
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({ event, ...payload });
}
