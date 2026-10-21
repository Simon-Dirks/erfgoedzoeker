import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const PACKAGE_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const WORKSPACE_ROOT = resolve(PACKAGE_ROOT, '../..');

const { ErfgoedzoekerConfigSchema } = await import(
  resolve(PACKAGE_ROOT, 'src/erfgoedzoeker-config.schema.ts')
);
const { buildJsonSchema } = await import(
  resolve(PACKAGE_ROOT, 'src/build-json-schema.ts')
);

const schemaPath = resolve(
  WORKSPACE_ROOT,
  'apps/erfgoedzoeker/public/config/erfgoedzoeker.config.schema.json',
);
writeFileSync(schemaPath, buildJsonSchema(ErfgoedzoekerConfigSchema));
console.log('Schema written to', schemaPath);
