import { CarDTO } from '../../../dto/cars/carsDto'

export interface ICarRepository {
  getAllCars: (category?: string, name?: string, page?: number, pageSize?: number) => Promise<CarDTO[]>
  getCarById: (carId: string) => Promise<CarDTO | undefined>
  createCar: (carData: Partial<CarDTO>) => Promise<CarDTO>
  updateCar: (carId: string, carData: Partial<CarDTO>) => Promise<CarDTO>
  deleteCarById: (carId: string) => Promise<number>
  getTotalCount: (category?: string, name?: string) => Promise<number>
}
