import { Route } from '@angular/router';
import { DetailsPageComponent } from '../details-page/details-page.component';
import { HomePageComponent } from '../home-page/home-page.component';
import { SearchPageComponent } from '../search/search-page/search-page.component';
import { ConfigErrorPageComponent } from '../ui/config-error-page/config-error-page.component';
import { NotFoundPageComponent } from '../ui/not-found-page/not-found-page.component';
import { detailsRouteMatcher } from './details-route.matcher';

export const appRoutes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'search',
    component: SearchPageComponent,
  },
  {
    path: 'config-error',
    component: ConfigErrorPageComponent,
  },
  {
    matcher: detailsRouteMatcher,
    component: DetailsPageComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];
