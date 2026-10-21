import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  viewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import * as L from 'leaflet';
import { isNodeModel, NodeModel } from '../../../node/types/node.model';
import { MapService } from '../../../ui/map/map.service';
import { BaseWidget } from '../../base-widget';

@Component({
  selector: 'app-map-widget',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './map-widget.component.html',
})
export class MapWidget extends BaseWidget implements AfterViewInit {
  override readonly stopClickPropagation = true;

  mapContainer = viewChild.required<ElementRef>('mapContainer');
  private map?: L.Map;
  private mapService = inject(MapService);

  nodes = computed<NodeModel[]>(() => {
    return this.values().filter((value): value is NodeModel =>
      isNodeModel(value),
    );
  });

  private coordinates = computed(() => {
    return this.mapService.extractCoordinatesFromNodes(this.nodes(), [
      this.property(),
    ]);
  });

  protected hasCoordinates = computed(() => this.coordinates().length > 0);

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    const coordinates = this.coordinates();

    if (coordinates.length === 0) {
      console.warn('No coordinates found, skipping map initialization');
      return;
    }

    const firstCoord = coordinates[0];
    this.map = this.mapService.createMap(
      this.mapContainer().nativeElement,
      [firstCoord.latitude, firstCoord.longitude],
      8,
    );

    this.mapService.addMarkersAndFitBounds(this.map, coordinates);
  }
}
