import { Injectable } from '@angular/core';
import * as L from 'leaflet';
import { getNestedValue } from '../../data-utils/property-path.util';
import { normalizeToArray } from '../../data-utils/value-normalization.util';
import { isNodeModel, NodeModel } from '../../node/types/node.model';
import { Coordinates, isCoordinates } from './coordinates';

const defaultCircleMarkerOptions: L.CircleMarkerOptions = {
  radius: 8,
  fillColor: '#00839F',
  color: '#ffffff',
  weight: 2,
  opacity: 1,
  fillOpacity: 1,
};

@Injectable({ providedIn: 'root' })
export class MapService {
  extractCoordinatesFromValues(
    values: unknown[],
    propertyPaths?: string[],
  ): Coordinates[] {
    return values.flatMap((value) => {
      if (isCoordinates(value)) return [value];
      if (isNodeModel(value)) {
        return this.extractCoordinatesFromNode(value, propertyPaths);
      }
      return [];
    });
  }

  extractCoordinatesFromNode(
    node: NodeModel,
    propertyPaths?: string[],
  ): Coordinates[] {
    const coordinates: Coordinates[] = isCoordinates(node) ? [node] : [];

    for (const path of propertyPaths ?? []) {
      const value = getNestedValue(node, path);
      coordinates.push(
        ...this.extractCoordinatesFromValues(
          normalizeToArray(value),
          propertyPaths,
        ),
      );
    }

    return coordinates;
  }

  extractCoordinatesFromNodes(
    nodes: NodeModel[],
    propertyPaths?: string[],
  ): Coordinates[] {
    return nodes.flatMap((node) =>
      this.extractCoordinatesFromNode(node, propertyPaths),
    );
  }

  createMap(
    container: HTMLElement,
    center: [number, number],
    zoom: number = 8,
  ): L.Map {
    const map = L.map(container).setView(center, zoom);

    L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16,
      },
    ).addTo(map);

    return map;
  }

  addMarkersAndFitBounds(
    map: L.Map,
    coordinates: Coordinates[],
    popupContent?: (coord: Coordinates) => HTMLElement | string,
    popupOptions?: L.PopupOptions,
  ): L.CircleMarker[] {
    const markers: L.CircleMarker[] = [];

    coordinates.forEach((coord) => {
      const marker = L.circleMarker(
        [coord.latitude, coord.longitude],
        defaultCircleMarkerOptions,
      ).addTo(map);

      if (popupContent) {
        marker.bindPopup(popupContent(coord), popupOptions);
      }

      markers.push(marker);
    });

    if (markers.length > 1) {
      const group = new L.FeatureGroup(markers);
      map.fitBounds(group.getBounds().pad(0.1));
    }

    return markers;
  }
}
