import { Component, computed, ChangeDetectionStrategy } from '@angular/core';
import { BaseWidget } from '../../base-widget';

export interface PostalAddress {
  type?: string;
  streetAddress?: string;
  postalCode?: string;
  addressLocality?: string;
  addressRegion?: string;
  addressCountry?: string;
}

interface FormattedAddress extends PostalAddress {
  postalInfo: string;
  regionInfo: string;
}

@Component({
  selector: 'app-address-widget',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './address-widget.component.html',
})
export class AddressWidget extends BaseWidget {
  addresses = computed<FormattedAddress[]>(() => {
    const rawAddresses = this.values() as PostalAddress[];
    return rawAddresses.map((address) => ({
      ...address,
      postalInfo: [address.postalCode, address.addressLocality]
        .filter(Boolean)
        .join(' '),
      regionInfo: [address.addressRegion, address.addressCountry]
        .filter(Boolean)
        .join(', '),
    }));
  });
}
