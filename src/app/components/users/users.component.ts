import { Component } from '@angular/core';
import { users } from '../../const/mock'
import { BulletsComponent } from '../general/bullets/bullets.component';
import { LocalStorageServiceService } from '../../services/DB/local-storage-service.service';
import { FormUserComponent } from '../forms/form-user/form-user.component';
import { MatDialog } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { UserInterface } from '../../interfaces/task';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ BulletsComponent, MatIconModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  users = users;
  constructor(
    public localStorageService: LocalStorageServiceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.subscribeFilterUsers();
  }

  getUsers(): void {
    this.users = this.localStorageService.getUsers();
  }

  subscribeFilterUsers(): void {
    this.localStorageService.getFiltersUsers().subscribe((users) => {
      this.users = users;
    });
  }

  openDialog(user: UserInterface): void {
    const dialogRef = this.dialog.open(FormUserComponent, {
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      this.localStorageService.getUsers();
    });
  }

  deleteUser (event:Event,id:number): void {
    event.stopPropagation();
    this.localStorageService.deleteUser(id)
  }
}
