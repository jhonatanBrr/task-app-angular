import { Injectable } from '@angular/core';
import { KEY_TASK, KEY_USERS } from '../../const/DB';
import { TaskInterface, UserInterface } from '../../interfaces/task';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageServiceService {

  taskData!:TaskInterface[];
  usersData!: UserInterface[];
  private filterUsers$ = new BehaviorSubject<UserInterface[]>([]);
  private filterTask$ = new BehaviorSubject<TaskInterface[]>([]);

  setFiltersUsers(name: string): void {
    if (!name || name === '') {
      this.filterUsers$.next(this.usersData);
    }
    const _name = name.toLocaleLowerCase().trim();
    const filteredData = this.usersData.filter((user) => user.name.toLocaleLowerCase().trim().includes(_name));
    this.filterUsers$.next(filteredData);
  }


  setFiltersTask(name: string, perStatus:boolean = false): void {
    if (!name || name === '') {
      this.filterTask$.next(this.taskData);
    }
    const _name = name.toLocaleLowerCase().trim();
    if (!perStatus) {
      const filteredData = this.taskData.filter((task) => task.name.toLocaleLowerCase().trim().includes(_name));
      this.filterTask$.next(filteredData);
    } else {
      const filteredData = this.taskData.filter((task) => task.status.toLocaleLowerCase().trim().includes(_name));
      this.filterTask$.next(filteredData);
    }
  }

  getFiltersUsers():Observable<UserInterface[]> {
    return this.filterUsers$.asObservable();
  }

  getFiltersTask():Observable<TaskInterface[]> {
    return this.filterTask$.asObservable();
  }
  
  getTasks(): TaskInterface[] {
    const items = localStorage.getItem(KEY_TASK);
    this.taskData = items ? JSON.parse(items) : []; 
    this.filterTask$.next(this.taskData);
    return items ? JSON.parse(items) : [];
  }

  getUsers(): UserInterface[] {
    const items = localStorage.getItem(KEY_USERS);
    this.usersData = items ? JSON.parse(items) : [];
    this.filterUsers$.next(this.usersData);
    return this.usersData;
  }

  addTask(item: TaskInterface): void {
    const items = this.getTasks();
    item.id = items.length ? items[items.length - 1].id + 1 : 1; 
    items.push(item);
    localStorage.setItem(KEY_TASK, JSON.stringify(items));
  }

  addUser(item: UserInterface): void {
    const items = this.getUsers();
    item.id = items.length ? items[items.length - 1].id + 1 : 1; 
    items.push(item);
    localStorage.setItem(KEY_USERS, JSON.stringify(items));
  }

  updateTask(updatedItem: TaskInterface): void {
    let items = this.getTasks();
    items = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    localStorage.setItem(KEY_TASK, JSON.stringify(items));
  }

  updateUser(updatedItem: UserInterface): void {
    let items = this.getUsers();
    items = items.map(item => item.id === updatedItem.id ? updatedItem : item);
    localStorage.setItem(KEY_USERS, JSON.stringify(items));
  }

  deleteTask(id: number): void {
    let items = this.getTasks();
    items = items.filter(item => item.id !== id);
    localStorage.setItem(KEY_TASK, JSON.stringify(items));
    this.getTasks();
  }

  deleteUser(id: number): void {
    let items = this.getUsers();
    items = items.filter(item => item.id !== id);
    localStorage.setItem(KEY_USERS, JSON.stringify(items));
    this.getUsers();
  }
}
