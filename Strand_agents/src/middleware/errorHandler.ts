import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Agent Error:', err.message);

  res.status(500).json({
    error: {
      message: err.message || 'Internal Agent Error',
      timestamp: new Date().toISOString(),
    },
  });
};
