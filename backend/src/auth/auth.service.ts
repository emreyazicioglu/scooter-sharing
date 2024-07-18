import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { AuthPayloadDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private jwtService: JwtService,
    ) {}

    async registerUser({ username, password }: RegisterDto) {
        const existingUser = await this.userRepository.findOne({
            where: { username },
        });

        if (existingUser) {
            throw new HttpException('Username already exists', 403);
        }

        // const hashedPassword = await bcrypt.hash(password, 10);
        const hashedPassword = password; // TODO

        const newUser = this.userRepository.create({
            username,
            password: hashedPassword,
            role: 'user',
        });

        return this.userRepository.save(newUser);
    }

    async validateUser({
        username,
        password,
    }: AuthPayloadDto): Promise<string | null> {
        const user = await this.userRepository.findOne({ where: { username } });

        if (!user) {
            throw new HttpException('Invalid username', 403);
        }

        if (user.password === password) {
            const { password, ...result } = user;

            return this.jwtService.sign(result);
        }

        throw new HttpException('Invalid password', 403);
    }
}
