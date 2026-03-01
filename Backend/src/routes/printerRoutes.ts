import { Router, Request, Response } from 'express';
import { strandsAgent } from '../clients/strandsAgentClient';
import { PrinterTaskResponse } from '../types';

const router = Router();

// Execute a printer task via strands agent
router.post('/task', async (req: Request, res: Response) => {
  try {
    const { action, documentId, parameters } = req.body;

    if (!action) {
      res.status(400).json({ error: 'action required' });
      return;
    }

    const task = {
      taskId: `task-${Date.now()}`,
      action,
      documentId,
      parameters,
    };

    const response: PrinterTaskResponse = await strandsAgent.executePrinterTask(task);

    res.json({
      success: true,
      task: response,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get printer status
router.get('/status', (req: Request, res: Response) => {
  res.json({
    status: 'ready',
    message: 'Printer service operational',
  });
});

export default router;
