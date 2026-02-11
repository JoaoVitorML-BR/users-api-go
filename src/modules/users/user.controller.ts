import { Controller, Get } from "@nestjs/common";
import { FindAllUsersUseCase } from "./use-cases/find-all-users.use-case";

@Controller('users')
export class UserController {
    constructor(private readonly userCase: FindAllUsersUseCase) { }

    @Get()
    async findAll() {
        return this.userCase.findAll();
    }
}