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
const create_Demographic_dto_1 = require("./DTO/create-Demographic.dto");
const demographic_service_1 = require("./demographic.service");
let DemographicController = class DemographicController {
    constructor(demographicService) {
        this.demographicService = demographicService;
    }
    getAllDemographic() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.demographicService.getAllDemographic();
            return msg;
        });
    }
    getDemographic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.demographicService.getDemographic(params.id);
            return msg;
        });
    }
    addDemographic(demographic) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.demographicService.addDemographic(demographic);
            return msg;
        });
    }
    updateDemographic(params, newDemographic) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.demographicService.updateDemographic(params.id, newDemographic);
            return msg;
        });
    }
    deleteDemographic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.demographicService.deleteDemographic(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DemographicController.prototype, "getAllDemographic", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemographicController.prototype, "getDemographic", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Demographic_dto_1.CreateDemographicDto]),
    __metadata("design:returntype", Promise)
], DemographicController.prototype, "addDemographic", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_Demographic_dto_1.CreateDemographicDto]),
    __metadata("design:returntype", Promise)
], DemographicController.prototype, "updateDemographic", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DemographicController.prototype, "deleteDemographic", null);
DemographicController = __decorate([
    common_1.Controller('demographic'),
    __metadata("design:paramtypes", [demographic_service_1.DemographicService])
], DemographicController);
exports.DemographicController = DemographicController;
//# sourceMappingURL=demographic.controller.js.map