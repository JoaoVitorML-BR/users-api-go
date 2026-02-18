import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { UserService } from "../user.service";
import { CreateUserDTO } from "../dto/create-users.dto";

import { ROLE } from "../user.entity";
import { ApiResponseDto } from "../dto/api-response.dto";

@Injectable()
export class CreateUsersUseCase {
    constructor(private readonly userService: UserService) { }

    async create(Data: CreateUserDTO): Promise<ApiResponseDto<CreateUserDTO>> {

        if (!Data.name || !Data.email || !Data.password || !Data.username) {
            throw new BadRequestException("Name, username, email and password are required");
        }

        const userCount = await this.userService.count();

        if (userCount === 0) {
            const user = await this.userService.create({ ...Data, role: ROLE.ADMIN_MASTER });

            if (!user || !user.id) {
                throw new InternalServerErrorException("Failed to create user");
            }

            return {
                statusCode: 201,
                status: true,
                message: "User created successfully",
                data: user
            };
        }

        const userExists = await this.userService.checkUserExistsByEmailAndUsername(Data.email, Data.username);

        if (userExists) {
            throw new ConflictException('User with the same email or username already exists');
        }

        const res = await this.userService.create({ ...Data, role: ROLE.USER });

        if (!res || !res.id) {
            throw new InternalServerErrorException('Failed to create user');
        }

        return {
            statusCode: 201,
            status: true,
            message: "User created successfully",
            data: res
        };
    }
}