import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { TaskList } from '../model/taskList';
import { Task } from '../model/task';

@Injectable()
export class TaskManagerService {

    constructor(private _httpService: Http) { }


    /*
    *
    */
    addTaskList(taskList: TaskList) {
        
        let body = JSON.parse(JSON.stringify(taskList));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const params = new URLSearchParams();
        let options = new RequestOptions({ headers: headers, params: params });
       
        return this._httpService.post("http://localhost:8080/api/v1/tasklist/insert", body, options);
    }


    /*
    *
    */
    getTaskLists(): Observable<TaskList[]> {
        
        return this._httpService.get("http://localhost:8080/api/v1/tasklist/all")
            .map((response: Response) => response.json())
            .catch(this.handleError);
    }


    /*
    *
    */
    deleteTaskList(taskListId: string) {
        return this._httpService.delete("http://localhost:8080/api/v1/tasklist/delete/" + taskListId);
    }
 

    /*
    *
    */       
    addTask(task: Task, listId: string) {
        
        let body = JSON.parse(JSON.stringify(task));
        let headers = new Headers({ 'Content-Type': 'application/json' });
        const params = new URLSearchParams();
        let options = new RequestOptions({ headers: headers, params: params });
       
        return this._httpService.post("http://localhost:8080/api/v1/task/insert/" + listId , body, options);
    }


    /*
    *
    */
    getTaskByListId(listId: string): Observable<Task[]>{
        
        return this._httpService.get("http://localhost:8080/api/v1/task/tasklist/" + listId) 
        .map((response: Response) => response.json())
        .catch(this.handleError);
    }    


    /*
    *
    */
    deleteTask(taskId: string) {
        return this._httpService.delete("http://localhost:8080/api/v1/task/delete/" + taskId);
    }


    /*
    *
    */
    switchTaskStatus(taskId: string) {
        return this._httpService.get("http://localhost:8080/api/v1/task/switchtaskstatus/" + taskId);
    }


    /*
    *
    */
    private handleError(error: Response) {
        return Observable.throw(error);
    }

}