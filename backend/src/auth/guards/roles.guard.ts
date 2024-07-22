import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return false;
        }

        const token = authHeader.split(' ')[1];
        // console.log(token);
        const user = this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
        // console.log(roles);
        // console.log(user);
        // console.log(user.role);

        return roles.includes(user.role);
    }
}
