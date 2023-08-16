import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';

import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';

@Controller('cars')
export class CarsController {

    constructor(private readonly carsService: CarsService) {

    }

    @Get()
    getAllCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCardByID(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
        return this.carsService.findById(id);
    }

    @Post()
    createCar(@Body() createCarDto: CreateCarDto) {
        return this.carsService.createOne(createCarDto);
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto) {
        return this.carsService.updateOne(id, updateCarDto);
    }

    @Delete(':id')
    deleteCard(@Param('id', ParseUUIDPipe) id: string) {
        return this.carsService.deleteOne(id);
    }

}
