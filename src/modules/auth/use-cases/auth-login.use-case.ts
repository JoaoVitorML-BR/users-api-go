import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "src/modules/users/user.service";
import { SignInDto } from "../dto/sign-in.dto";

import * as bcrypt from 'bcrypt';
import { ApiResponseDto } from "src/modules/users/dto/api-response.dto";
import { ResponseAuthLoginDTO } from "../dto/response-auth-login.dto";

import { AuthService } from "../auth.service";

@Injectable()
export class AuthSignInUseCase {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService
    ) { }

    async signIn(signInDto: SignInDto): Promise<ApiResponseDto<ResponseAuthLoginDTO>> {
        const { login, password } = signInDto;
        if (!login || !password) {
            throw new UnauthorizedException('username or email with password are required');
        }

        // check if the user exists by username or email
        const userExists = await this.userService.findByUsernameOrEmail(login);
        if (!userExists) {
            throw new UnauthorizedException('User incorrect');
        }

        // Check if the provided password matches the stored hashed password
        const passwordMatch = await bcrypt.compare(password, userExists.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid credentials or password');
        }

        const { password: _, ...userWithoutPassword } = userExists;

        const tokens = await this.authService.generateAccessToken(userWithoutPassword);

        return {
            statusCode: 200,
            status: true,
            code: "SUCCESS",
            message: "Login successful",
            data: {
                user: {
                    id: userWithoutPassword.id,
                    name: userWithoutPassword.name,
                    username: userWithoutPassword.username,
                    email: userWithoutPassword.email,
                    role: userWithoutPassword.role
                },
                accessToken: tokens.accessToken,
                refreshToken: tokens.refreshToken,
                expiresIn: tokens.expiresIn
            }
        };
    }
}