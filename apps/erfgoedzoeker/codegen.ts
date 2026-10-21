import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  documents: ['src/app/api/graphql/**/*.graphql'],
  generates: {
    'src/app/api/graphql/generated-schema-types.ts': {
      plugins: ['typescript'],
      config: {
        skipTypename: false,
        avoidOptionals: false,
      },
    },
    'src/app/api/graphql/generated.ts': {
      plugins: ['typescript-operations', 'typed-document-node'],
      config: {
        skipTypename: false,
        avoidOptionals: false,
        importSchemaTypesFrom: 'src/app/api/graphql/generated-schema-types',
      },
    },
  },
};

export default config;
