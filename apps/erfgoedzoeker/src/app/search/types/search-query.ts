import { Filters } from './filters';

export interface SearchQuery {
  page: number;
  size?: number;
  q?: string;
  sort?: string;
  filters?: Filters;
  // TODO: Remove this property, see https://codeberg.org/limburg/lol/issues/28#issuecomment-20481218
  rawFilterRest?: string | string[];
}
