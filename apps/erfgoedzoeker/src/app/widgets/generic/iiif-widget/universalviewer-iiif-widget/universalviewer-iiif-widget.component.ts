import { Component, ChangeDetectionStrategy } from '@angular/core';
import { init, Viewer } from 'universalviewer';
import { BaseIiifWidget } from '../base-iiif-widget';

@Component({
  selector: 'app-universalviewer-iiif-widget',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: '../base-iiif-widget.html',
})
export class UniversalviewerIiifWidget extends BaseIiifWidget<Viewer> {
  protected initializeViewer(manifestUrl: string, elementId: string): void {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }

    element.classList.add('uv');

    const instance = init(elementId, {
      manifest: manifestUrl,
      embedded: true,
    });

    this.instances.set(elementId, instance);
  }

  protected destroyInstances(): void {
    this.instances.forEach((instance: Viewer) => {
      instance.dispose();
    });
  }
}
