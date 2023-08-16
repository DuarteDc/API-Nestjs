import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {

    private cars = [
        {
            id: 1,
            brand: 'Honda',
            model: 'Civic',
        },
        {
            id: 2,
            brand: 'Mitsubishi',
            model: 'Eclipse',
        },
        {
            id: 3,
            brand: 'Toyota',
            model: 'Supra',
        }
    ];

    findAll() {
        return this.cars;
    }

    findById(id: number) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id ${id} not found`);
        return car;
    }

}
