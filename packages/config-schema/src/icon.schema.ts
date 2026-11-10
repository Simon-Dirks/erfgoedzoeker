import * as z from 'zod';

export const IconKeySchema = z
  .enum([
    'alert-triangle',
    'align-left',
    'archive',
    'briefcase',
    'calendar',
    'external-link',
    'file-text',
    'filter',
    'grid',
    'hash',
    'home',
    'image',
    'info',
    'link',
    'list',
    'map',
    'map-pin',
    'package',
    'tag',
    'user',
    'users',
    'maximize',
  ])
  .meta({
    id: 'iconKey',
    title: 'Icon',
    description: 'Icon from the built-in icon registry.',
  });

export type IconKey = z.infer<typeof IconKeySchema>;
