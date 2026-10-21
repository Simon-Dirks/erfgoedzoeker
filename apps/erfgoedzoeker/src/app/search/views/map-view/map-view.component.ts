import {
  AfterViewInit,
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  ComponentRef,
  createComponent,
  effect,
  ElementRef,
  EnvironmentInjector,
  inject,
  OnDestroy,
  viewChild,
} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.markercluster';
import { NodeComponent } from '../../../node/node.component';
import { NodeModel } from '../../../node/types/node.model';
import { MapService } from '../../../ui/map/map.service';
import { BaseResultsView } from '../base-results-view';

const resultMarkerIcon = L.divIcon({
  className: 'map-result-marker',
  iconAnchor: [9, 9],
  iconSize: [18, 18],
});

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './map-view.component.scss',
})
export class MapViewComponent
  extends BaseResultsView
  implements AfterViewInit, OnDestroy
{
  mapContainer = viewChild.required<ElementRef>('mapContainer');
  private map?: L.Map;
  private markerCluster?: L.MarkerClusterGroup;
  private popupComponentRefs: ComponentRef<NodeComponent>[] = [];
  private mapService = inject(MapService);

  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector,
  ) {
    super();

    effect(() => {
      const results = this.results();
      if (this.map) {
        this.updateMarkers(results);
      }
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.updateMarkers(this.results());
  }

  ngOnDestroy(): void {
    this.clearMarkers();
    this.map?.remove();
  }

  private initMap(): void {
    this.map = this.mapService.createMap(
      this.mapContainer().nativeElement,
      [52.0907, 5.1214],
      7,
    );
  }

  private updateMarkers(results: NodeModel[]): void {
    if (!this.map) return;

    this.clearMarkers();

    const markers = results.flatMap((node) => {
      // TODO: Make properties used to find geo coordinates configurable
      const coordinates = this.mapService.extractCoordinatesFromNode(node, [
        'contentLocation',
        'location',
        'locationCreated',
      ]);
      const uniqueCoordinates = new Map(
        coordinates.map((coordinate) => [
          `${coordinate.latitude},${coordinate.longitude}`,
          coordinate,
        ]),
      );

      return [...uniqueCoordinates.values()].map((coordinate) =>
        L.marker([coordinate.latitude, coordinate.longitude], {
          icon: resultMarkerIcon,
          title: 'Search result',
        }).bindPopup(this.createPopupContent(node), {
          maxWidth: 320,
          minWidth: 280,
        }),
      );
    });

    this.markerCluster = L.markerClusterGroup({
      showCoverageOnHover: false,
      spiderfyDistanceMultiplier: 1.5,
    });
    this.markerCluster.addLayers(markers);
    this.map.addLayer(this.markerCluster);

    if (markers.length > 1) {
      this.map.fitBounds(this.markerCluster.getBounds().pad(0.1));
    }
  }

  private clearMarkers(): void {
    if (this.markerCluster && this.map) {
      this.map.removeLayer(this.markerCluster);
      this.markerCluster = undefined;
    }
    this.popupComponentRefs.forEach((componentRef) => componentRef.destroy());
    this.popupComponentRefs = [];
  }

  private createPopupContent(node: NodeModel): HTMLElement {
    const container = document.createElement('div');
    container.className = 'map-popup-content';

    const componentRef = createComponent(NodeComponent, {
      environmentInjector: this.environmentInjector,
      elementInjector: this.environmentInjector,
    });

    componentRef.setInput('data', node);
    componentRef.setInput('presentationConfig', this.presentationConfig());

    this.appRef.attachView(componentRef.hostView);
    this.popupComponentRefs.push(componentRef);
    container.appendChild(componentRef.location.nativeElement);

    return container;
  }
}
