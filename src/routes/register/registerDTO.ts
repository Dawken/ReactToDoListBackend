import {IsEnum, IsString, Length, Matches} from 'class-validator'

enum Gender {
	Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

interface RegisterTypes {
    login: string
    name: string
    lastName: string
    password: string,
    gender: string
    birthDate: string
}

export class RegisterDTO implements RegisterTypes {
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
    	gender: Gender

    @IsString()
    	birthDate: string
}

