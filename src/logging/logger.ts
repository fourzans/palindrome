import pino from 'pino';

const isProd = process.env.NODE_ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isProd ? undefined : {
    target: 'pino-pretty',
    options: { singleLine: true }
  },
  redact: {
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'req.body.password'
    ],
    remove: true
  },
  base: {
    service: 'polyandrome-service',
    env: process.env.NODE_ENV || 'dev'
  },
  msgPrefix: ''
});
