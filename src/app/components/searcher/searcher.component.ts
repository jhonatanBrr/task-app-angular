import { Component, EventEmitter, input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';


@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './searcher.component.html',
  styleUrl: './searcher.component.css'
})
export class SearcherComponent implements OnInit {
  placeholder = input<string>();
  @Output() onClick = new EventEmitter<void>();
  @Output() filter = new EventEmitter<string>();
  searcherInput = new FormControl('');

  ngOnInit(): void {
    this.subscribeControl();
  }

  subscribeControl(): void {
    this.searcherInput.valueChanges.pipe(debounceTime(1000)).subscribe((data) => {
      this.filter.emit(data as string)
    })
  }

}
