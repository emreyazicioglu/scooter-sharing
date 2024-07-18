import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { ScooterService } from './scooter.service';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { UpdateScooterDto } from './dto/update-scooter.dto';

@Controller('scooters')
@UseGuards(JwtGuard, RolesGuard)
export class ScooterController {
    constructor(private readonly scooterService: ScooterService) {}

    @Post()
    @Roles('operator')
    async create(@Body() createScooterDto: CreateScooterDto) {
        return this.scooterService.create(createScooterDto);
    }

    @Get()
    @Roles('operator', 'user')
    async findAll(@Req() req: Request) {
        const user = req.user;
        console.log(user);
        if (user.role === 'operator') {
            return this.scooterService.findAll();
        }
        return this.scooterService.findAvailableScooters();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.scooterService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateScooterDto: UpdateScooterDto,
    ) {
        return this.scooterService.update(+id, updateScooterDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.scooterService.remove(+id);
    }

    @Post(':id/start')
    async startRide(@Param('id') id: string) {
        return this.scooterService.startRide(+id);
    }

    @Post(':id/stop')
    async stopRide(@Param('id') id: string) {
        return this.scooterService.stopRide(+id);
    }
}
