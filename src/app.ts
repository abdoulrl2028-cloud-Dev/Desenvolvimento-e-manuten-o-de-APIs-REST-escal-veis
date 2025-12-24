import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import config from './config';
import { errorHandler } from './middlewares/errorHandler';
import { loggerMiddleware, corsMiddleware, securityHeaders } from './middlewares';
import routes from './routes';

const app: Express = express();

// Middlewares de segurança
app.use(helmet());

// CORS configurável
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(loggerMiddleware);

// Headers de segurança
app.use(securityHeaders);

// Rotas
app.use(routes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Rota ${req.method} ${req.path} não encontrada`,
      statusCode: 404,
    },
  });
});

// Error handler (deve ser o último middleware)
app.use(errorHandler);

export default app;
