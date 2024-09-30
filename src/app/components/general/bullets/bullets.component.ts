import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { colors } from '../../../const/colors'

@Component({
  selector: 'app-bullets',
  standalone: true,
  imports: [],
  templateUrl: './bullets.component.html',
  styleUrl: './bullets.component.css'
})
export class BulletsComponent {
  @Input() name: string[] = [];
  @Input() deleteAction: boolean = false;
  @Output() onDelete = new EventEmitter<number>();

  getColor() {
    return colors[0];
  }

  deleteChip(index: number): void {
    this.onDelete.emit(index)
  }
}
