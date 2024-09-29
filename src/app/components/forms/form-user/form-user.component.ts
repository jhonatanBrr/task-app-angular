import { Component, inject, OnInit } from '@angular/core';
import { LocalStorageServiceService } from '../../../services/DB/local-storage-service.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../general/button/button.component';
import { UserInterface } from '../../../interfaces/task';
import { BulletsComponent } from '../../general/bullets/bullets.component';
import { AlertComponent } from '../../general/alert/alert.component';

@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonComponent, BulletsComponent],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.scss'
})
export class FormUserComponent implements OnInit {

  skills: string[] = [];
  update:boolean = false;
  readonly data = inject<UserInterface>(MAT_DIALOG_DATA);
  readonly dialogRef = inject(MatDialogRef<FormUserComponent>);
  readonly dialog = inject(MatDialog);
  
  constructor(
    private localStorageService: LocalStorageServiceService
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.update = true;
      this.formUserData.patchValue({
        name: this.data.name,
        age: String(this.data.age)
      })
      this.skills = this.data.skills;
    }
  }

  public formUserData = new FormGroup({
    name: new FormControl('', [
      Validators.required, 
      Validators.minLength(5),
    ]),
    age: new FormControl('', [
      Validators.required, 
      Validators.min(18)
    ]),
    skill: new FormControl('')
  });

  closeDialog(): void {
    this.dialogRef.close();
  }

  createUserJSON ():UserInterface {
    const JSON:UserInterface = {
      "id": this.update? this.data.id : 0,
      "name": String(this.formUserData.value.name),
      "age": Number(this.formUserData.value.age),
      "skills": [...this.skills]
    }

    return JSON;
  }

  validateNameAvailability(data:UserInterface): boolean {
    const names = this.localStorageService.usersData.map((_user) => _user.name.toLocaleLowerCase().trim())
    return names.includes(data.name.toLocaleLowerCase().trim())
  }

  createUser(): void {
    const data = this.createUserJSON()
    const flag = this.validateNameAvailability(data)
    
    if (flag && !this.update) {
      console.log('este nom,bre no se');
      this.dialog.open(AlertComponent, {
        data: {
          title: 'Atencion',
          alert: 'Este Usuario ya existe'
        }
      })
    } else {
      if (!this.update) {
        this.localStorageService.addUser(data)
      } else {
        this.localStorageService.updateUser(data)
      }
      this.closeDialog();
    }
  }

  addSkill(event:Event): void {
    event.preventDefault(); 
    const skill = this.formUserData.controls['skill'].value
    this.skills.push(skill as string)
  }

  deleteSkill(index: number): void {
    this.skills.splice(index, 1)
  }

}
