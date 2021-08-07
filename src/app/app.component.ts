import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';

// Dependency Injection ==> TasksService

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'kanban';

  // To render columns/ boards
  boardsNames: string[];
  boardsColors: string[];

  // Specify the class (bootstrap grid system)
  colClass: string = '';

  constructor(private service: TasksService) {
    this.boardsNames = Object.keys(service.boards);
    this.boardsColors = Object.values(service.boards);

    // calc the width that each board need
    const boardsCount = this.boardsNames.length;
    const availbleColumns = {
      1: 12,
      2: 6,
      3: 4,
      4: 3,
      5: 2,
      6: 2,
    }
    const colNum = boardsCount > 6 ? 1 : availbleColumns[boardsCount];
    this.colClass = `col-lg-${colNum}`;
  }
}
