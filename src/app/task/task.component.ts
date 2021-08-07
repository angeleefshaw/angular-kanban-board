import { Component, OnInit, Input } from '@angular/core';
import { IndividualTaskInterface } from '../services/tasksInterfaces';
import { TasksService } from '../services/tasks.service';

// Dependency Injection ==> TasksService

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  // Bind values between components using @Input()
  @Input() task: IndividualTaskInterface = {
    id: 0,
    board: '',

    title: '',
    time: ''
  }

  time: string | number;
  color: string;

  constructor(private service: TasksService) { }

  ngOnInit(): void {
    this.time = `${this.task.time} ${this.task.time == '1' ? 'day' : 'days'}`;
    this.color = this.service.boards[this.task.board];
  }
}
