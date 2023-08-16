import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { v4 as uuid } from 'uuid';

import { Car } from './interfaces/car.interfaces';
import { CreateCarDto, UpdateCarDto } from './dtos/';

@Injectable()
export class CarsService {

    private cars: Array<Car>;
        // [
        //     {
        //         id: uuid(),
        //         brand: 'Honda',
        //         model: 'Civic',
        //     },
        // ];

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

    fillCarsWithSeedData(cars: Array<Car>) {
        this.cars = cars;
    }

}
