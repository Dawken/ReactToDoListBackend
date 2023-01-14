import {IsString, Matches} from 'class-validator'

interface Login {
    login: string
    password: string
}

export class LoginDTO implements Login {

    @IsString()
    login: string

    // Check password includes at least 1 capital letter, 1 special symbol and has at least 8 symbols
    @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/)
    password: string
}

