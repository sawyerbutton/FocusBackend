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
const create_CMember_dto_1 = require("./DTO/create-CMember.dto");
const communityMember_service_1 = require("./communityMember.service");
let CommunityMemberController = class CommunityMemberController {
    constructor(communityMemberService) {
        this.communityMemberService = communityMemberService;
    }
    getAllCommunityMember() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.getAllCommunityMember();
            return msg;
        });
    }
    ;
    getAllCommunityMemberById(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.getAllCommunityMemberByBhco(params.id);
            return msg;
        });
    }
    addCommunityMember(cMember) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.addCommunityMember(cMember);
            return msg;
        });
    }
    ;
    getCommunityMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.getCommunityMember(params.id);
            return msg;
        });
    }
    ;
    upadateCommunityMember(params, newCommunityMember) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.updateCommunityMember(params.id, newCommunityMember);
            return msg;
        });
    }
    deleteCommunityMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.deleteCommunityMember(params.id);
            return msg;
        });
    }
    getUnAssignedCommunityMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.getUnAssignedCommunityMember(params.id);
            return msg;
        });
    }
    getAssignedCommunityMember(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.getAssignedCommunityMember(params.id);
            return msg;
        });
    }
    assignCommunityMember(params, communityMemberIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.assignCommunityMember(params.id, communityMemberIDs);
            return msg;
        });
    }
    unAssignCommunityMember(communityMemberIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.unAssignCommunityMember(communityMemberIDs);
            return msg;
        });
    }
    getCommunityMemberByState(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.getAllCommunityMemberByState(params.id);
            return msg;
        });
    }
    getCommunityMemberByCommunity(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.communityMemberService.getAllCommunityMemberByCommunity(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get('communityMember'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "getAllCommunityMember", null);
__decorate([
    common_1.Get('communityMember/bhco/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "getAllCommunityMemberById", null);
__decorate([
    common_1.Post('communityMember'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_CMember_dto_1.CreateCMemberDto]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "addCommunityMember", null);
__decorate([
    common_1.Get('communityMember/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "getCommunityMember", null);
__decorate([
    common_1.Patch('communityMember/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_CMember_dto_1.CreateCMemberDto]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "upadateCommunityMember", null);
__decorate([
    common_1.Delete('communityMember/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "deleteCommunityMember", null);
__decorate([
    common_1.Get('unAssignedCommunityMember/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "getUnAssignedCommunityMember", null);
__decorate([
    common_1.Get('AssignedCommunityMember/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "getAssignedCommunityMember", null);
__decorate([
    common_1.Patch('assign/CommunityMember/:id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "assignCommunityMember", null);
__decorate([
    common_1.Patch('unAssign/CommunityMember/'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "unAssignCommunityMember", null);
__decorate([
    common_1.Get('communityMemberByState/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "getCommunityMemberByState", null);
__decorate([
    common_1.Get('communityMemberByCommunity/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CommunityMemberController.prototype, "getCommunityMemberByCommunity", null);
CommunityMemberController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [communityMember_service_1.CommunityMemberService])
], CommunityMemberController);
exports.CommunityMemberController = CommunityMemberController;
//# sourceMappingURL=communityMember.controller.js.map