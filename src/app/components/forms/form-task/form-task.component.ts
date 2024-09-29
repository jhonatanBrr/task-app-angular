import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { status } from '../../../const/status';
import { ButtonComponent } from '../../general/button/button.component';
import { TaskInterface, UserInterface } from '../../../interfaces/task';
import { BulletsComponent } from '../../general/bullets/bullets.component';
import { LocalStorageServiceService } from '../../../services/DB/local-storage-service.service';


@Component({
  selector: 'app-form-task',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    ButtonComponent, 
    BulletsComponent,
    FormsModule
  ],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css'
})
export class FormTaskComponent implements OnInit {
  readonly data = inject<TaskInterface>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<FormTaskComponent>);

  constructor(
    public localStorageService: LocalStorageServiceService
  ) { }

  update: boolean = false;

  skills: string[] = [];
  status = status;
  statusList = Object.values(status);
  availableUsers: UserInterface[] = this.localStorageService.usersData;
  selectedAssignedPeople: string[] = [];

  public formTaskData = new FormGroup({
    name: new FormControl('',[
      Validators.required, 
      Validators.minLength(5),
    ]),
    dueDate: new FormControl('', [
      Validators.required 
    ]),
    status: new FormControl('', [
      Validators.required,
    ]),
    skill: new FormControl('')
  });

  deleteNonAvailableUsers() {
    this.deleteNonExistentUserseleteUsers();
    this.selectedAssignedPeople
    this.availableUsers = this.availableUsers.filter(_option => !this.selectedAssignedPeople.includes(_option.name))

  }

  deleteNonExistentUserseleteUsers() {
    const usersStorageMap = this.localStorageService.usersData.map(_user => _user.name.toLocaleLowerCase().trim())
    this.selectedAssignedPeople = this.data.assignedPeople.filter(_user => usersStorageMap.includes(_user.toLocaleLowerCase().trim()))
  }

  loadForm() {
    if (this.data) {
      this.update = true;
      this.formTaskData.patchValue({
        name: this.data.name,
        dueDate: this.data.dueDate,
        status: this.data.status
      })
      this.skills = this.data.technologies;
      this.deleteNonAvailableUsers();
    }
  }

  ngOnInit(): void {
    this.loadForm();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  createTaskJSON(): TaskInterface {
    const JSON: TaskInterface = {
      "id": this.update ? this.data.id : 0,
      "name": String(this.formTaskData.value.name),
      "dueDate": String(this.formTaskData.value.dueDate),
      "assignedPeople": [...this.selectedAssignedPeople],
      "status": String(this.formTaskData.value.status),
      "technologies": [...this.skills]
    }

    return JSON;
  }

  createTask(): void {   
    const data = this.createTaskJSON()
    if (!this.update) {
      this.localStorageService.addTask(data)
    } else {
      this.localStorageService.updateTask(data)
    }
    this.closeDialog();
  }

  addSkill(event:Event): void { 
    event.preventDefault();
    const skill = this.formTaskData.controls['skill'].value;
    this.skills.push(skill as string)
    this.formTaskData.controls['skill'].setValue('');
  }

  deleteSkill(index: number): void {
    this.skills.splice(index, 1)
  }

  onSelectOption(event: Event): void {
    const target = event.target as HTMLInputElement;
    const option = target.value;
    if (option) {      
      this.availableUsers = this.availableUsers.filter(user => user.name.toLocaleLowerCase().trim() !== option.toLocaleLowerCase().trim());
      this.selectedAssignedPeople.push(option);
      target.value = ''
    }
  }

  removeOption(index: any): void {
    const user = this.selectedAssignedPeople[index];
    this.selectedAssignedPeople = this.selectedAssignedPeople.filter(_user => _user != user);
    const option: UserInterface = this.localStorageService.usersData.filter((_user) => _user.name === user)[0];
    this.availableUsers.push(option);
  }

}
