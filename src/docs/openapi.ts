import { OpenAPIRegistry, OpenApiGeneratorV3, extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);

export const registry = new OpenAPIRegistry();

// Schemas
export const PolyQuerySchema = z.object({
  q: z.string().min(1).max(2048).openapi({ description: 'String to check' }),
  strict: z.boolean().default(false).openapi({ description: 'Strict mode (do not strip non-alphanumerics)' })
});

export const PolyResponseSchema = z.object({
  query: z.string(),
  strict: z.boolean(),
  isPalindrome: z.boolean()
});

// Register endpoint
registry.registerPath({
  method: 'get',
  path: '/polyandrome',
  description: 'Checks if q is a palindrome',
  summary: 'Palindrome check',
  tags: ['polyandrome'],
  request: {
    query: PolyQuerySchema
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: PolyResponseSchema }
      }
    },
    400: { description: 'Bad request' },
    404: { description: 'Not found (feature disabled)' }
  }
});

export function generateOpenAPIDocument() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  return generator.generateDocument({
    openapi: '3.0.3',
    info: {
      title: 'Palindrome Service',
      version: '1.0.0',
      description: 'Production-ready palindrome checker'
    },
    servers: [{ url: '/' }]
  });
}
