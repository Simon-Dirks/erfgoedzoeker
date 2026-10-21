import { ChangeDetectionStrategy, Component } from '@angular/core';
import Tify from 'tify';
import { BaseIiifWidget } from '../base-iiif-widget';

@Component({
  selector: 'app-tify-iiif-widget',
  imports: [],
  templateUrl: '../base-iiif-widget.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host ::ng-deep {
        --tify-body-bg: lightgrey;
      }
    `,
  ],
})
export class TifyIiifWidget extends BaseIiifWidget<Tify> {
  protected async initializeViewer(
    manifestUrl: string,
    elementId: string,
  ): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      return;
    }

    const instance = new Tify({
      container: `#${elementId}`,
      manifestUrl: manifestUrl,
      view: null,
    });

    this.instances.set(elementId, instance);

    await instance.ready;

    // TODO: Remove hacky way of testing if there are multiple pages, see https://github.com/tify-iiif-viewer/tify/issues/362
    let hasMultiplePages = false;
    try {
      instance.setPage(2);
      instance.setPage(1);
      hasMultiplePages = true;
    } catch {}

    if (hasMultiplePages) {
      instance.setView('thumbnails');
    }
  }

  protected destroyInstances(): void {
    this.instances.forEach((instance: Tify) => {
      instance.destroy();
    });
  }
}
