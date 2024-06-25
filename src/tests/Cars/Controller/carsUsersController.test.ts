import { Request, Response } from 'express'
import CarsUsersController from '../../../controllers/cars/carsUsersController'
import CarsUsersService from '../../../services/cars/carsUsers/carsUsersService'
import { wrapErrorResponse, wrapResponse } from '../../../utils/responseHandler'

jest.mock('../../../services/cars/carsUsers/carsUsersService')
jest.mock('../../../utils/responseHandler')

describe('CarsUsersController', () => {
  let req: Partial<Request>
  let res: Partial<Response>
  //   let next: jest.Mock;

  beforeEach(() => {
    req = {}
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }
    // next = jest.fn();
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('getAllCars', () => {
    it('should return a list of cars', async () => {
      const mockCars = [
        { id: 1, name: 'Car 1' },
        { id: 2, name: 'Car 2' }
      ]
      ;(CarsUsersService.prototype.getAllCars as jest.Mock).mockResolvedValue(mockCars)

      req.query = { category: 'SUV', name: 'Car', page: '1', pageSize: '10' }

      await CarsUsersController.getAllCars(req as Request, res as Response)

      expect(CarsUsersService.prototype.getAllCars).toHaveBeenCalledWith('SUV', 'Car', 1, 10)
      expect(wrapResponse).toHaveBeenCalledWith(res, 200, 'Cars fetched successfully', mockCars)
    })

    it('should handle errors', async () => {
      ;(CarsUsersService.prototype.getAllCars as jest.Mock).mockRejectedValue(new Error('Test Error'))

      req.query = { category: 'SUV', name: 'Car', page: '1', pageSize: '10' }

      await CarsUsersController.getAllCars(req as Request, res as Response)

      expect(wrapErrorResponse).toHaveBeenCalledWith(res, 500, 'Internal Server Error')
    })
  })

  describe('getCarById', () => {
    it('should return a car by ID', async () => {
      const mockCar = { id: 1, name: 'Car 1' }
      ;(CarsUsersService.prototype.getCarById as jest.Mock).mockResolvedValue(mockCar)

      req.params = { id: '1' }

      await CarsUsersController.getCarById(req as Request, res as Response)

      expect(CarsUsersService.prototype.getCarById).toHaveBeenCalledWith('1')
      expect(wrapResponse).toHaveBeenCalledWith(res, 200, 'Car fetched successfully', mockCar)
    })

    it('should return 404 if car not found', async () => {
      ;(CarsUsersService.prototype.getCarById as jest.Mock).mockResolvedValue(null)

      req.params = { id: '1' }

      await CarsUsersController.getCarById(req as Request, res as Response)

      expect(CarsUsersService.prototype.getCarById).toHaveBeenCalledWith('1')
      expect(wrapErrorResponse).toHaveBeenCalledWith(res, 404, 'Car not found')
    })

    it('should handle errors', async () => {
      ;(CarsUsersService.prototype.getCarById as jest.Mock).mockRejectedValue(new Error('Test Error'))

      req.params = { id: '1' }

      await CarsUsersController.getCarById(req as Request, res as Response)

      expect(wrapErrorResponse).toHaveBeenCalledWith(res, 500, 'Internal Server Error')
    })
  })
})
