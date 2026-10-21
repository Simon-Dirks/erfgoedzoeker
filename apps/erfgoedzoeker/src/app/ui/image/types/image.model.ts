import { Dimensions } from './dimensions';

export interface ImageModel {
  src: string;
  thumbnail: string;
  alt: string;
  iiifInfoUrl?: string;
  dimensions?: Dimensions;
}
