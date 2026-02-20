import { Injectable } from "@nestjs/common";
import { UserService } from "../users/user.service";
import { SignInDto } from "./dto/sign-in.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async signIn(userLogin: SignInDto) {
        const res = await this.userService.findByUsernameOrEmail(userLogin.login);
        return res;
    }

    async generateAccessToken(user) {
        // Generate access token logic would go here
        const payload = { username: user.username, sub: user.id, email: user.email, role: user.role };
        return {
            accessToken: this.jwtService.sign(payload, { expiresIn: '1h' }),
            refreshToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
            expiresIn: 3600
        }
    }

    async validateUser(payload: any) {
        const user = await this.userService.findById(payload.sub);
        if (!user || !user.isActive) {
            return null;
        }

        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}