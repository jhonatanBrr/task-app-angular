import { Component } from '@angular/core';
import { SearcherComponent } from '../../components/searcher/searcher.component';
import { FiltersComponent } from '../../components/filters/filters.component';
import { ButtonComponent } from '../../components/general/button/button.component';
import { TaskComponent } from '../../components/task/task.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { FormTaskComponent } from '../../components/forms/form-task/form-task.component';
import { LocalStorageServiceService } from '../../services/DB/local-storage-service.service';

@Component({
  selector: 'app-view-tasks',
  standalone: true,
  imports: [SearcherComponent, FiltersComponent, ButtonComponent, TaskComponent],
  templateUrl: './view-tasks.component.html',
  styleUrl: './view-tasks.component.css'
})
export class ViewTasksComponent {
  constructor(
    public dialog: MatDialog,
    public localStorageService: LocalStorageServiceService
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(FormTaskComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.localStorageService.getTasks()
    });
  }

  filterUsers(name: string) {
    this.localStorageService.setFiltersTask(name)
  }

  filterPerState(state: string) {    
    this.localStorageService.setFiltersTask(state, true)
  }
}
