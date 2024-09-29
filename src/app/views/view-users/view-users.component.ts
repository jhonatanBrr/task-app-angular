import { Component } from '@angular/core';
import { SearcherComponent } from '../../components/searcher/searcher.component';
import { ButtonComponent } from '../../components/general/button/button.component';
import { UsersComponent } from '../../components/users/users.component';
import { MatDialog } from '@angular/material/dialog';
import { LocalStorageServiceService } from '../../services/DB/local-storage-service.service';
import { FormUserComponent } from '../../components/forms/form-user/form-user.component';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [SearcherComponent, ButtonComponent, UsersComponent],
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
})
export class ViewUsersComponent {
  constructor(
    public dialog: MatDialog,
    public localStorageService: LocalStorageServiceService
  ) {

  }
  openDialog() {
    const dialogRef = this.dialog.open(FormUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.localStorageService.getUsers();
    });
  }

  filterUsers(name: string) {
    this.localStorageService.setFiltersUsers(name)
  }
}
