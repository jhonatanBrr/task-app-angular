import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { status } from '../../const/status';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.css'
})
export class FiltersComponent implements OnInit {
  stateInput = new FormControl('');
  @Output() filter = new EventEmitter<string>();

  status = status;

  statusList = Object.values(status);
  
  ngOnInit(): void {
    this.subscribeControl();
  }

  subscribeControl() {
    this.stateInput.valueChanges.pipe().subscribe((data) => {
      this.filter.emit(data as string)
    })
  }
}
