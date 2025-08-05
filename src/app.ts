import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import pino from 'pino';
import swaggerUi from 'swagger-ui-express';

import healthRoutes from './routes/health';
import palindromeRoutes from './routes/palindrome';
import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';
import { requestContext, idAndTiming } from './middleware/requestContext';
import { generateOpenAPIDocument } from './docs/openapi';

const app = express();
const logger = pino({level: 'info'});

app.use(requestContext);  
app.use(idAndTiming);   
app.use(helmet());
app.use(cors({ origin: '*', methods: ['GET'] }));
app.use(express.json({ limit: '10kb' }));

app.use(rateLimit({
  windowMs: 60_000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false
}));


app.use('/health', healthRoutes);
app.use('/', palindromeRoutes);

const openapiDoc = generateOpenAPIDocument();
app.get('/openapi.json', (_req, res) => res.json(openapiDoc));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openapiDoc, {
  explorer: true,
  customSiteTitle: 'Palindrome API Docs'
}));


app.use(notFound);
app.use(errorHandler);

export default app;