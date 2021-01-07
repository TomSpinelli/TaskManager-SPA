
export class Task{
    
    name: string;
    id: string;
    taskDone: string;
    idTaskList: string;
   
   constructor(){ }

    setIdTaskList(value: string) {
        this.idTaskList = value;
    }

    getName() {
       return this.name;
    }
}
