"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const application_1 = __importDefault(require("./routes/application"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Main Routes
app.use('/api/applications', application_1.default);
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Creek Lend API is running' });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
