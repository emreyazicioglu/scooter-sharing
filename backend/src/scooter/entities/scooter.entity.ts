import { Entity, Column, PrimaryGeneratedColumn, Double } from 'typeorm';

@Entity({ name: 'scooters' })
export class Scooter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('double precision')
    latitude: number;

    @Column('double precision')
    longitude: number;

    @Column({ unique: true })
    unique_name: string;

    @Column()
    battery_status: number;

    @Column({ default: false })
    isRiding: boolean;

    @Column({ nullable: true })
    rideStartTime: Date;
}
