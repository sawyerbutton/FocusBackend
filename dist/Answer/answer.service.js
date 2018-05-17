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
const typeorm_1 = require("typeorm");
const answer_entity_1 = require("./answer.entity");
const session_entity_1 = require("../Session/session.entity");
const domain_entity_1 = require("../DomainForQuestionnaire/Domain/domain.entity");
let AnswerService = class AnswerService {
    constructor(answerRepository) {
        this.answerRepository = answerRepository;
    }
    getAllAnswer() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.answerRepository.find();
        });
    }
    getAnswerById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.answerRepository.findOneById(id);
        });
    }
    getAnswersBySessionId(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedSession = yield typeorm_1.getConnection().getRepository(session_entity_1.SessionEntity)
                .createQueryBuilder("session").leftJoinAndSelect("session.answer", "answer")
                .where("session.id = :id", { id: sessionId })
                .getOne();
            return yield selectedSession.answer;
        });
    }
    addAnswer(sessionId, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let answer of answers) {
                const selectedAnswer = yield this.answerRepository.save(answer);
                yield typeorm_1.getConnection().createQueryBuilder().relation(answer_entity_1.AnswerEntity, "session")
                    .of(selectedAnswer.id).set(sessionId);
            }
        });
    }
    updateAnswer(sessionId, newAnswers) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let answer of newAnswers) {
                const selectedAnswer = yield this.answerRepository.save(answer);
                yield typeorm_1.getConnection().createQueryBuilder().relation(answer_entity_1.AnswerEntity, "session")
                    .of(selectedAnswer.id).set(sessionId);
            }
        });
    }
    deleteAnswer(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedSession = yield typeorm_1.getConnection().getRepository(session_entity_1.SessionEntity)
                .createQueryBuilder("session").leftJoinAndSelect("session.answer", "answer")
                .where("session.id = :id", { id: sessionId })
                .getOne();
            for (let answer of yield selectedSession.answer) {
                yield typeorm_1.getConnection().createQueryBuilder().relation(answer_entity_1.AnswerEntity, "session")
                    .of(answer.id).set(null);
            }
            return 'delete success';
        });
    }
    getAnswerByDomainAndSession(array) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessionId = array[0];
            const domainId = array[1];
            const selectedDomain = yield typeorm_1.getConnection().getRepository(domain_entity_1.DomainEntity)
                .createQueryBuilder("domain").leftJoinAndSelect("domain.subdomain", "subdomain")
                .where("domain.id = :id", { id: domainId })
                .getOne();
            const selectedAnswer = yield typeorm_1.getConnection().getRepository(answer_entity_1.AnswerEntity).createQueryBuilder("answer")
                .leftJoinAndSelect("answer.session", "session")
                .where("session.id = :id", { id: sessionId })
                .andWhere("answer.domain = :domain", { domain: selectedDomain.domain })
                .getMany();
            return yield selectedAnswer;
        });
    }
};
AnswerService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('AnswerRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AnswerService);
exports.AnswerService = AnswerService;
//# sourceMappingURL=answer.service.js.map