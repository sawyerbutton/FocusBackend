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
const session_service_1 = require("./session.service");
const create_Session_dto_1 = require("./DTO/create-Session.dto");
let SessionController = class SessionController {
    constructor(sessionService) {
        this.sessionService = sessionService;
    }
    getAllSession() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.sessionService.getAllSession();
            return msg;
        });
    }
    getAllSessionByUserId(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.sessionService.getSessionByUserId(params.id);
            return msg;
        });
    }
    getSessionById(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.sessionService.getSessionById(params.id);
            return msg;
        });
    }
    addSession(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.sessionService.addSession(session);
            return msg;
        });
    }
    updateSession(params, newSession) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.sessionService.updateSession(params.id, newSession);
            return msg;
        });
    }
    deleteSession(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.sessionService.deleteSession(params.id);
            return msg;
        });
    }
    getAllAnswerAndRelatedQuestionnaireBySession(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.sessionService.getQuestionAndAnswerBySesionId(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getAllSession", null);
__decorate([
    common_1.Get('/user/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getAllSessionByUserId", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getSessionById", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "addSession", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_Session_dto_1.CreateSessionDto]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "updateSession", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "deleteSession", null);
__decorate([
    common_1.Get('/QA/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SessionController.prototype, "getAllAnswerAndRelatedQuestionnaireBySession", null);
SessionController = __decorate([
    common_1.Controller('session'),
    __metadata("design:paramtypes", [session_service_1.SessionService])
], SessionController);
exports.SessionController = SessionController;
//# sourceMappingURL=session.controller.js.map