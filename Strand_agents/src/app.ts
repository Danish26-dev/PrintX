import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import agentRoutes from './routes/agentRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api', agentRoutes);

// Error handling
app.use(errorHandler);

export default app;
