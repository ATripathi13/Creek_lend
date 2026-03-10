import { Request, Response, NextFunction } from 'express';

const ALLOWED_COUNTRIES = ['US', 'CA', 'IN'];

export const geofenceMiddleware = (req: Request, res: Response, next: NextFunction) => {
    // In production, this would typically come from Cloudflare (CF-IPCountry) 
    // or a Geo-IP lookup service based on req.ip.
    const country = req.header('cf-ipcountry') || req.header('x-country-code');

    // For development bypass: Allow if no country header is present OR if in development mode
    if (process.env.NODE_ENV === 'development' && !country) {
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
