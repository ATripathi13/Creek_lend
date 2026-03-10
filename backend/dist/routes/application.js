"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const application_1 = require("../controllers/application");
const geofence_1 = require("../middleware/geofence");
const router = (0, express_1.Router)();
// Apply geofencing to all application routes
router.use(geofence_1.geofenceMiddleware);
router.post('/', application_1.submitApplication);
router.get('/bank-lookup/:routingNumber', application_1.bankLookup);
exports.default = router;
