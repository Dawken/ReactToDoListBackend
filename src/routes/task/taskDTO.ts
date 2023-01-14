import {IsOptional, IsString} from "class-validator";

interface Task {
    text: string
    taskStatus:string
    description:string
}

export class TaskDTO implements Task {

    @IsOptional()
    @IsString()
    text: string

    @IsOptional()
    @IsString()
    taskStatus: string

    @IsOptional()
    @IsString()
    description: string
}
