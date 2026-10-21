import { Type } from '@angular/core';
import { WidgetComponentKey } from '@erfgoedzoeker/config-schema';
import { BaseWidget } from '../widgets/base-widget';
import { AddressWidget } from '../widgets/domain-specific/address-widget/address-widget.component';
import { CreatorWidget } from '../widgets/domain-specific/creator-widget/creator-widget.component';
import { DatasetWidget } from '../widgets/domain-specific/dataset-widget/dataset-widget.component';
import { DateWidget } from '../widgets/domain-specific/date-widget/date-widget.component';
import { ImageGalleryWidget } from '../widgets/generic/image-gallery-widget/image-gallery-widget.component';
import { JsonWidget } from '../widgets/generic/json-widget/json-widget.component';
import { LinkWidget } from '../widgets/generic/link-widget/link-widget.component';
import { LiteralLinkWidget } from '../widgets/generic/literal-link-widget/literal-link-widget.component';
import { MapWidget } from '../widgets/generic/map-widget/map-widget.component';
import { MediaWidget } from '../widgets/generic/media-widget/media-widget.component';
import { ReferringNodesWidget } from '../widgets/generic/referring-nodes-widget/referring-nodes-widget.component';
import { SeparatorWidget } from '../widgets/generic/separator-widget/separator-widget.component';
import { TextWidget } from '../widgets/generic/text-widget/text-widget.component';

export const WIDGET_COMPONENT_REGISTRY: Record<
  WidgetComponentKey,
  Type<BaseWidget>
> = {
  'text-widget': TextWidget,
  'link-widget': LinkWidget,
  'literal-link-widget': LiteralLinkWidget,
  'json-widget': JsonWidget,
  'image-gallery-widget': ImageGalleryWidget,
  'map-widget': MapWidget,
  'media-widget': MediaWidget,
  'dataset-widget': DatasetWidget,
  'creator-widget': CreatorWidget,
  'address-widget': AddressWidget,
  'date-widget': DateWidget,
  'referring-nodes-widget': ReferringNodesWidget,
  'separator-widget': SeparatorWidget,
} as const;

export function getWidgetComponent(key: WidgetComponentKey): Type<BaseWidget> {
  return WIDGET_COMPONENT_REGISTRY[key];
}
