import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fileRoutes from './routes/fileRoutes';
import printerRoutes from './routes/printerRoutes';
import healthRoutes from './routes/healthRoutes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Express = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/printer', printerRoutes);

// Error handling
app.use(errorHandler);

export default app;
