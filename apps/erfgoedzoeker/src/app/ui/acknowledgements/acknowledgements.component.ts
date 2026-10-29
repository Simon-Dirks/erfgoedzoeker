import { ChangeDetectionStrategy, Component } from '@angular/core';

interface Acknowledgement {
  readonly name: string;
  readonly url: string;
  readonly logoSrc: string;
}

@Component({
  selector: 'app-acknowledgements',
  imports: [],
  templateUrl: './acknowledgements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AcknowledgementsComponent {
  protected readonly acknowledgements: readonly Acknowledgement[] = [
    {
      name: 'Netwerk Digitaal Erfgoed',
      url: 'https://netwerkdigitaalerfgoed.nl/',
      logoSrc: 'img/acknowledgements/nde.png',
    },
    {
      name: 'NADD',
      url: 'https://nadd.network',
      logoSrc: 'img/acknowledgements/nadd.png',
    },
    {
      name: 'Regionaal Archief Zuid-Utrecht',
      url: 'https://www.razu.nl/',
      logoSrc: 'img/acknowledgements/razu.png',
    },
    {
      name: 'Het Utrechts Archief',
      url: 'https://www.hetutrechtsarchief.nl/',
      logoSrc: 'img/acknowledgements/hua.png',
    },
    {
      name: 'Kasteel Amerongen',
      url: 'https://www.kasteelamerongen.nl/',
      logoSrc: 'img/acknowledgements/kasteel-amerongen.png',
    },
  ];
}
