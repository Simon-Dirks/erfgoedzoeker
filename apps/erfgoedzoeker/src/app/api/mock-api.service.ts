import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NodeModel } from '../node/types/node.model';
import { Facet } from '../search/types/facet';
import { ReferringNodesResponse } from '../search/types/referring-node';
import { SearchQuery } from '../search/types/search-query';
import { SearchResponse } from '../search/types/search-response';
import { ApiService } from './api.service';

const MOCK_NODES: NodeModel[] = [
  {
    id: 'https://example.org/v1/heritage-objects/1',
    type: 'CreativeWork',
    name: 'Creative work #1',
    description: 'Beschrijving van creative work #1',
    dateCreated: '1650',
    iiifManifest:
      'https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json',
    creator: [
      {
        role: 'Rol van Creator #1',
        creator: {
          id: 'https://example.org/v1/persons/1',
          name: 'Creator #1',
        },
      },
    ],
    locationCreated: [
      {
        id: 'https://sws.geonames.org/2759794/',
        name: 'Amsterdam',
        latitude: 52.37403,
        longitude: 4.88969,
        addressCountry: ['NL'],
        authority: 'https://www.geonames.org',
      },
    ],
    associatedMedia: [
      {
        id: 'https://example.org/v1/media/1a',
        type: 'ImageObject',
        contentUrl: 'https://picsum.photos/seed/heritage1a/800/600',
        thumbnailUrl: 'https://picsum.photos/seed/heritage1a/200/150',
        encodingFormat: 'image/jpeg',
        license: 'https://creativecommons.org/publicdomain/zero/1.0/',
      },
    ],
  },
  {
    id: 'https://example.org/v1/heritage-objects/2',
    type: 'CreativeWork',
    name: 'Creative work #2',
    description: 'Beschrijving van creative work #2',
    dateCreated: '1740',
    iiifManifest:
      'https://iiif.io/api/cookbook/recipe/0001-mvm-image/manifest.json',
    locationCreated: [
      {
        id: 'https://sws.geonames.org/2747371/',
        name: 'Den Haag',
        latitude: 52.07667,
        longitude: 4.29861,
        addressCountry: ['NL'],
        authority: 'https://www.geonames.org',
      },
    ],
    associatedMedia: [
      {
        id: 'https://example.org/v1/media/2a',
        type: 'ImageObject',
        contentUrl: 'https://picsum.photos/seed/heritage2a/800/600',
        thumbnailUrl: 'https://picsum.photos/seed/heritage2a/200/150',
        encodingFormat: 'image/jpeg',
        license: 'https://creativecommons.org/licenses/by/4.0/',
      },
    ],
  },
];

const MOCK_FACETS: Facet[] = [
  {
    type: 'OrderedCollection',
    name: 'type',
    orderedItems: [
      { type: 'FacetValue', value: 'CreativeWork', count: 2 },
      { type: 'FacetValue', value: 'VisualArtwork', count: 1 },
    ],
  },
  {
    type: 'OrderedCollection',
    name: 'dataset',
    orderedItems: [
      {
        type: 'FacetValue',
        value: 'https://example.org/v1/datasets/1',
        label: 'Mock dataset',
        count: 2,
      },
    ],
  },
  {
    type: 'OrderedCollection',
    name: 'creator',
    orderedItems: [
      {
        type: 'FacetValue',
        value: 'https://example.org/v1/persons/1',
        label: 'Creator #1',
        count: 1,
      },
    ],
  },
  {
    type: 'OrderedCollection',
    name: 'hasMedia',
    orderedItems: [
      { type: 'FacetValue', value: true, count: 2 },
      { type: 'FacetValue', value: false, count: 0 },
    ],
  },
];

@Injectable()
export class MockApiService extends ApiService {
  search(_query: SearchQuery): Observable<SearchResponse> {
    return of({
      id: 'https://example.org/v1/heritage-objects/page/0',
      type: 'OrderedCollectionPage',
      partOf: {
        id: 'https://example.org/v1/heritage-objects',
        type: 'OrderedCollection',
        totalItems: MOCK_NODES.length,
        facets: MOCK_FACETS,
      },
      startIndex: 0,
      orderedItems: MOCK_NODES,
    });
  }

  autocomplete(_query: SearchQuery): Observable<SearchResponse> {
    return of({
      id: 'https://example.org/v1/terms/page/0',
      type: 'OrderedCollectionPage',
      partOf: {
        id: 'https://example.org/v1/terms',
        type: 'OrderedCollection',
        totalItems: 3,
      },
      startIndex: 0,
      orderedItems: [
        {
          id: 'https://example.org/v1/terms/1',
          type: 'DefinedTerm',
          name: 'Term #1',
        },
        {
          id: 'https://example.org/v1/terms/2',
          type: 'DefinedTerm',
          name: 'Term #2',
        },
        {
          id: 'https://example.org/v1/terms/3',
          type: 'DefinedTerm',
          name: 'Term #3',
        },
      ],
    });
  }

  details(id: string): Observable<NodeModel> {
    const node = MOCK_NODES.find((n) => n.id === id) ?? MOCK_NODES[0];
    return of(node);
  }

  referringNodes(_id: string): Observable<ReferringNodesResponse> {
    return of({
      totalCount: 0,
      nodes: [],
    });
  }
}
