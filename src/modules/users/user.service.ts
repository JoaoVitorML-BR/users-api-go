import { Injectable } from "@nestjs/common";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private readonly userEntity: Repository<User>) { }
    async findAll() {
        return this.userEntity.find();
    };

    async findOne(id: string) {
        return this.userEntity.findOne({ where: { id } });
    }

    async findByEmail(email: string) {
        return this.userEntity.findOne({ where: { email } });
    }

    async findById(id: string) {
        return this.userEntity.findOne({ where: { id } });
    }
};