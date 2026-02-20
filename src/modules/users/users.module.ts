import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { FindAllUsersUseCase } from './use-cases/find-all-users.use-case';
import { CreateUsersUseCase } from './use-cases/create-users.use-case';
import { CreateUsersAdminUseCase } from './use-cases/create-users-admin.use-case';
import { RolesGuard } from '../auth/guards/roles.guard';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [
        UserService, 
        FindAllUsersUseCase,
        CreateUsersUseCase,
        CreateUsersAdminUseCase,
        RolesGuard,
    ],
    exports: [UserService],
})
export class UsersModule { }