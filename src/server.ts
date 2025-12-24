import app from './app';
import config from './config';

const startServer = (): void => {
  const server = app.listen(config.port, () => {
    console.log(`
    ╔════════════════════════════════════════════════════╗
    ║     API REST Escalável iniciada com sucesso        ║
    ╠════════════════════════════════════════════════════╣
    ║  Porta: ${config.port}
    ║  Ambiente: ${config.nodeEnv}
    ║  URL: http://localhost:${config.port}
    ║  Health: http://localhost:${config.port}/health
    ╚════════════════════════════════════════════════════╝
    `);
  });

  // Graceful shutdown
  process.on('SIGTERM', () => {
    console.log('SIGTERM recebido, encerrando servidor...');
    server.close(() => {
      console.log('Servidor encerrado');
      process.exit(0);
    });
  });

  process.on('SIGINT', () => {
    console.log('SIGINT recebido, encerrando servidor...');
    server.close(() => {
      console.log('Servidor encerrado');
      process.exit(0);
    });
  });

  // Uncaught exception handler
  process.on('uncaughtException', error => {
    console.error('Exceção não tratada:', error);
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error('Rejeição não tratada:', reason);
    process.exit(1);
  });
};

startServer();
