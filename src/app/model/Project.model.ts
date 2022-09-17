import { Task } from "./Task.model";

export class Project {

    id_Project: number;
    name: string;
    description: string;
    duration: number;
    client: string;
    taskList: Task[];
    status:string;

}