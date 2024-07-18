import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { Request } from 'express';
import { RegisterDto } from './dto/register.dto';

declare module 'express' {
    export interface Request {
        user: any;
    }
}

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.registerUser(registerDto);
    }

    @Post('login')
    @UseGuards(LocalGuard)
    @HttpCode(HttpStatus.OK)
    login(@Req() req: Request) {
        return req.user;
    }

    @Get('status')
    @UseGuards(JwtGuard)
    status(@Req() req: Request) {
        console.log('Inside AuthController status method');
        console.log(req.user);
        return req.user;
    }
}
