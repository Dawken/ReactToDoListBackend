import {IsEnum, IsString, Length} from 'class-validator'

enum TGender {
	Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

interface Form {
    login: string
    name: string
    lastName: string
    password: string
    gender: string
    birthDate: string
}

export class RegisterDTO implements Form {
    @Length(3, 16)
    	login: string

	@Length(3)
    	name: string

	@Length(5)
    	lastName: string

	@IsString()
    	password: string

    @IsEnum(TGender)
    	gender: TGender

    @IsString()
    	birthDate: string
}

