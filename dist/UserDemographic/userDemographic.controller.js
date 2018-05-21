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
const create_UserDemographic_dto_1 = require("./DTO/create-UserDemographic.dto");
const userDemographic_service_1 = require("./userDemographic.service");
let UserDemographicController = class UserDemographicController {
    constructor(userDemographicService) {
        this.userDemographicService = userDemographicService;
    }
    getAllUserDemographic() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.userDemographicService.getAllUserDemographic();
            return msg;
        });
    }
    getUserDemographic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.userDemographicService.getUserDemographic(params.id);
            return msg;
        });
    }
    addUserDemographic(demographic) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.userDemographicService.addUserDemographic(demographic);
            return msg;
        });
    }
    updateUserDemographic(params, newDemographic) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.userDemographicService.updateUserDemographic(params.id, newDemographic);
            return msg;
        });
    }
    deleteUserDemographic(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.userDemographicService.deleteUserDemographic(params.id);
            return msg;
        });
    }
    getUserDemographicByUserId(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.userDemographicService.getDemographicAnswerByUserId(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserDemographicController.prototype, "getAllUserDemographic", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserDemographicController.prototype, "getUserDemographic", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_UserDemographic_dto_1.CreateUserDemographicDto]),
    __metadata("design:returntype", Promise)
], UserDemographicController.prototype, "addUserDemographic", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_UserDemographic_dto_1.CreateUserDemographicDto]),
    __metadata("design:returntype", Promise)
], UserDemographicController.prototype, "updateUserDemographic", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserDemographicController.prototype, "deleteUserDemographic", null);
__decorate([
    common_1.Get('user/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserDemographicController.prototype, "getUserDemographicByUserId", null);
UserDemographicController = __decorate([
    common_1.Controller('userDemographic'),
    __metadata("design:paramtypes", [userDemographic_service_1.UserDemographicService])
], UserDemographicController);
exports.UserDemographicController = UserDemographicController;
//# sourceMappingURL=userDemographic.controller.js.map