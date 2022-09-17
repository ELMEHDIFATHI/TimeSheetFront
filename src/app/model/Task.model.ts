import { Employee } from "./Employee.model";
import { Project } from "./Project.model";

export class Task {
    id_Task: number;
    nom: string;
    status: string;
    description: string;
    duration: number;
    verified : boolean;
    employeeTask: Employee;
    projectTask :Project;
}