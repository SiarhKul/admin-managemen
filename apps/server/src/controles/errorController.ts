import { Request, Response } from 'express';
import { DatabaseError } from '../dtos/errors';

export const errorHandler = (err: Error, req: Request, res: Response) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
  });

  if (err instanceof DatabaseError) {
    return res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
  }

  res.status(500).json({
    error: 'Internal server error',
    statusCode: 500,
  });
};
