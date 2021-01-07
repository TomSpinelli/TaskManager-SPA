import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { AppChildComponent } from './appchild.component';
import { Page404Component } from './util/page404.component';
import { TaskComponent } from './taskManager/viewTask/task.component';
import { TaskListComponent } from './taskManager/viewInsertList/taskList.component';
import { TaskManagerService } from './taskManager/controller/taskManager.service';

const appRoutes: Routes = [
  { path: 'addTaskList', component: TaskListComponent },
  { path: 'manageTask', component: TaskComponent },
  { path: '', redirectTo: '/addTaskList', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    AppComponent, TaskListComponent, TaskComponent, AppChildComponent, Page404Component
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,  RouterModule.forRoot(appRoutes)
  ],
  providers: [TaskManagerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
