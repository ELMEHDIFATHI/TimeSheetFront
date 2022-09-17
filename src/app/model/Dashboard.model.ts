import { TaskChart } from "./TaskChart.model";


export class Dashboard {
    totalEmployee: number;
    totalManger: number;
    totalProject: number;
    doneProject: number;
    inProgressProject: number;
    projectDuration:Map<string,number>
    projectTaskTodo:number[];
    projectName:string[];
    projectTaskInProgress:number[];
    projectTaskDone:number[];
    taskDoneNoVerified:number;

}