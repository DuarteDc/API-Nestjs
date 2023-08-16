import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interfaces';
import { CreateCarDto, UpdateCarDto } from './dtos/';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: uuid(),
            brand: 'Mitsubishi',
            model: 'Eclipse',
        },
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Supra',
        }
    ];

    findAll() {
        return this.cars;
    }

    findById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id ${id} not found`);
        return car;
    }

    createOne(createCarDto: CreateCarDto) {
        const car: Car = { id: uuid(), ...createCarDto };
        this.cars.push(car);
        return car;
    }

    updateOne(id: string, updateCarDto: UpdateCarDto) {

        let carDB = this.findById(id);

        if (updateCarDto.id && updateCarDto.id !== id)
            throw new BadRequestException('Car id is not valid');

        this.cars = this.cars.map(car => car.id === id ? carDB = { ...carDB, ...updateCarDto, id } : car);

        return carDB;

    }

    deleteOne(id: string) {
        this.findById(id);
        this.cars = this.cars.filter(car => car.id !== id);
    }

}
