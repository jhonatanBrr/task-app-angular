import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { alert } from '../../../interfaces/alert';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.scss'
})
export class AlertComponent {

  readonly data = inject<alert>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<AlertComponent>);

  closeDialog() {
    this.dialogRef.close();
  }
}
