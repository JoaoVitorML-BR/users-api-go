import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserDTO {
    name: string;
    username: string;
    @IsEmail({}, { message: 'Invalid email address' })
    email: string;
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, { message: 'The password must be at least 8 characters long and include uppercase, lowercase, number and symbol.' })
    password: string;
}

export class CreateUserAdminDTO extends CreateUserDTO { }