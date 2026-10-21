import { NodeModel } from '../node/types/node.model';
import { Facet } from '../search/types/facet';
import { Filters } from '../search/types/filters';
import { ReferringNodesResponse } from '../search/types/referring-node';
import { SearchQuery } from '../search/types/search-query';
import { SearchResponse } from '../search/types/search-response';
import {
  CreativeWorkFacetFieldsFragment,
  CreativeWorkFieldsFragment,
  DatasetFieldsFragment,
  OccupationFieldsFragment,
  OrganizationFieldsFragment,
  PersonFieldsFragment,
  PlaceFieldsFragment,
  ReferringNodesQuery,
  TermFieldsFragment,
} from './graphql/generated';
import {
  CreativeWorkOrderBy,
  CreativeWorkSortField,
  CreativeWorkWhere,
  KeywordFilter,
  Pagination,
  SortDirection,
} from './graphql/generated-schema-types';

// TODO: Skip most of this normalization logic in favor of using the GraphQL types directly
// This module is mostly here to keep the previously existing REST API surface intact
type LocalizedValue = { value: string; language?: string | null };

function isLocalizedValue(value: unknown): value is LocalizedValue {
  return (
    !!value &&
    typeof value === 'object' &&
    'value' in value &&
    'language' in value
  );
}

function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

function pickLocalizedValue(
  values: LocalizedValue[] | undefined | null,
  preferredLanguage: string,
): string | undefined {
  if (!values?.length) return undefined;
  return (
    values.find((value) => value.language === preferredLanguage)?.value ??
    values[0].value
  );
}

function normalizeGraphQlValue(
  value: unknown,
  preferredLanguage: string,
): unknown {
  if (Array.isArray(value)) {
    if (value.length === 0) return value;
    if (value.every(isLocalizedValue)) {
      return pickLocalizedValue(value, preferredLanguage);
    }
    if (value.every(isObject)) {
      return value.map((item) => normalizeGraphQlItem(item, preferredLanguage));
    }
    return value;
  }

  if (isLocalizedValue(value)) {
    return value.value;
  }

  if (isObject(value)) {
    return normalizeGraphQlItem(value, preferredLanguage);
  }

  return value;
}

function isEmptyValue(value: unknown): boolean {
  return (
    value === null ||
    value === undefined ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  );
}

export function normalizeGraphQlItem<T extends object>(
  item: T,
  preferredLanguage: string,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(item)
      .map(
        ([key, value]) =>
          [key, normalizeGraphQlValue(value, preferredLanguage)] as const,
      )
      .filter(([, value]) => !isEmptyValue(value)),
  );
}

export function toFacets(
  facets: CreativeWorkFacetFieldsFragment,
  preferredLanguage: string,
): Facet[] {
  return Object.entries(facets)
    .filter(([, buckets]) => buckets.length > 0)
    .map(([name, buckets]) => ({
      type: 'OrderedCollection' as const,
      name,
      orderedItems: buckets.map((bucket) => ({
        type: 'FacetValue' as const,
        value:
          typeof bucket.value === 'boolean'
            ? bucket.value
            : String(bucket.value),
        label:
          'label' in bucket
            ? pickLocalizedValue(bucket.label, preferredLanguage)
            : undefined,
        count: bucket.count,
      })),
    }));
}

export function toSearchResponse<TItem>(
  page: number,
  pagination: Pagination,
  items: TItem[],
  mapItem: (item: TItem) => NodeModel,
  facets: Facet[] = [],
): SearchResponse {
  return {
    id: `graphql-search-page-${page}`,
    type: 'OrderedCollectionPage',
    partOf: {
      id: 'graphql-search',
      type: 'OrderedCollection',
      totalItems: pagination.total,
      facets,
    },
    startIndex: (page - 1) * pagination.perPage,
    orderedItems: items.map(mapItem),
  };
}

export function toCreativeWorkWhere(filters: Filters): CreativeWorkWhere {
  const where: Record<string, KeywordFilter | boolean> = {};

  for (const [facetName, values] of Object.entries(filters)) {
    if (values.size === 0) continue;

    if (facetName === 'hasMedia') {
      where[facetName] = values.has('true');
      continue;
    }

    where[facetName] = { in: Array.from(values) };
  }

  return where as CreativeWorkWhere;
}

export function toSearchVariables(query: SearchQuery): {
  page: number;
  perPage: number;
  searchTerm: string | undefined;
} {
  return {
    page: query.page ?? 1,
    perPage: query.size ?? 20,
    searchTerm: query.q && query.q !== '*' ? query.q : undefined,
  };
}

const CREATIVE_WORK_SORT_FIELD_MAP: Record<string, CreativeWorkSortField> = {
  title: CreativeWorkSortField.Name,
  dateCreated: CreativeWorkSortField.DateCreated,
};

export function toCreativeWorkOrderBy(
  sort: string | undefined,
): CreativeWorkOrderBy | undefined {
  if (!sort) return undefined;

  const [fieldName, direction] = sort.split(':');
  const field = CREATIVE_WORK_SORT_FIELD_MAP[fieldName];
  if (!field) return undefined;

  return {
    field,
    direction: direction === 'desc' ? SortDirection.Desc : SortDirection.Asc,
  };
}

export function mapCreativeWork(
  item: CreativeWorkFieldsFragment,
  preferredLanguage: string,
): NodeModel {
  const node = normalizeGraphQlItem(item, preferredLanguage) as NodeModel;
  return node;
}

export function mapDataset(
  item: DatasetFieldsFragment,
  preferredLanguage: string,
): NodeModel {
  return normalizeGraphQlItem(item, preferredLanguage) as NodeModel;
}

export function mapOccupation(
  item: OccupationFieldsFragment,
  preferredLanguage: string,
): NodeModel {
  return normalizeGraphQlItem(item, preferredLanguage) as NodeModel;
}

export function mapOrganization(
  item: OrganizationFieldsFragment,
  preferredLanguage: string,
): NodeModel {
  return normalizeGraphQlItem(item, preferredLanguage) as NodeModel;
}

export function mapPerson(
  item: PersonFieldsFragment,
  preferredLanguage: string,
): NodeModel {
  return normalizeGraphQlItem(item, preferredLanguage) as NodeModel;
}

export function mapPlace(
  item: PlaceFieldsFragment,
  preferredLanguage: string,
): NodeModel {
  return normalizeGraphQlItem(item, preferredLanguage) as NodeModel;
}

export function mapTerm(
  item: TermFieldsFragment,
  preferredLanguage: string,
): NodeModel {
  return normalizeGraphQlItem(item, preferredLanguage) as NodeModel;
}

export function toReferringNodesResponse(
  data: ReferringNodesQuery,
  preferredLanguage: string,
): ReferringNodesResponse {
  const {
    creativeWorks,
    datasets,
    occupations,
    organizations,
    persons,
    terms,
  } = data;

  const normalize = (item: object) =>
    normalizeGraphQlItem(item, preferredLanguage) as NodeModel;

  const items: NodeModel[] = [
    ...creativeWorks.items.map(normalize),
    ...datasets.items.map(normalize),
    ...occupations.items.map(normalize),
    ...organizations.items.map(normalize),
    ...persons.items.map(normalize),
    ...terms.items.map(normalize),
  ];

  const totalItems = [
    creativeWorks,
    datasets,
    occupations,
    organizations,
    persons,
    terms,
  ].reduce((sum, result) => sum + result.pagination.total, 0);

  return { totalCount: totalItems, nodes: items };
}
