import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NodeModel } from '../node/types/node.model';
import { SearchResponse } from '../search/types/search-response';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  // TODO: Use proper endpoint when available (GET /v1/occupations/{id})
  occupationDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/occupations/{id}',
      isMockData:
        'Let op: deze data komt niet voor in de oorspronkelijke dataset',
      type: 'Occupation',
      name: 'Schilder',
    });
  }

  // TODO: Use proper endpoint when available (GET /v1/media-objects/{id})
  mediaObjectDetails(id: string): Observable<NodeModel> {
    return of({
      id: 'https://example.org/v1/media-objects/{id}',
      isMockData:
        'Let op: deze data komt niet voor in de oorspronkelijke dataset',
      type: ['MediaObject', 'ImageObject'],
      license: {
        id: 'https://example.org/v1/licenses/{id}',
        type: 'CreativeWork',
        name: 'Creative Commons: publieke domein',
      },
      copyrightNotice:
        '© 2025 Example Museum, with permission from Ph. Otographer',
      contentUrl: 'https://collections.uu.nl/IIIF/33832/full/max/0/default.jpg',
      thumbnailUrl:
        'https://collections.uu.nl/IIIF/33832/full/!512,512/0/default.jpg',
      isBasedOn: {
        id: 'https://collections.uu.nl/IIIF/33832',
        encodingFormat:
          "application/ld+json;profile='http://iiif.io/api/image/3/context.json'",
      },
    });
  }

  private generateRandomPlace(): any {
    const cities = [
      { name: 'Utrecht (mock data)', lat: 52.09, lon: 5.12 },
      { name: 'Amsterdam (mock data)', lat: 52.37, lon: 4.89 },
      { name: 'Rotterdam (mock data)', lat: 51.92, lon: 4.48 },
      { name: 'Den Haag (mock data)', lat: 52.08, lon: 4.31 },
      { name: 'Groningen (mock data)', lat: 53.22, lon: 6.56 },
    ];

    const city = cities[Math.floor(Math.random() * cities.length)];
    const latVariation = (Math.random() - 0.5) * 0.2;
    const lonVariation = (Math.random() - 0.5) * 0.2;

    return {
      id: '404',
      type: 'Place',
      name: city.name,
      geo: {
        type: 'GeoCoordinates',
        latitude: city.lat + latVariation,
        longitude: city.lon + lonVariation,
      },
    };
  }

  addRandomPlaceObject(node: NodeModel): NodeModel {
    const enrichedNode: NodeModel = { ...node };

    const locationProperty = 'location';
    if (!(locationProperty in enrichedNode)) {
      enrichedNode[locationProperty] = this.generateRandomPlace();
    }

    return enrichedNode;
  }

  enrichNodeWithMockData(node: NodeModel): NodeModel {
    return this.addRandomPlaceObject(node);
  }

  enrichSearchResponseWithMockData(response: SearchResponse): SearchResponse {
    return {
      ...response,
      orderedItems: response.orderedItems.map((node: NodeModel) =>
        this.enrichNodeWithMockData(node),
      ),
    };
  }
}
