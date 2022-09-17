import { Byte } from "@angular/compiler/src/util";
import { Role } from "./Role.mode";

export class Employee {
    id: number;
    username: string
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    photo: Byte[];
    roles: string[];
}