import { buildJsonSchema, ErfgoedzoekerConfigSchema } from '@erfgoedzoeker/config-schema';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const APP_ROOT = resolve(import.meta.dirname, '../../../..');

describe('erfgoedzoeker.config.schema.json', () => {
  it('is in sync with the Zod schema — run `pnpm generate:config-schema` to fix', () => {
    const currentJsonSchema = readFileSync(
      resolve(APP_ROOT, 'public/config/erfgoedzoeker.config.schema.json'),
      'utf-8',
    );

    expect(buildJsonSchema(ErfgoedzoekerConfigSchema)).toBe(currentJsonSchema);
  });
});

describe('erfgoedzoeker.config.json', () => {
  it('is valid against the Zod schema', () => {
    const raw = JSON.parse(
      readFileSync(
        resolve(APP_ROOT, 'public/config/erfgoedzoeker.config.json'),
        'utf-8',
      ),
    );

    const result = ErfgoedzoekerConfigSchema.safeParse(raw);

    if (!result.success) {
      expect(result.error.issues).toEqual([]);
    } else {
      expect(result.success).toBe(true);
    }
  });
});
