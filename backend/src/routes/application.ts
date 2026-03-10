import { Router } from 'express';
import { submitApplication, bankLookup } from '../controllers/application';
import { geofenceMiddleware } from '../middleware/geofence';

const router = Router();

// Apply geofencing to all application routes
router.use(geofenceMiddleware);

router.post('/', submitApplication);
router.get('/bank-lookup/:routingNumber', bankLookup);

export default router;
