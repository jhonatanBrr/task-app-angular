import { Component, EventEmitter, input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  label = input<string>();
  type = input<string>();
  disabled = input<boolean>();
  @Output() onClick = new EventEmitter<void>();

  toggle() {
    this.onClick.emit();
  }

  validateButton():string {
    if (this.type() == 'primary') {
      return 'var(--primary-color)'
    } else {
      return 'var(--secondary-color)'
    }
  }
}
