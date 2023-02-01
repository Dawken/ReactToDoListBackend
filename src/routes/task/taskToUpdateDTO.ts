import { IsEnum, IsOptional, IsString, Matches } from 'class-validator'

enum TaskStatus {
	todo = 'todo',
	during = 'during',
	done = 'done',
}
interface TaskToUpdate {
	text?: string;
	taskStatus?: string;
	description?: string;
}

export class TaskToUpdateDTO implements TaskToUpdate {
	@IsOptional()
	// Check if text includes letters or numbers
	@Matches(/.*\S.*/)
		text?: string

	@IsOptional()
	@IsEnum(TaskStatus)
		taskStatus?: string

	@IsOptional()
	@IsString()
		description?: string
}
