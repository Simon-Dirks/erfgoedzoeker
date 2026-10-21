import {
  featherAlertTriangle,
  featherAlignLeft,
  featherArchive,
  featherBriefcase,
  featherCalendar,
  featherExternalLink,
  featherFileText,
  featherFilter,
  featherGrid,
  featherHome,
  featherImage,
  featherInfo,
  featherLink,
  featherList,
  featherMap,
  featherMapPin,
  featherMaximize2,
  featherPackage,
  featherTag,
  featherUser,
  featherUsers,
} from '@ng-icons/feather-icons';
import type { IconKey } from '@erfgoedzoeker/config-schema';

export const ICON_REGISTRY: Record<IconKey, string> = {
  'alert-triangle': featherAlertTriangle,
  'align-left': featherAlignLeft,
  archive: featherArchive,
  briefcase: featherBriefcase,
  calendar: featherCalendar,
  'external-link': featherExternalLink,
  'file-text': featherFileText,
  filter: featherFilter,
  grid: featherGrid,
  home: featherHome,
  image: featherImage,
  info: featherInfo,
  link: featherLink,
  list: featherList,
  map: featherMap,
  'map-pin': featherMapPin,
  package: featherPackage,
  tag: featherTag,
  user: featherUser,
  users: featherUsers,
  maximize: featherMaximize2,
};

export function isRegisteredIcon(value: unknown): value is IconKey {
  return typeof value === 'string' && Object.hasOwn(ICON_REGISTRY, value);
}

export function getIcon(key: IconKey): string {
  return ICON_REGISTRY[key];
}

export function getIconOrUndefined(key?: IconKey): string | undefined {
  return key ? ICON_REGISTRY[key] : undefined;
}
