// Valid tokens
import 'dotenv/config';

import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Configure the JWT strategy
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'fallback_secret',
        });
    }

    // This method is called by Passport to validate the JWT payload
    async validate(payload: any) {
        const user = await this.authService.validateUser(payload);
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user;
    }
}