import dotenv from 'dotenv';

dotenv.config();

const config = {
  app: {
    env: process.env.NODE_ENV || 'development',
    name: process.env.APP_NAME || 'API REST',
    port: Number.parseInt(process.env.PORT || '3000', 10),
    isDev: process.env.NODE_ENV === 'development',
    isProd: process.env.NODE_ENV === 'production',
  },

  database: {
    host: process.env.DB_HOST || 'localhost',
    port: Number.parseInt(process.env.DB_PORT || '5432', 10),
    name: process.env.DB_NAME || 'api_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres123',
  },

  jwt: {
    secret: process.env.JWT_SECRET || 'secret_key_change_in_production',
    expiration: process.env.JWT_EXPIRATION || '24h',
  },

  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true,
  },

  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined',
  },

  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number.parseInt(process.env.REDIS_PORT || '6379', 10),
    db: Number.parseInt(process.env.REDIS_DB || '0', 10),
  },
};

export default config;
