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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const common_1 = require("@nestjs/common");
const systemAdmin_service_1 = require("../../SystemAdmin/systemAdmin.service");
const stateAdmin_service_1 = require("../../StateAdmin/stateAdmin.service");
const communityMember_service_1 = require("../../CommunityMembers/communityMember.service");
const communityAdmin_service_1 = require("../../CommunityAdmin/communityAdmin.service");
const bhco_service_1 = require("../../Bhco/bhco.service");
let AuthService = class AuthService {
    constructor(systemAdminService, stateAdminService, communityMemberService, communityAdminService, bhcoService) {
        this.systemAdminService = systemAdminService;
        this.stateAdminService = stateAdminService;
        this.communityMemberService = communityMemberService;
        this.communityAdminService = communityAdminService;
        this.bhcoService = bhcoService;
    }
    createToken(userInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresIn = 60 * 60;
            const secretOrKey = 'secret';
            const token = jwt.sign(userInfo, secretOrKey, { expiresIn });
            return {
                expires_in: expiresIn,
                token: token
            };
        });
    }
    validateLogin(logInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryCondition = { where: { username: logInfo.username } };
            let user;
            switch (logInfo.role) {
                case 'systemAdmin':
                    user = yield this.systemAdminService.getSystemAdminByUser(queryCondition);
                    break;
                case 'stateAdmin':
                    user = yield this.stateAdminService.getStateAmdinByUser(queryCondition);
                    break;
                case 'communityAdmin':
                    user = yield this.communityAdminService.getCommunityAdminByUser(queryCondition);
                    break;
                case 'communityMember':
                    user = yield this.communityMemberService.getCommunityMemberByUser(queryCondition);
                    break;
                case 'bhco':
                    user = yield this.bhcoService.getBhcoByUser(queryCondition);
                    break;
            }
            if (user) {
                return user.password === logInfo.password;
            }
            else {
                return false;
            }
        });
    }
    validate(signedUser, requestRoute) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryCondition = { where: { username: signedUser['username'] } };
            let user;
            switch (signedUser['role']) {
                case 'systemAdmin':
                    user = yield this.systemAdminService.getSystemAdminByUser(queryCondition);
                    break;
                case 'stateAdmin':
                    user = yield this.stateAdminService.getStateAmdinByUser(queryCondition);
                    break;
                case 'communityAdmin':
                    user = yield this.communityAdminService.getCommunityAdminByUser(queryCondition);
                    break;
                case 'communityMember':
                    user = yield this.communityMemberService.getCommunityMemberByUser(queryCondition);
                    break;
                case 'bhco':
                    user = yield this.bhcoService.getBhcoByUser(queryCondition);
                    break;
            }
            if (user) {
                return true;
            }
            else {
                return false;
            }
        });
    }
};
AuthService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [systemAdmin_service_1.SystemAdminService,
        stateAdmin_service_1.StateAdminService,
        communityMember_service_1.CommunityMemberService,
        communityAdmin_service_1.CommunityAdminService,
        bhco_service_1.BhcoService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map