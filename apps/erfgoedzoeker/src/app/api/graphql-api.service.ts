import { inject, Injectable, LOCALE_ID, Signal } from '@angular/core';
import type { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { GraphQLClient } from 'graphql-request';
import { defer, map, Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { NodeModel } from '../node/types/node.model';
import { ReferringNodesResponse } from '../search/types/referring-node';
import { SearchQuery } from '../search/types/search-query';
import { SearchResponse } from '../search/types/search-response';
import { ApiService } from './api.service';
import {
  mapCreativeWork,
  mapDataset,
  mapOccupation,
  mapOrganization,
  mapPerson,
  mapPlace,
  mapTerm,
  toCreativeWorkOrderBy,
  toCreativeWorkWhere,
  toFacets,
  toReferringNodesResponse,
  toSearchResponse,
  toSearchVariables,
} from './graphql-normalize';
import {
  NodeByIdDocument,
  NodeByIdQuery,
  NodeByIdQueryVariables,
  ReferringNodesDocument,
  ReferringNodesQuery,
  ReferringNodesQueryVariables,
  SearchCreativeWorksDocument,
  SearchCreativeWorksQuery,
  SearchCreativeWorksQueryVariables,
  SearchTermsDocument,
  SearchTermsQuery,
  SearchTermsQueryVariables,
} from './graphql/generated';

@Injectable()
export class GraphqlApiService extends ApiService {
  private readonly configService = inject(ConfigService);
  private readonly endpointUrl: Signal<string> = this.configService.apiBaseUrl;
  private readonly preferredLanguage: string = inject(LOCALE_ID).split('-')[0];

  search(query: SearchQuery): Observable<SearchResponse> {
    const { page, perPage, searchTerm } = toSearchVariables(query);
    const where = query.filters
      ? toCreativeWorkWhere(query.filters)
      : undefined;
    const orderBy = toCreativeWorkOrderBy(query.sort);

    // TODO: Consider if we might want to search through other types as well (eg Place, Person, etc).
    return this.request<
      SearchCreativeWorksQuery,
      SearchCreativeWorksQueryVariables
    >(SearchCreativeWorksDocument, {
      query: searchTerm,
      page,
      perPage,
      where,
      orderBy,
    }).pipe(
      map(({ creativeWorks }) =>
        toSearchResponse(
          page,
          creativeWorks.pagination,
          creativeWorks.items,
          (item) => mapCreativeWork(item, this.preferredLanguage),
          toFacets(creativeWorks.facets, this.preferredLanguage),
        ),
      ),
    );
  }

  autocomplete(query: SearchQuery): Observable<SearchResponse> {
    const { page, perPage, searchTerm } = toSearchVariables(query);

    return this.request<SearchTermsQuery, SearchTermsQueryVariables>(
      SearchTermsDocument,
      { query: searchTerm, page, perPage },
    ).pipe(
      map(({ terms }) =>
        toSearchResponse(page, terms.pagination, terms.items, (item) =>
          mapTerm(item, this.preferredLanguage),
        ),
      ),
    );
  }

  details(id: string): Observable<NodeModel> {
    return this.request<NodeByIdQuery, NodeByIdQueryVariables>(
      NodeByIdDocument,
      { id },
    ).pipe(
      map((data) => {
        const preferredLanguage = this.preferredLanguage;
        const creativeWork = data.creativeWorks.items[0];
        if (creativeWork)
          return mapCreativeWork(creativeWork, preferredLanguage);

        const dataset = data.datasets.items[0];
        if (dataset) return mapDataset(dataset, preferredLanguage);

        const occupation = data.occupations.items[0];
        if (occupation) return mapOccupation(occupation, preferredLanguage);

        const organization = data.organizations.items[0];
        if (organization)
          return mapOrganization(organization, preferredLanguage);

        const person = data.persons.items[0];
        if (person) return mapPerson(person, preferredLanguage);

        const place = data.places.items[0];
        if (place) return mapPlace(place, preferredLanguage);

        const term = data.terms.items[0];
        if (term) return mapTerm(term, preferredLanguage);

        throw new Error(`No node found with id: ${id}`);
      }),
    );
  }

  referringNodes(id: string): Observable<ReferringNodesResponse> {
    const perPage = 20;

    return this.request<ReferringNodesQuery, ReferringNodesQueryVariables>(
      ReferringNodesDocument,
      { id, perPage },
    ).pipe(
      map((data) => toReferringNodesResponse(data, this.preferredLanguage)),
    );
  }

  private request<TData, TVariables extends object>(
    document: TypedDocumentNode<TData, TVariables>,
    variables: TVariables,
  ): Observable<TData> {
    const client = new GraphQLClient(this.endpointUrl(), {
      headers: { 'Accept-Language': this.preferredLanguage },
    }) as {
      request: (
        document: TypedDocumentNode<TData, TVariables>,
        variables: unknown, // graphql-request's overload resolution can't handle generic TVariables, so we use unknown and cast later
      ) => Promise<TData>;
    };

    return defer(() => client.request(document, variables));
  }
}
