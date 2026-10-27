import * as z from 'zod';
import { IconKeySchema } from './icon.schema';
import { NodePresentationConfigSchema } from './widget.schema';

export const ViewComponentKeySchema = z
  .enum(['list-view', 'grid-view', 'map-view', 'timeline-view'])
  .meta({
    id: 'viewComponentKey',
    title: 'Component',
    description: 'Internal component that renders this view.',
  });

export const ViewTypeSchema = z.enum(['list', 'grid', 'map', 'timeline']).meta({
  id: 'viewType',
  title: 'Type',
  description: 'Unique name of the view.',
});

export const BaseViewOptionsSchema = z
  .object({
    pageSize: z.number().optional().meta({
      title: 'Results per page',
      description: 'Number of results per page for this view.',
    }),
    showPagination: z.boolean().optional().meta({
      title: 'Show pagination controls',
    }),
    showResultsCount: z.boolean().optional().meta({
      title: 'Show total number of search results',
    }),
    showSort: z.boolean().optional().meta({
      title: 'Show sorting controls',
    }),
    hidden: z.boolean().optional().meta({
      title: 'Hide from the view selector',
    }),
    defaultSort: z
      .string()
      .optional()
      .meta({
        title: 'Default sorting',
        description: 'Sorting applied when this view opens.',
        examples: ['dateCreated:asc'],
      }),
    // TODO: Support non-facet filters (eg date/number range filter)
    forcedFilters: z
      .record(z.string(), z.array(z.string()))
      .optional()
      .meta({
        title: 'Forced filters',
        description:
          'Facet filters always applied while this view is active, in addition to any filters chosen by the visitor. Not shown or togglable in the filter panel, and not kept when switching to another view.',
        examples: [{ hasCoordinates: ['true'] }],
      }),
  })
  .meta({
    title: 'Options',
    description: 'General settings for this view.',
  });

export const ViewOptionsSchema = BaseViewOptionsSchema.loose();

export const ViewDefinitionSchema = z
  .object({
    type: ViewTypeSchema,
    componentId: ViewComponentKeySchema,
    icon: IconKeySchema,
    label: z.string().meta({
      title: 'Label',
      description: 'Accessible label for the view selector icon.',
      examples: ['List view'],
    }),
    options: ViewOptionsSchema,
    presentationConfig: NodePresentationConfigSchema.meta({
      title: 'Search result presentation',
      description: 'Presentation of search results in this view.',
    }),
  })
  .meta({
    title: 'View',
    description: 'A way to display search results.',
  });

export const ViewsConfigSchema = z
  .object({
    views: z.array(ViewDefinitionSchema).meta({
      title: 'Views',
      description: 'Available views for search results.',
    }),
    defaultView: ViewTypeSchema.meta({
      title: 'Default view',
      description: 'View that opens first.',
    }),
  })
  .meta({
    title: 'Search views',
    description:
      'Settings for displaying search results. Each view visualizes the search results in a different way.',
  });

export type ViewComponentKey = z.infer<typeof ViewComponentKeySchema>;
export type ViewType = z.infer<typeof ViewTypeSchema>;
export type BaseViewOptions = z.infer<typeof BaseViewOptionsSchema>;
export type ViewOptions = z.infer<typeof ViewOptionsSchema>;
export type ViewDefinition = z.infer<typeof ViewDefinitionSchema>;
export type ViewsConfig = z.infer<typeof ViewsConfigSchema>;
