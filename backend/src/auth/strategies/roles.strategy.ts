import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class RolesStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET,
        });
    }

    validate(payload: any) {
        console.log('Inside Roles Strategy validate');
        console.log(payload);
        return payload;
    }
}
