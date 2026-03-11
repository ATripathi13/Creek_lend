import dotenv from 'dotenv';
const result = dotenv.config();

if (result.error) {
    console.error('Dotenv error:', result.error);
} else {
    console.log('Environment variables loaded successfully.');
}

console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);

import express from 'express';
import cors from 'cors';
import applicationRoutes from './routes/application';

const app = express();
const PORT = process.env.PORT || 8000;

console.log('Starting server initialization...');

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'cf-ipcountry', 'x-country-code'],
    credentials: true
}));

app.use(express.json());

// Main Routes
app.use('/api/applications', applicationRoutes);

app.get('/health', (req, res) => {
    console.log('Health check requested');
    res.status(200).json({ status: 'ok', message: 'Creek Lend API is running' });
});

// Global Error Handler
app.use((err: any, req: any, res: any, next: any) => {
    console.error('SERVER ERROR:', err.message);
    if (err instanceof SyntaxError && 'body' in err) {
        console.error('Body Parser Error:', err.message);
        return res.status(400).json({ success: false, error: 'Bad Request', message: 'Invalid JSON payload' });
    }
    res.status(500).json({ success: false, error: 'Internal Server Error', message: err.message });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Server process ID:', process.pid);
});

// Keep process alive
process.stdin.resume();

process.on('exit', (code) => {
    console.log(`Process exited with code: ${code}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});
