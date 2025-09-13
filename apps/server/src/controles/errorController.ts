import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from '../dtos/errors';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString(),
  });

  if (err instanceof DatabaseError) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
      timestamp: new Date().toISOString(),
    });
  }

  res.status(500).json({
    error: err.message,
    statusCode: 500,
    timestamp: new Date().toISOString(),
  });
};
