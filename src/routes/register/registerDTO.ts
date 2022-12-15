import {IsEnum, IsString, Length, Matches} from 'class-validator'

enum TGender {
	Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

interface Form {
    login: string
    name: string
    lastName: string
    password: string,
    gender: string
    birthDate: string
}

export class RegisterDTO implements Form {
    @Length(3, 16) @IsString()
    	login: string

	@Length(3) @IsString()
    	name: string

	@Length(3)
    	lastName: string

	@Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
    	password: string

    @IsEnum(TGender)
    	gender: TGender

    @IsString()
    	birthDate: string
}

