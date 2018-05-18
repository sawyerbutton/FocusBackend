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
const create_CAdmin_dto_1 = require("./DTO/create-CAdmin.dto");
const communityAdmin_service_1 = require("./communityAdmin.service");
let CommunityAdminController = class CommunityAdminController {
    constructor(communityAdminService) {
        this.communityAdminService = communityAdminService;
    }
    getAllCommunityAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityAdminService.getAllCommunityAdmin();
            return msg;
        });
    }
    getCommunityAdmin(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityAdminService.getCommunityAdmin(params.id);
            return msg;
        });
    }
    getCommunityAdminByState(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityAdminService.getCommunityAdminByState(params.id);
            return msg;
        });
    }
    addCommunityAdmin(communityAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityAdminService.addCommunityAdmin(communityAdmin);
            return msg;
        });
    }
    updateCommunityAdmin(params, newCommunityAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityAdminService.updateCommunityAdmin(params.id, newCommunityAdmin);
            return msg;
        });
    }
    deleteCommunityAdmin(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityAdminService.deleteCommunityAdmin(params.id);
            return msg;
        });
    }
    getCommunityRelatedInfo(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityAdminService.getCommunityRelatedInfo(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunityAdminController.prototype, "getAllCommunityAdmin", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityAdminController.prototype, "getCommunityAdmin", null);
__decorate([
    common_1.Get('/state/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityAdminController.prototype, "getCommunityAdminByState", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_CAdmin_dto_1.CreateCAdminDto]),
    __metadata("design:returntype", Promise)
], CommunityAdminController.prototype, "addCommunityAdmin", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_CAdmin_dto_1.CreateCAdminDto]),
    __metadata("design:returntype", Promise)
], CommunityAdminController.prototype, "updateCommunityAdmin", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityAdminController.prototype, "deleteCommunityAdmin", null);
__decorate([
    common_1.Get('communityRelatedInfo/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityAdminController.prototype, "getCommunityRelatedInfo", null);
CommunityAdminController = __decorate([
    common_1.Controller('communityAdmin'),
    __metadata("design:paramtypes", [communityAdmin_service_1.CommunityAdminService])
], CommunityAdminController);
exports.CommunityAdminController = CommunityAdminController;
//# sourceMappingURL=communityAdmin.controller.js.map