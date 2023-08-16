import { v4 as uuid } from 'uuid';

import { Car } from 'src/cars/interfaces/car.interfaces';

export const CARS_SEED: Array<Car> = [
    {
        id: uuid(),
        brand: 'Toyota',
        model: 'Supra'
    },
    {
        id: uuid(),
        brand: 'Mitshubishi',
        model: 'Lancer'
    },
    {
        id: uuid(),
        brand: 'Honda',
        model: 'Civic'
    }
]