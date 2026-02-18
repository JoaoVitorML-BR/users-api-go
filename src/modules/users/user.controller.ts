import { Body, Controller, Get, Post } from "@nestjs/common";
import { FindAllUsersUseCase } from "./use-cases/find-all-users.use-case";
import { CreateUserDTO } from "./dto/create-users.dto";
import { CreateUsersUseCase } from "./use-cases/create-users.use-case";

@Controller('users')
export class UserController {
    constructor(
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
        private readonly createUsersUseCase: CreateUsersUseCase
    ) { }

    @Get()
    async findAll() {
        return this.findAllUsersUseCase.findAll();
    }

    @Post()
    async create(@Body() Data: CreateUserDTO) {
        return this.createUsersUseCase.create(Data);
    }
}