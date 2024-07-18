import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateScooterDto } from './dto/create-scooter.dto';
import { MoreThan, Repository } from 'typeorm';
import { Scooter } from './entities/scooter.entity';
import { UpdateScooterDto } from './dto/update-scooter.dto';

@Injectable()
export class ScooterService {
    constructor(
        @InjectRepository(Scooter)
        private readonly scooterRepository: Repository<Scooter>,
    ) {}

    async create(createScooterDto: CreateScooterDto) {
        const scooter = this.scooterRepository.create(createScooterDto);
        return await this.scooterRepository.save(scooter);
    }

    async update(id: number, updateScooterDto: UpdateScooterDto) {
        const scooter = await this.scooterRepository.findOne({ where: { id } });
    }

    async findAll(): Promise<Scooter[]> {
        return await this.scooterRepository.find();
    }

    async findAvailableScooters(): Promise<Scooter[]> {
        return await this.scooterRepository.find({
            where: { battery_status: MoreThan(20) },
        });
    }

    async findOne(id: number): Promise<Scooter> {
        const scooter = await this.scooterRepository.findOne({ where: { id } });
        if (!scooter) {
            throw new NotFoundException();
        }
        return scooter;
    }

    async remove(id: number) {
        const scooter = await this.scooterRepository.findOne({ where: { id } });
        if (!scooter) {
            throw new NotFoundException();
        }
        return await this.scooterRepository.remove(scooter);
    }

    async startRide(id: number): Promise<Scooter> {
        const scooter = await this.scooterRepository.findOne({ where: { id } });
        if (!scooter) {
            throw new NotFoundException('Scooter not found');
        }
        if (scooter.isRiding) {
            throw new ConflictException('Scooter is already in use.');
        }
        scooter.isRiding = true;
        scooter.rideStartTime = new Date();
        return this.scooterRepository.save(scooter);
    }

    async stopRide(id: number): Promise<Scooter> {
        const scooter = await this.scooterRepository.findOne({ where: { id } });
        if (!scooter) {
            throw new NotFoundException('Scooter not found');
        }
        if (!scooter.isRiding) {
            throw new BadRequestException('Scooter is not currently in use');
        }
        const currentTime = new Date();
        const rideDuration =
            (currentTime.getTime() - scooter.rideStartTime.getTime()) / 1000;
        scooter.battery_status -= Math.floor(rideDuration);
        scooter.battery_status = Math.max(scooter.battery_status, 0);
        scooter.isRiding = false;
        scooter.rideStartTime = null;
        return this.scooterRepository.save(scooter);
    }
}
