declare module 'tify' {
  export type TifyView =
    'export' | 'help' | 'info' | 'text' | 'thumbnails' | 'toc' | null;

  // TODO: Expand this type
  export interface TifyOptions {
    container?: string;
    manifestUrl: string;
    view?: TifyView;
  }

  export default class Tify {
    constructor(options: TifyOptions);
    ready: Promise<void>;
    destroy(): void;
    setPage(page: number): number[];
    setView(name: TifyView): void;
  }
}
