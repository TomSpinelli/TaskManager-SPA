import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TaskManagerService } from '../controller/taskManager.service';
import { Task } from '../model/task';

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

    tasks: Task[];
    statusMessage: string;
    task = new Task();
    taskListId: string;
    taskListName: string;

    constructor(private _TaskManagerService: TaskManagerService, private _router: Router, private route: ActivatedRoute) { }


    /*
    *
    */
    ngOnInit(): void {
       
       this.taskListId = this.route.snapshot.queryParams['id'];
       this.taskListName = this.route.snapshot.queryParams['name'];
       this.getTaskByListId(this.taskListId);
    }


    /*
    *
    */
    getTaskByListId(listId: string){
       
       if(this.taskListId !=  null){
          
            this._TaskManagerService.getTaskByListId(listId)
                .subscribe((taskData) => this.tasks = taskData,
                    (error) => {
                        console.log(error);
                        this.statusMessage = "Sorry. Service Trouble.";
                    }
                );
        }else{
            this._router.navigateByUrl("/addTaskList");
        }
    }


    /*
    *
    */
    addTask(): void {
        
        if(this.task.getName() !=  null){
           
            this.task.setIdTaskList(this.taskListId) ;
            this._TaskManagerService.addTask(this.task ,this.taskListId )
                .subscribe((response) => {  alert("Operation Sucess!");console.log(response); this.reset(); this.getTaskByListId(this.taskListId) },
                    (error) => {
                        console.log(error); alert("Operation Fail!");
                        this.statusMessage = "Sorry. Service Trouble.";
                    }
                );
        }else{
            alert("Please type in a Task Name")
        }        
    }


    /*
    *
    */
    deleteTask(id: string) {
      
        this._TaskManagerService.deleteTask(id)
            .subscribe((response) => { alert("Operation Sucess!"); console.log(response); this.getTaskByListId(this.taskListId); },
                (error) => {
                    console.log(error);alert("Operation Fail!");
                    this.statusMessage = "Sorry. Service Trouble.";
                });
        this.reset();
    }


    /*
    *
    */
    switchTaskStatus(id: string) {
       
        this._TaskManagerService.switchTaskStatus(id)
            .subscribe((response) => { alert("Operation Sucess!"); console.log(response); this.getTaskByListId(this.taskListId); },
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
        this.task.name = null;
        this.task.id = null;
   }
    
}