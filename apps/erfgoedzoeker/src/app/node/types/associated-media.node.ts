import { normalizeToFirst } from '../../data-utils/value-normalization.util';
import { ImageModel } from '../../ui/image/types/image.model';
import { NodeModel } from './node.model';

export type AssociatedMediaNode = NodeModel & {
  contentUrl?: string;
  thumbnailUrl?: string;
  encodingFormat?: string | string[];
  isBasedOn?: {
    id?: string;
    encodingFormat?: string;
  };
};

export function getIiifInfoJsonUrl(
  media: AssociatedMediaNode,
): string | undefined {
  return media.isBasedOn?.id ? `${media.isBasedOn.id}/info.json` : undefined;
}

export function toImageModel(media: AssociatedMediaNode): ImageModel {
  return {
    src: media.contentUrl || media.thumbnailUrl || '',
    thumbnail: media.thumbnailUrl || media.contentUrl || '',
    alt: normalizeToFirst<string>(media.name) || media.id || 'Image',
    iiifInfoUrl: getIiifInfoJsonUrl(media),
  };
}
