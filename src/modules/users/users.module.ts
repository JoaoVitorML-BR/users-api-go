import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService, 
        FindAllUsersUseCase
    ],
    exports: [UserService],
})
export class UsersModule { }