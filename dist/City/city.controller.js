"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const create_City_dto_1 = require("./DTO/create-City.dto");
const city_service_1 = require("./city.service");
let CityController = class CityController {
    constructor(cityService) {
        this.cityService = cityService;
    }
    getAllCity() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.cityService.getAllCity();
            return msg;
        });
    }
    getCity(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.cityService.getCity(params.id);
            return msg;
        });
    }
    addCity(city) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.cityService.addCity(city);
            return msg;
        });
    }
    updateCity(params, newCity) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.cityService.updateCity(params.id, newCity);
            return msg;
        });
    }
    deleteCity(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.cityService.deleteCity(params.id);
            return msg;
        });
    }
    getCityByCounty(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.cityService.getCityByCounty(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CityController.prototype, "getAllCity", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "getCity", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_City_dto_1.CreateCityDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "addCity", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_City_dto_1.CreateCityDto]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "updateCity", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "deleteCity", null);
__decorate([
    common_1.Get('/county/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CityController.prototype, "getCityByCounty", null);
CityController = __decorate([
    common_1.Controller('city'),
    __metadata("design:paramtypes", [city_service_1.CityService])
], CityController);
exports.CityController = CityController;
//# sourceMappingURL=city.controller.js.map