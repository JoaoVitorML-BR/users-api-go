import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";
import { CreateUserDTO } from "../dto/create-users.dto";

import { ROLE } from "../user.entity";

@Injectable()
export class CreateUsersUseCase {
    constructor(private readonly userService: UserService) { }

    async create(Data: CreateUserDTO) {

        if (!Data.name || !Data.email || !Data.password || !Data.username) {
            return {
                statusCode: 400,
                status: false,
                message: "Name, username, email and password are required"
            }
        }

        const userCount = await this.userService.count();

        if (userCount === 0) {
            const user = await this.userService.create({ ...Data, role: ROLE.ADMIN_MASTER });


            return user.id ? {
                statusCode: 201,
                status: true,
                message: "User created successfully",
                data: user
            } : {
                statusCode: 500,
                status: false,
                message: "Failed to create user"
            };
        }

        const userExists = await this.userService.checkUserExistsByEmailAndUsername(Data.email, Data.username);

        if (userExists) {
            return {
                statusCode: 409,
                status: false,
                message: "User already exists"
            }
        }

        const res = await this.userService.create({ ...Data, role: ROLE.USER });

        if (!res) {
            return {
                statusCode: 500,
                status: false,
                message: 'Internal server error',
            }
        }

        return {
            statusCode: 201,
            status: true,
            message: "User created successfully",
            data: res
        };
    }
}