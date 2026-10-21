import { Directive, input } from '@angular/core';
import {
  BaseViewOptions,
  NodePresentationConfig,
} from '@erfgoedzoeker/config-schema';
import { NodeModel } from '../../node/types/node.model';

@Directive()
export abstract class BaseResultsView {
  results = input.required<NodeModel[]>();
  totalResults = input.required<number>();
  currentPage = input.required<number>();
  pageSize = input.required<number>();
  options = input<BaseViewOptions>({});
  presentationConfig = input.required<NodePresentationConfig>();
}
