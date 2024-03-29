import { IsEnum, IsOptional, IsString, Length, Matches } from 'class-validator'

enum Gender {
	Male = 'Male',
	Female = 'Female',
	Other = 'Other',
}
interface Register {
	login: string;
	name: string;
	lastName: string;
	password: string;
	gender: string;
}

export class RegisterDTO implements Register {
	@Length(3, 16)
	@IsString()
		login: string

	@Length(3)
	@IsString()
		name: string

	@Length(3)
	@IsString()
		lastName: string

	// Check password includes at least 1 capital letter, 1 special symbol and has at least 8 symbols
	@Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
		password: string

	@IsEnum(Gender)
	@IsOptional()
		gender: Gender
}
