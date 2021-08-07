import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgForm } from '@angular/forms';
import { TasksService } from '../services/tasks.service';

// Dependency Injection ==> TasksService

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.scss']
})
export class AddTaskFormComponent implements OnInit {
  // used by [(NgModel)] which is a kind of Attribute directives
  title: string;
  description: string;
  time: string;

  constructor(public bsModalRef: BsModalRef, private service: TasksService) { }

  ngOnInit(): void {
  }

  // Event binding
  onSubmit(addTaskForm: NgForm): void {
    if (addTaskForm.valid) {
      this.service.addNewTask(addTaskForm.value);
      addTaskForm.reset();
      this.bsModalRef.hide();
    }
  }
}
