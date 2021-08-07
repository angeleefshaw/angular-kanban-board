import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { TasksService } from '../services/tasks.service';

// Dependency Injection ==> TasksService

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef, public service: TasksService) { }

  ngOnInit(): void {
  }

}
