import { Injectable } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class FindAllUsersUseCase {
    constructor(private readonly userService: UserService){}

    async findAll() {
        return this.userService.findAll();
    }
}