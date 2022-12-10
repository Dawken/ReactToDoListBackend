import {IsEmail, IsIn, IsString, Length} from "class-validator";
import {ClassTransformer , plainToClass} from "class-transformer";
import {validate} from "class-validator";
import {ClassType} from "class-transformer/ClassTransformer";

type TGender = "male" | "female" | "other"

interface Form {
    login: string
    name: string
    lastName: string
    password: string
    gender: string
    birthDate: string
}
export class FormData implements Form {
    @Length(3, 16)
    login: string

    @IsString()
    name: string

    @IsString()
    lastName: string

    @IsString()
    password: string

    @IsString()
    gender: string

    @IsString()
    birthDate: string
}

export const formValidator = async<ObjectType extends object>(
    dto: ClassType<ObjectType>,
    obj: ObjectType
) => {
    const objInstance = plainToClass(dto, obj)
    const errors = await validate(objInstance)
    if (errors.length > 0) {
        throw new TypeError(
            `validation failed. The error fields : ${errors.map(
                ({ property }) => property
            )}`
        );
    }
};
