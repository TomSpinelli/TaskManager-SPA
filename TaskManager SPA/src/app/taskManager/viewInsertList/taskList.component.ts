import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskManagerService } from '../controller/taskManager.service';
import { TaskList } from '../model/taskList';

@Component({
    selector: 'app-taskList',
    templateUrl: './taskList.component.html',
    styleUrls: ['./taskList.component.css']
})

export class TaskListComponent implements OnInit {

    taskLists: TaskList[];
    statusMessage: string;
    taskList = new TaskList();

    constructor(private _taskManagerService: TaskManagerService, private _router: Router ) { }


    /*
    *
    */
    addTaskList(): void {
      
        if(this.taskList.getName() !=  null){
            this._taskManagerService.addTaskList(this.taskList)
                .subscribe((response) => {  alert("Operation Sucess!");console.log(response); this.reset(); this.getTaskLists() },
                    (error) => {
                        console.log(error); alert("Operation Fail!");
                        this.statusMessage = "Sorry. Service Trouble.";
                    }
                );
        }else{
            alert("Please type in a TaskList Name")
        }
    }


    /*
    *
    */
    ngOnInit(): void {
        this.getTaskLists();
    }


    /*
    *
    */
    getTaskLists(): void {
        this._taskManagerService.getTaskLists()
            .subscribe((taskListData) => this.taskLists = taskListData,
                (error) => {
                    console.log(error);
                    this.statusMessage = "Sorry. Service Trouble.";
                }
            );
    }


    /*
    *
    */
    deleteTaskList(taskListId: string) {
        this._taskManagerService.deleteTaskList(taskListId)
            .subscribe((response) => { alert("Operation Sucess!"); console.log(response); this.getTaskLists(); },
                (error) => {
                    console.log(error);alert("Operation Fail!");
                    this.statusMessage = "Sorry. Service Trouble.";
                });
        this.reset();
    }


    /*
    *
    */
    private reset() {
        this.taskList.name = null;
        this.taskList.id = null;
    }


}