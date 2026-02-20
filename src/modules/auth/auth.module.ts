import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { AuthSignInUseCase } from "./use-cases/auth-login.use-case";
import { UsersModule } from "../users/users.module";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./strategies/jwt.strategy";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }
        })],
    controllers: [AuthController],
    providers: [
        AuthService,
        AuthSignInUseCase,
        JwtStrategy,
    ],
    exports: [AuthService],
})

export class AuthModule { }