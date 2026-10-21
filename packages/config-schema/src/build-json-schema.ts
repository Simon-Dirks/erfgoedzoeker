import * as z from 'zod';

export function buildJsonSchema(rootSchema: z.ZodType): string {
  const schema = z.toJSONSchema(rootSchema, {
    target: 'draft-2020-12',
    reused: 'inline',
  });

  const output = {
    $comment:
      'Auto-generated — do not edit directly. Run `pnpm generate:config-schema` to regenerate this file from packages/config-schema/src/erfgoedzoeker-config.schema.ts.',
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: 'https://erfgoedzoeker.nl/config/erfgoedzoeker.config.schema.json',
    ...schema,
  };

  return JSON.stringify(output, null, 2) + '\n';
}
