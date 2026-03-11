import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import applicationRoutes from './routes/application';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

// Main Routes
app.use('/api/applications', applicationRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'Creek Lend API is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
