import {
  Component,
  inject,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { featherBook, featherGithub } from '@ng-icons/feather-icons';
import { SearchBarComponent } from '../search/search-page/search-bar/search-bar.component';
import { HeaderBannerComponent } from '../ui/header-banner/header-banner.component';
import { PageTitleService } from '../ui/page-title/page-title.service';

@Component({
  selector: 'app-home-page',
  imports: [HeaderBannerComponent, SearchBarComponent, NgIcon],
  templateUrl: './home-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ featherBook, featherGithub })],
})
export class HomePageComponent implements OnInit {
  private pageTitleService = inject(PageTitleService);

  ngOnInit(): void {
    this.pageTitleService.setTitle('Zoek door verbonden erfgoed');
  }
}
