import * as z from 'zod';

export const ApiConfigSchema = z
  .object({
    type: z.enum(['graphql', 'rest', 'mock']).default('graphql').meta({
      title: 'API type',
      description: 'The protocol used by the integration layer.',
    }),
    baseUrl: z
      .string()
      .optional()
      .meta({
        title: 'Integration layer URL',
        examples: [
          'http://localhost:4000/graphql',
          'https://datalaag.erfgoedzoeker.nl/v1',
        ],
        description:
          'Required when type is "graphql" or "rest". Not used when type is "mock".',
      }),
  })
  .meta({
    title: 'Integration layer',
    description: 'Connection to the integration layer.',
  });

export type ApiConfig = z.infer<typeof ApiConfigSchema>;
