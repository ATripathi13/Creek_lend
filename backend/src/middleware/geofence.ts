import { Request, Response, NextFunction } from 'express';

const ALLOWED_COUNTRIES = ['US', 'CA', 'IN'];

export const geofenceMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // For development bypass: Allow localhost/loopback
    const isLocalhost = req.ip === '::1' || req.ip === '127.0.0.1' || req.hostname === 'localhost';

    // In production, this would typically come from Cloudflare (CF-IPCountry) 
    const country = req.header('cf-ipcountry') || req.header('x-country-code');

    // If we're on localhost or no country header is detected (dev-mode behavior)
    if (isLocalhost || !country) {
        return next();
    }

    if (country && ALLOWED_COUNTRIES.includes(country.toUpperCase())) {
        return next();
    }

    // Block all other traffic
    res.status(403).json({
        error: 'Access Forbidden',
        message: 'Creek Lend is only available in supported regions (US, CA, IN).'
    });
};
