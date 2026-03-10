"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.geofenceMiddleware = void 0;
const ALLOWED_COUNTRIES = ['US', 'CA', 'IN'];
const geofenceMiddleware = (req, res, next) => {
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
exports.geofenceMiddleware = geofenceMiddleware;
