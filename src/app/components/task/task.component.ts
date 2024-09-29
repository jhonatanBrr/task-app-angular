import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BulletsComponent } from '../general/bullets/bullets.component';
import { tasks } from '../../const/mock'
import { FormTaskComponent } from '../forms/form-task/form-task.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageServiceService } from '../../services/DB/local-storage-service.service';
import { TaskInterface } from '../../interfaces/task';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [BulletsComponent, MatIconModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent implements OnInit {
  tasks = tasks;
  @Output() onClick = new EventEmitter<void>();
  

  constructor(
    public dialog: MatDialog,
    public localStorageService: LocalStorageServiceService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.subscribeFilterTasks();
  }

  getUsers(): void {
    this.tasks = this.localStorageService.getTasks();
  }

  subscribeFilterTasks(): void {
    this.localStorageService.getFiltersTask().subscribe((tasks) => {
      this.tasks = tasks;
    });
  }
  
  openDialog(task: TaskInterface): void {
    const dialogRef = this.dialog.open(FormTaskComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.localStorageService.getTasks();
    });
  }

  deleteTask(event:Event, id:number): void {
    event.stopPropagation();
    this.localStorageService.deleteTask(id)
  }
}
