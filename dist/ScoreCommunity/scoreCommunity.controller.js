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
const scoreCommunity_service_1 = require("./scoreCommunity.service");
let ScoreCommunityController = class ScoreCommunityController {
    constructor(scoreCommunityServic) {
        this.scoreCommunityServic = scoreCommunityServic;
    }
    getAllCommunityScore() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.scoreCommunityServic.getAllCommunityScore();
            return msg;
        });
    }
    getCommunityScoreByCommunityId(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.scoreCommunityServic.getCommunityScoreByCommunityId(params.id);
            return msg;
        });
    }
    addCommunityScore(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.scoreCommunityServic.addCommunityScoreById(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScoreCommunityController.prototype, "getAllCommunityScore", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScoreCommunityController.prototype, "getCommunityScoreByCommunityId", null);
__decorate([
    common_1.Get('addScore/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScoreCommunityController.prototype, "addCommunityScore", null);
ScoreCommunityController = __decorate([
    common_1.Controller('communityScore'),
    __metadata("design:paramtypes", [scoreCommunity_service_1.ScoreCommunityService])
], ScoreCommunityController);
exports.ScoreCommunityController = ScoreCommunityController;
//# sourceMappingURL=scoreCommunity.controller.js.map