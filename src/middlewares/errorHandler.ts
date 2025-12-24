import { Request, Response, NextFunction } from 'express';
import { AppError } from '../exceptions/AppError';

interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    statusCode: number;
  };
  timestamp: string;
  path: string;
}

export const errorHandler = (
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isAppError = error instanceof AppError;

  const statusCode = isAppError ? error.statusCode : 500;
  const code = isAppError ? error.code : 'INTERNAL_SERVER_ERROR';
  const message = error.message || 'Erro interno do servidor';

  const response: ErrorResponse = {
    success: false,
    error: {
      code,
      message,
      statusCode,
    },
    timestamp: new Date().toISOString(),
    path: req.path,
  };

  console.error(`[${code}] ${message}`, {
    path: req.path,
    method: req.method,
    statusCode,
    stack: error.stack,
  });

  res.status(statusCode).json(response);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
