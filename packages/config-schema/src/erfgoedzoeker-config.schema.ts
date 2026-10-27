import * as z from 'zod';
import { ApiConfigSchema } from './api.schema';
import { FilterConfigSchema } from './filter.schema';
import { ViewsConfigSchema } from './view.schema';
import { NodePresentationConfigSchema } from './widget.schema';

export const ErfgoedzoekerConfigSchema = z
  .object({
    $schema: z.string().optional().meta({
      title: 'JSON Schema',
      // description: 'Reference to the JSON Schema for this configuration file.',
      readOnly: true,
    }),
    api: ApiConfigSchema,
    filters: z.array(FilterConfigSchema).meta({
      title: 'Filters',
      description: 'Filters visitors can use to refine the results.',
    }),
    views: ViewsConfigSchema,
    detailsPresentation: NodePresentationConfigSchema.omit({
      showArrowIndicator: true,
    }).meta({
      title: 'Details page',
      description: 'Presentation of an object on the details page.',
    }),
    imagePaths: z
      .array(
        z.string().meta({
          title: 'Property path',
          examples: ['associatedMedia.thumbnailUrl'],
        }),
      )
      .meta({
        title: 'Image properties',
        description:
          "Property paths searched in order to find an object's image(s). The first match is used.",
      }),
  })
  .strict()
  .meta({
    title: 'Erfgoedzoeker configuration',
    description:
      'Settings for how Erfgoedzoeker presents information from the integration layer to end users.',
  });

export type ErfgoedzoekerConfig = z.infer<typeof ErfgoedzoekerConfigSchema>;
