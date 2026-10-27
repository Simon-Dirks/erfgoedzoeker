import * as z from 'zod';
import { IconKeySchema } from './icon.schema';

export const WidgetComponentKeySchema = z
  .enum([
    'text-widget',
    'link-widget',
    'literal-link-widget',
    'json-widget',
    'image-gallery-widget',
    'map-widget',
    'media-widget',
    'dataset-widget',
    'creator-widget',
    'address-widget',
    'date-widget',
    'referring-nodes-widget',
    'separator-widget',
  ])
  .meta({
    id: 'widgetComponentKey',
    title: 'Component',
    description: 'Internal widget that displays the data.',
  });

export const WidgetPositionSchema = z
  .enum(['top', 'left', 'main', 'right', 'bottom'])
  .meta({
    id: 'widgetPosition',
    title: 'Position',
    description: 'Position of the widget within the presentation.',
  });

export const BaseWidgetOptionsSchema = z
  .object({
    showPropertyLabel: z.boolean().optional().meta({
      title: 'Show property label',
      description: 'Show a property label for the value.',
    }),
    propertyLabel: z
      .string()
      .optional()
      .meta({
        title: 'Property label',
        description: 'Custom property label shown for the value.',
        examples: ['Creator'],
      }),
    icon: IconKeySchema.optional(),
    position: WidgetPositionSchema.optional(),
    propertyPath: z
      .string()
      .optional()
      .meta({
        title: 'Property path',
        description: 'Path to a nested value within the property.',
        examples: ['associatedMedia.thumbnailUrl'],
      }),
    noPadding: z.boolean().optional().meta({
      title: 'Remove padding',
      description: 'Extend the widget to the surrounding edges.',
    }),
    showOriginalLink: z.boolean().optional().meta({
      title: 'Show original link',
      description:
        "Show a link to the original value alongside the widget. Example: for a map widget, show a link to the location's details page.",
    }),
  })
  .meta({
    title: 'Options',
    description: 'General and component-specific widget settings.',
  });

export const WidgetOptionsSchema = BaseWidgetOptionsSchema.loose();

export const WidgetSchema = z
  .object({
    id: z.string().meta({
      title: 'ID',
      description: 'Unique identifier of the widget.',
      examples: ['creator'],
    }),
    componentId: WidgetComponentKeySchema,
    properties: z
      .array(
        z.string().meta({
          title: 'Property',
          examples: ['creator'],
        }),
      )
      .optional()
      .meta({
        title: 'Properties',
        description:
          'Integration layer properties that cause this widget to render. Example: show an image-gallery-widget for the associatedMedia property. If no properties are listed, the widget is always shown.',
      }),
    options: WidgetOptionsSchema.optional(),
    isFallback: z.boolean().optional().meta({
      title: 'Fallback widget',
      description:
        'Use this widget for integration layer properties that are not handled by other widgets.',
    }),
    hidden: z.boolean().optional().meta({
      title: 'Hidden',
      description:
        'Hide this widget from visitors, even when its configured properties are present in the integration layer.',
    }),
  })
  .meta({
    title: 'Widget',
    description: 'Component that displays one or more data properties.',
  });

export const NodePresentationConfigSchema = z
  .object({
    widgets: z.array(WidgetSchema).meta({
      title: 'Widgets',
      description:
        'Widgets are displayed in this order. A widget is shown for each of its configured integration layer properties. For example, a map widget might be used to visualize data for the location, contentLocation, and locationCreated properties.',
    }),
    showArrowIndicator: z.boolean().optional().meta({
      title: 'Show arrow indicator on clickable objects',
    }),
  })
  .meta({
    id: 'nodePresentationConfig',
    title: 'Object presentation',
    description: 'Settings for presenting an object.',
  });

export type WidgetComponentKey = z.infer<typeof WidgetComponentKeySchema>;
export type WidgetPosition = z.infer<typeof WidgetPositionSchema>;
export type BaseWidgetOptions = z.infer<typeof BaseWidgetOptionsSchema>;
export type WidgetOptions = z.infer<typeof WidgetOptionsSchema>;
export type Widget = z.infer<typeof WidgetSchema>;
export type NodePresentationConfig = z.infer<
  typeof NodePresentationConfigSchema
>;
