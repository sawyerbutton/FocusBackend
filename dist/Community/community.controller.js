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
const community_service_1 = require("./community.service");
const create_Community_dto_1 = require("./DTO/create-Community.dto");
let CommunityController = class CommunityController {
    constructor(communityService) {
        this.communityService = communityService;
    }
    getAllCommunity() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityService.getAllCommunity();
            return msg;
        });
    }
    getCommunity(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityService.getCommunity(params.id);
            return msg;
        });
    }
    addCommunity(community) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityService.addCommunity(community);
            return msg;
        });
    }
    updateCommunity(params, newCommunity) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityService.updateCommunity(params.id, newCommunity);
            return msg;
        });
    }
    deleteCommunity(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityService.deleteCommunity(params.id);
            return msg;
        });
    }
    getCommunityByCity(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityService.getCommunityByCity(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getAllCommunity", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getCommunity", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Community_dto_1.CreateCommunityDto]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "addCommunity", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_Community_dto_1.CreateCommunityDto]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "updateCommunity", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "deleteCommunity", null);
__decorate([
    common_1.Get('/city/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityController.prototype, "getCommunityByCity", null);
CommunityController = __decorate([
    common_1.Controller('community'),
    __metadata("design:paramtypes", [community_service_1.CommunityService])
], CommunityController);
exports.CommunityController = CommunityController;
//# sourceMappingURL=community.controller.js.map