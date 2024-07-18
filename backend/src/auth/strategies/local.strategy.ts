import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    validate(username: string, password: string, role: string) {
        console.log('Inside Local Strategy validate');

        const user = this.authService.validateUser({
            username,
            password,
            role,
        });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
