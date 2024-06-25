"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const carsUsersController_1 = __importDefault(require("../../../controllers/cars/carsUsersController"));
const carsUsersService_1 = __importDefault(require("../../../services/cars/carsUsers/carsUsersService"));
const responseHandler_1 = require("../../../utils/responseHandler");
jest.mock('../../../services/cars/carsUsers/carsUsersService');
jest.mock('../../../utils/responseHandler');
describe('CarsUsersController', () => {
    let req;
    let res;
    //   let next: jest.Mock;
    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
        // next = jest.fn();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('getAllCars', () => {
        it('should return a list of cars', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCars = [
                { id: 1, name: 'Car 1' },
                { id: 2, name: 'Car 2' }
            ];
            carsUsersService_1.default.prototype.getAllCars.mockResolvedValue(mockCars);
            req.query = { category: 'SUV', name: 'Car', page: '1', pageSize: '10' };
            yield carsUsersController_1.default.getAllCars(req, res);
            expect(carsUsersService_1.default.prototype.getAllCars).toHaveBeenCalledWith('SUV', 'Car', 1, 10);
            expect(responseHandler_1.wrapResponse).toHaveBeenCalledWith(res, 200, 'Cars fetched successfully', mockCars);
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            ;
            carsUsersService_1.default.prototype.getAllCars.mockRejectedValue(new Error('Test Error'));
            req.query = { category: 'SUV', name: 'Car', page: '1', pageSize: '10' };
            yield carsUsersController_1.default.getAllCars(req, res);
            expect(responseHandler_1.wrapErrorResponse).toHaveBeenCalledWith(res, 500, 'Internal Server Error');
        }));
    });
    describe('getCarById', () => {
        it('should return a car by ID', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockCar = { id: 1, name: 'Car 1' };
            carsUsersService_1.default.prototype.getCarById.mockResolvedValue(mockCar);
            req.params = { id: '1' };
            yield carsUsersController_1.default.getCarById(req, res);
            expect(carsUsersService_1.default.prototype.getCarById).toHaveBeenCalledWith('1');
            expect(responseHandler_1.wrapResponse).toHaveBeenCalledWith(res, 200, 'Car fetched successfully', mockCar);
        }));
        it('should return 404 if car not found', () => __awaiter(void 0, void 0, void 0, function* () {
            ;
            carsUsersService_1.default.prototype.getCarById.mockResolvedValue(null);
            req.params = { id: '1' };
            yield carsUsersController_1.default.getCarById(req, res);
            expect(carsUsersService_1.default.prototype.getCarById).toHaveBeenCalledWith('1');
            expect(responseHandler_1.wrapErrorResponse).toHaveBeenCalledWith(res, 404, 'Car not found');
        }));
        it('should handle errors', () => __awaiter(void 0, void 0, void 0, function* () {
            ;
            carsUsersService_1.default.prototype.getCarById.mockRejectedValue(new Error('Test Error'));
            req.params = { id: '1' };
            yield carsUsersController_1.default.getCarById(req, res);
            expect(responseHandler_1.wrapErrorResponse).toHaveBeenCalledWith(res, 500, 'Internal Server Error');
        }));
    });
});
