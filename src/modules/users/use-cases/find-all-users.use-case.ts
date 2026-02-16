import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";
import { ApiResponseDto } from "../dto/api-response.dto";
import { FindAllUsersResponseDto } from "../dto/find-all-uses-response.dto";

@Injectable()
export class FindAllUsersUseCase {
    constructor(private readonly userService: UserService) { }

    async findAll(): Promise<ApiResponseDto<FindAllUsersResponseDto[]>> {
        const res = await this.userService.findAll();

        if (!res) {
            return {
                statusCode: 500,
                status: false,
                message: 'Internal server error',
                data: [],
            }
        }

        return {
            statusCode: 200,
            status: true,
            message: 'Users retrieved successfully',
            data: res,
        }
    }
}