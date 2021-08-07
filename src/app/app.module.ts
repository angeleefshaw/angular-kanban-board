import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { BoardComponent } from './board/board.component';
import { TaskComponent } from './task/task.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ModalModule } from 'ngx-bootstrap/modal';
import { AddTaskFormComponent } from './add-task-form/add-task-form.component';
import { TaskDetailsFormComponent } from './task-details-form/task-details-form.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    AddTaskComponent,
    BoardComponent,
    TaskComponent,
    AddTaskFormComponent,
    TaskDetailsFormComponent,
    NotificationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  providers: [],
  entryComponents: [TaskDetailsFormComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
