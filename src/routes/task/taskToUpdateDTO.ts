import { IsOptional, IsString, Matches } from 'class-validator'

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
	@IsString()
		taskStatus?: string

	@IsOptional()
	@IsString()
		description?: string
}
