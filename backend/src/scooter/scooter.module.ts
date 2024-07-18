import { Module } from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { ScooterController } from './scooter.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Scooter } from './entities/scooter.entity';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        AuthModule,
        PassportModule,
        TypeOrmModule.forFeature([Scooter]),
        JwtModule.register({
            secret: 'abc123',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [ScooterController],
    providers: [ScooterService, JwtService, JwtStrategy, RolesGuard],
})
export class ScooterModule {}
