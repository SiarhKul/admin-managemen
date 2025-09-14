import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from '../errors/index';
import { ErrorResponse } from '../errors/ErrorResponse';

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
    return res
      .status(err.statusCode)
      .json(new ErrorResponse(err.statusCode, err.message));
  }

  res.status(500).json(new ErrorResponse(500, err.message));
};
