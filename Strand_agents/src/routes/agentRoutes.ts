import { Router, Request, Response } from 'express';
import { orchestrator } from '../services/orchestrator';

const router = Router();

// Health check
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'healthy', service: 'strands-agent', timestamp: new Date() });
});

// Document reasoning endpoint
router.post('/reason', async (req: Request, res: Response) => {
  try {
    const { document, query } = req.body;

    if (!document || !query) {
      res.status(400).json({ error: 'document and query required' });
      return;
    }

    const result = await orchestrator.processTask({
      type: 'document_analysis',
      content: document,
      query,
    });

    res.json({
      success: true,
      analysis: result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Printer task endpoint
router.post('/printer-task', async (req: Request, res: Response) => {
  try {
    const { taskId, action, documentId, parameters } = req.body;

    if (!action) {
      res.status(400).json({ error: 'action required' });
      return;
    }

    const result = await orchestrator.processTask({
      type: 'printer_task',
      parameters: { taskId, action, documentId, parameters },
    });

    res.json({
      success: true,
      taskStatus: result,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
