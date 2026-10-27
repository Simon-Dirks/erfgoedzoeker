import * as z from 'zod';
import { IconKeySchema } from './icon.schema';

const baseFilterFields = {
  name: z.string().meta({
    title: 'Name',
    description: 'Filter property name in the integration layer.',
    examples: ['creator'],
  }),
  label: z.string().meta({
    title: 'Label',
    description: 'Name shown to visitors for this filter.',
    examples: ['Creator'],
  }),
  icon: IconKeySchema.optional(),
  hidden: z.boolean().optional().meta({
    title: 'Hidden',
    description: 'Hide this filter from visitors.',
  }),
};

export const FacetConfigSchema = z
  .object({
    ...baseFilterFields,
    type: z.literal('facet').meta({
      title: 'Type',
      description: 'Checkbox facet filter.',
    }),
  })
  .meta({
    title: 'Facet filter',
    description: 'Checkbox filter visitors can use to refine the results.',
  });

export type FacetConfig = z.infer<typeof FacetConfigSchema>;

export const DateRangeFilterConfigSchema = z
  .object({
    ...baseFilterFields,
    type: z.literal('dateRange').meta({
      title: 'Type',
      description: 'Date range filter (min/max year or date string).',
    }),
  })
  .meta({
    title: 'Date range filter',
    description:
      'Date range filter (min/max) visitors can use to refine the results.',
  });

export type DateRangeFilterConfig = z.infer<typeof DateRangeFilterConfigSchema>;

export const NumberRangeFilterConfigSchema = z
  .object({
    ...baseFilterFields,
    type: z.literal('numberRange').meta({
      title: 'Type',
      description: 'Numeric range filter (min/max number).',
    }),
  })
  .meta({
    title: 'Number range filter',
    description:
      'Numeric range filter (min/max) visitors can use to refine the results.',
  });

export type NumberRangeFilterConfig = z.infer<
  typeof NumberRangeFilterConfigSchema
>;

export const FilterConfigSchema = z.discriminatedUnion('type', [
  FacetConfigSchema,
  DateRangeFilterConfigSchema,
  NumberRangeFilterConfigSchema,
]);

export type FilterConfig = z.infer<typeof FilterConfigSchema>;

export type RangeFilterConfig = DateRangeFilterConfig | NumberRangeFilterConfig;
