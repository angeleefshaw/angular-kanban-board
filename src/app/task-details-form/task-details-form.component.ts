import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { TasksService } from '../services/tasks.service';
import { IndividualTaskInterface } from '../services/tasksInterfaces';

// Dependency Injection ==> TasksService
// Directives ==> ngForm

@Component({
  selector: 'app-task-details-form',
  templateUrl: './task-details-form.component.html',
  styleUrls: ['./task-details-form.component.scss']
})

export class TaskDetailsFormComponent implements OnInit {
  // used by [(NgModel)] which is a kind of Attribute directives
  title: string;
  description: string;
  time: string | number;
  assignTo: string;
  board: string;

  // used by *ngFor which is a kind of Structural directives
  boardsTypes: string[];

  // used by rxjs subscriptions
  targetTask: IndividualTaskInterface = {
    id: 0,
    board: '',
    title: '',
    time: 0,
  };

  constructor(public bsModalRef: BsModalRef, private service: TasksService) {
    this.boardsTypes = Object.keys(this.service.boards);
  }

  ngOnInit(): void {
    // rxjs subscriptions
    this.service.currEditableTaskObserv.subscribe((obj: IndividualTaskInterface) => {
      this.targetTask = obj;
      this.title = this.targetTask.title;
      this.description = this.targetTask.description;
      this.time = this.targetTask.time;
      this.assignTo = this.targetTask.assignTo;
      this.board = this.targetTask.board;
    });
  }

  // Event binding
  onSubmit(editTaskForm: NgForm): void {
    if (editTaskForm.valid) {
      editTaskForm.value.id = this.targetTask.id;
      this.service.updateTaskDetails(editTaskForm.value);
      editTaskForm.reset();
      this.bsModalRef.hide();
    }
  }

  // Event binding
  closeTask(e: Event, editTaskForm: NgForm): void {
    this.service.closeTask(this.targetTask.id);
    editTaskForm.reset();
    this.bsModalRef.hide();
  }

}
