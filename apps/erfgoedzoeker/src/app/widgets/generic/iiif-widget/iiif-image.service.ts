import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Dimensions } from '../../../ui/image/types/dimensions';

export interface IiifImageInfo {
  // '@context'?: string;
  // id?: string;
  // type?: string;
  // protocol?: string;
  // profile?: string;
  width: number;
  height: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class IiifImageService {
  private http = inject(HttpClient);

  getImageDimensions(infoUrl: string): Observable<Dimensions | null> {
    return this.http.get<IiifImageInfo>(infoUrl).pipe(
      map((info: IiifImageInfo) => ({
        width: info.width,
        height: info.height,
      })),
      catchError(() => of(null)),
    );
  }
}
