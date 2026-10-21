import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { featherArrowRight } from '@ng-icons/feather-icons';

@Component({
  selector: 'app-arrow-indicator',
  imports: [NgIconComponent],
  providers: [provideIcons({ featherArrowRight })],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div
      class="absolute bottom-2 right-2 bg-[#ffffffbb] rounded-full w-8 h-8 flex items-center justify-center transition-colors group-hover:bg-[#ffffffe9]"
    >
      <ng-icon name="featherArrowRight" size="16" />
    </div>
  `,
})
export class ArrowIndicatorComponent {}
