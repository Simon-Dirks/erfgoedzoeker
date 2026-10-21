import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NodeModel } from '../node/types/node.model';
import { ReferringNodesResponse } from '../search/types/referring-node';
import { SearchQuery } from '../search/types/search-query';
import { SearchResponse } from '../search/types/search-response';

/**
 * This is an abstract data-layer contract.
 * Configure which concrete implementation (e.g. REST, GraphQL, ...) is used via the provider in `app.config.ts`.
 */
@Injectable()
export abstract class ApiService {
  abstract search(query: SearchQuery): Observable<SearchResponse>;

  abstract autocomplete(query: SearchQuery): Observable<SearchResponse>;

  abstract details(id: string): Observable<NodeModel>;

  abstract referringNodes(id: string): Observable<ReferringNodesResponse>;
}
