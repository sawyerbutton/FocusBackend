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
const create_County_dto_1 = require("./DTO/create-County.dto");
const county_service_1 = require("./county.service");
let CountyController = class CountyController {
    constructor(countyService) {
        this.countyService = countyService;
    }
    getAllCounty() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.countyService.getAllCounty();
            return msg;
        });
    }
    getCounty(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.countyService.getCounty(params.id);
            return msg;
        });
    }
    addCounty(county) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.countyService.addCounty(county);
            return msg;
        });
    }
    updateCounty(params, newCounty) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.countyService.updateCounty(params.id, newCounty);
            return msg;
        });
    }
    deleteCounty(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.countyService.deleteCounty(params.id);
            return msg;
        });
    }
    getCountyByState(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.countyService.getCountyByState(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CountyController.prototype, "getAllCounty", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CountyController.prototype, "getCounty", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_County_dto_1.CreateCountyDto]),
    __metadata("design:returntype", Promise)
], CountyController.prototype, "addCounty", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_County_dto_1.CreateCountyDto]),
    __metadata("design:returntype", Promise)
], CountyController.prototype, "updateCounty", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CountyController.prototype, "deleteCounty", null);
__decorate([
    common_1.Get('/state/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CountyController.prototype, "getCountyByState", null);
CountyController = __decorate([
    common_1.Controller('county'),
    __metadata("design:paramtypes", [county_service_1.CountyService])
], CountyController);
exports.CountyController = CountyController;
//# sourceMappingURL=county.controller.js.map