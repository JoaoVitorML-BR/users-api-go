import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthSignInUseCase } from "./use-cases/auth-login.use-case";
import { SignInDto } from "./dto/sign-in.dto";
import { RefreshTokenDto } from "./dto/refresh-token.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authUseCase: AuthSignInUseCase,
    ) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() credentials: SignInDto) {
        return this.authUseCase.signIn(credentials);
    }

    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    async refreshToken(@Body() dto: RefreshTokenDto) {
        return this.authUseCase.refreshToken(dto);
    }
}