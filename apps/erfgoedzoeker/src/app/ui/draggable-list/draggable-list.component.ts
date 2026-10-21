import { CdkDrag, CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import {
  Component,
  input,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { DraggableListItem } from './draggable-list-item';

@Component({
  selector: 'app-draggable-list',
  imports: [CdkDropList, CdkDrag, NgIcon],
  templateUrl: './draggable-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './draggable-list.component.scss',
})
export class DraggableList {
  items = input.required<DraggableListItem[]>();
  trackBy = input.required<(item: DraggableListItem) => string | number>();

  itemsReordered = output<{ previousIndex: number; currentIndex: number }>();
  itemToggled = output<number>();

  protected onDrop(event: CdkDragDrop<string[]>): void {
    this.itemsReordered.emit({
      previousIndex: event.previousIndex,
      currentIndex: event.currentIndex,
    });
  }

  protected onToggle(index: number, event: Event): void {
    event.stopPropagation();
    this.itemToggled.emit(index);
  }
}
