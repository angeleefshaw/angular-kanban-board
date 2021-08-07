import { Component, OnInit, Input } from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { IndividualTaskInterface } from '../services/tasksInterfaces';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TaskDetailsFormComponent } from '../task-details-form/task-details-form.component';

// Dependency Injection ==> TasksService

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

  // Bind values between components : @Input()
  @Input() boardType: string = '';
  @Input() boardColor: string = '';

  // used by rxjs subscriptions
  allTasks: IndividualTaskInterface[];
  boardTasks: IndividualTaskInterface[];

  bsModalRef: BsModalRef;

  // used by Property binding ==> [class]="taskWidth"
  taskWidth: string = ''; // tasks width class

  constructor(private service: TasksService, private modalService: BsModalService) {
    // calc column/ board width using bootstrap grid system
    const boardsCount: number = Object.keys(this.service.boards).length;
    this.taskWidth = boardsCount === 1 ? 'fourth' : boardsCount === 2 ? 'third' : boardsCount === 3 ? 'half' : '';
  }

  ngOnInit(): void {
    //  rxjs subscriptions
    this.service.allTasksObserv.subscribe((arr: IndividualTaskInterface[]) => {

      this.allTasks = arr;
      this.boardTasks = this.allTasks.filter((task: IndividualTaskInterface) => task.board === this.boardType).sort(function (a, b) {
        return a.updatedOn - b.updatedOn;
      });

      // how many tasks do each board contains?
      this.service.boardsCount[this.boardType] = this.boardTasks.length;
    });
  }

  // all these methods are used by Event binding

  // task --> on dbclick --> open task details to show/edit them
  openTaskDetails(e: Event): void {
    const taskId = parseInt(e.target['closest']('.board-task')['id'].replace('task_', ''));
    this.service.updateCurrEditableTaskBehavior(this.boardTasks.filter((task: IndividualTaskInterface) => task.id == taskId)[0]);
    this.bsModalRef = this.modalService.show(TaskDetailsFormComponent);
  }

  // add drag and drop functionality
  taskDragStart(e: Event): void {
    e['dataTransfer'].setData('text', e.target['id']);
  }

  onBoardDragOver(e: Event) {
    e.preventDefault();
  }

  onBoardDrop(e: Event) {
    e.preventDefault();
    const dataTransfered = e['dataTransfer'].getData('text');
    // update UI and data on localStorage
    const id = parseInt(dataTransfered.replace('task_', ''));
    this.service.updateTaskParent(id, this.boardType);
  }
}
