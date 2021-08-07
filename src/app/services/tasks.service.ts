import { Injectable } from '@angular/core';
import { Iboards, Ilimits, IndividualTaskInterface } from './tasksInterfaces';
import { BehaviorSubject } from 'rxjs';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';


// services are examples of dependency injection in Angular
// They use the "Injectable" to clarify where it'll be used in the app
// Here, this service will be used across the whole app

@Injectable({
  providedIn: 'root'
})

export class TasksService {
  // specify boards --> you can add new boards/ columns just by typing extra property here
  // ex: test: '#000'

  boards: Iboards = {
    backlog: '#022c68',
    inprogress: '#0b75b4',
    done: '#4db5f4'
  }

  // It'll contain properties like: backlog: 6 (how many tasks are in the board) 
  // This updates when any change happened to tasks. ex: "add", "move", or "delete"

  boardsCount: Ilimits = {};

  // Here are the default values
  defaultBoard = 'backlog';
  defaultLimit = 10;

  // This is used when need to show a notification message
  notificationMsg: string[] = [''];

  // Data to be used in the app
  allTasksArr: IndividualTaskInterface[] = [];

  // observables
  // here is how to use "BehaviorSubject" provided by the "rxjs" to subscribe to them later by components

  private allTasksBehavior: BehaviorSubject<IndividualTaskInterface[]> = new BehaviorSubject([]);
  allTasksObserv = this.allTasksBehavior.asObservable();

  private currEditableTaskBehavior: BehaviorSubject<IndividualTaskInterface> = new BehaviorSubject({
    id: 0,
    board: '',
    title: '',
    time: 0,
  });
  currEditableTaskObserv = this.currEditableTaskBehavior.asObservable();

  updateCurrEditableTaskBehavior(obj: IndividualTaskInterface): void {
    this.currEditableTaskBehavior.next(obj);
  }

  bsModalRef: BsModalRef; // ngx bootstrap modal

  constructor(private modalService: BsModalService) {
    // check if there's any data in the local storage to update the UI
    this.getFromLocalStorage();
    this.allTasksBehavior.next(this.allTasksArr);
  }

  // add, remove, update tasks using UI
  // why "updatedOn" property? --> to keep tasks sorts (what added first comes first or what moved later comes later)

  addNewTask(obj): void {

    // add extra data
    obj.id = new Date().getTime();
    obj.board = this.defaultBoard;
    obj.updatedOn = new Date().getTime();

    if (this.boardsCount[this.defaultBoard] < this.defaultLimit) {
      // push data to the allTasksArr    
      this.allTasksArr.push(obj);

      // update data
      this.updateallTasksArr(this.allTasksArr);
    } else this.showNotification([`You can not add more than ${this.defaultLimit} tasks in same board.`, `The "${this.defaultBoard}" board already have ${this.defaultLimit} tasks.`, `You can move some tasks to others boards or mark them as closed.`]);
  }

  updateTaskParent(taskID: number | string, newBoard: string): void {
    if (this.boardsCount[newBoard] < this.defaultLimit) {
      const targetObj = this.allTasksArr.filter((obj: IndividualTaskInterface) => obj.id == taskID)[0];
      targetObj.board = newBoard;
      targetObj.updatedOn = new Date().getTime();
      this.updateallTasksArr(this.allTasksArr);
    } else this.showNotification([`You can not add more than ${this.defaultLimit} tasks in same board.`, `The "${newBoard}" board already have ${this.defaultLimit} tasks.`, `You can move some tasks to others boards or mark them as closed.`]);
  }

  updateTaskDetails(obj: IndividualTaskInterface): void {
    const updatedObj = this.allTasksArr.filter((task: IndividualTaskInterface) => task.id === obj.id)[0];
    if (obj.board !== updatedObj.board) obj.updatedOn = new Date().getTime();

    if (this.boardsCount[obj.board] < this.defaultLimit) {
      // update saved data
      for (let prop in obj) {
        updatedObj[prop] = obj[prop];
      }
      this.updateallTasksArr(this.allTasksArr);
    } else this.showNotification([`You can not add more than ${this.defaultLimit} tasks in same board.`, `The "${obj.board}" board already have ${this.defaultLimit} tasks.`, `You can move some tasks to others boards or mark them as closed.`]);
  }

  closeTask(taskId): void {
    let index: number = -1, i: number = 0;
    while (index < 0) {
      if (this.allTasksArr[i].id == taskId) index = i;
      i++;
    }
    if (index >= 0) {
      this.allTasksArr.splice(index, 1);
      this.updateallTasksArr(this.allTasksArr);
    }
  }

  // set, get, and update data
  saveToLocalStorage(tasksArr: IndividualTaskInterface[]): void {
    localStorage.setItem('allTasks', JSON.stringify(tasksArr));
  }

  getFromLocalStorage(): void {
    const tasks = localStorage.getItem('allTasks');
    if (tasks) this.updateallTasksArr(JSON.parse(tasks));
  }

  updateallTasksArr(arr: IndividualTaskInterface[]): void {
    this.allTasksArr = arr;
    this.saveToLocalStorage(this.allTasksArr);
    this.allTasksBehavior.next(this.allTasksArr);
  }

  // show notifications
  showNotification(msg: string[]): void {
    this.notificationMsg = msg;
    this.bsModalRef = this.modalService.show(NotificationModalComponent);
  }
}
