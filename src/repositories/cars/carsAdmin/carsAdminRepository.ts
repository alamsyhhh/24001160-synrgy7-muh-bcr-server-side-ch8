import { CarsModel } from '../../../db/models/carsModel'
import { CarDTO } from '../../../dto/cars/carsDto'
import { ICarRepository } from './carsAdminRepositoryInterface'

class CarRepository implements ICarRepository {
  private mapToCarDTO(car: any): CarDTO {
    return {
      id: car.id,
      name: car.name,
      category: car.category,
      price: car.price,
      image: car.image,
      onPublish: car.onPublish,
      startRent: car.startRent,
      finishRent: car.finishRent,
      createdBy: car.createdBy,
      updatedBy: car.updatedBy,
      deletedBy: car.deletedBy,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt
    }
  }

  async getAllCars(category?: string, name?: string, page?: number, pageSize?: number): Promise<CarDTO[]> {
    const query = CarsModel.query().orderBy('createdAt', 'desc')

    if (category) {
      const categoryLowerCase = category.toLowerCase()
      query.whereRaw('LOWER(category) = ?', [categoryLowerCase])
    }

    if (name) {
      const nameLowerCase = name.toLowerCase()
      query.whereRaw('LOWER(name) LIKE ?', [`%${nameLowerCase}%`])
    }

    if (pageSize && pageSize !== -1) {
      const offset = (page ? page - 1 : 0) * pageSize
      query.offset(offset).limit(pageSize)
    }

    const cars = await query
    return cars.map(this.mapToCarDTO)
  }

  async getCarById(carId: string): Promise<CarDTO | undefined> {
    const car = await CarsModel.query().findById(carId)
    return car != null ? this.mapToCarDTO(car) : undefined
  }

  async createCar(carData: Partial<CarDTO>): Promise<CarDTO> {
    const newCar = await CarsModel.query().insert(carData as Partial<CarsModel>)
    return this.mapToCarDTO(newCar)
  }

  async updateCar(carId: string, carData: Partial<CarDTO>): Promise<CarDTO> {
    const updatedCar = await CarsModel.query().patchAndFetchById(carId, carData as Partial<CarsModel>)
    return this.mapToCarDTO(updatedCar)
  }

  async deleteCarById(carId: string): Promise<number> {
    return await CarsModel.query().deleteById(carId)
  }

  async getTotalCount(category?: string, name?: string): Promise<number> {
    const query = CarsModel.query()

    if (category) {
      const categoryLowerCase = category.toLowerCase()
      query.whereRaw('LOWER(category) = ?', [categoryLowerCase])
    }

    if (name) {
      const nameLowerCase = name.toLowerCase()
      query.whereRaw('LOWER(name) LIKE ?', [`%${nameLowerCase}%`])
    }

    return await query.resultSize()
  }
}

export default new CarRepository()
