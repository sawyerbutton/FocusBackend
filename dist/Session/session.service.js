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
const session_entity_1 = require("./session.entity");
const answer_entity_1 = require("../Answer/answer.entity");
const questionnaire_entity_1 = require("../Questionnaire/questionnaire.entity");
let SessionService = class SessionService {
    constructor(sessionRepository, answerRepository) {
        this.sessionRepository = sessionRepository;
        this.answerRepository = answerRepository;
    }
    getAllSession() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sessionRepository.find();
        });
    }
    getSessionByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sessionRepository.find({ where: { userid: userId } });
        });
    }
    getSessionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sessionRepository.findOneById(id);
        });
    }
    addSession(session) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedSession = yield this.sessionRepository.save(session);
            for (let answer of yield session.answer) {
                const selectedAnswer = yield this.answerRepository.save(answer);
                yield typeorm_1.getConnection().createQueryBuilder().relation(answer_entity_1.AnswerEntity, "session")
                    .of(selectedAnswer.id).set(selectedSession.id);
            }
            return yield this.sessionRepository.findOneById(selectedSession.id);
        });
    }
    updateSession(sessionId, newSession) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedSession = yield this.sessionRepository.findOneById(sessionId);
            if (!selectedSession) {
                console.log('session does not exist');
            }
            yield this.sessionRepository.updateById(sessionId, newSession);
            const requiredSession = yield typeorm_1.getConnection().getRepository(session_entity_1.SessionEntity).createQueryBuilder("session")
                .leftJoinAndSelect("session.answer", "answer").where("session.id = :id", { id: sessionId })
                .getOne();
            for (let i = 0; i < (yield requiredSession.answer.length); i++) {
                yield this.answerRepository.updateById(requiredSession.answer[i].id, newSession.answer[i]);
            }
            return yield this.sessionRepository.findOneById(sessionId);
        });
    }
    deleteSession(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedSession = yield typeorm_1.getConnection().getRepository(session_entity_1.SessionEntity)
                .createQueryBuilder("session").leftJoinAndSelect("session.answer", "answer")
                .where("session.id = :id", { id: sessionId })
                .getOne();
            for (let answer of yield selectedSession.answer) {
                yield typeorm_1.getConnection().createQueryBuilder().relation(answer_entity_1.AnswerEntity, "session")
                    .of(answer.id).set(null);
            }
            yield this.sessionRepository.deleteById(sessionId);
            const deletedSession = yield this.sessionRepository.findOneById(sessionId);
            if (deletedSession) {
                return 'delete fail';
            }
            else {
                return 'delete success';
            }
        });
    }
    getQuestionAndAnswerBySessionId(sessionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedAnswer = yield typeorm_1.getConnection().getRepository(answer_entity_1.AnswerEntity).createQueryBuilder("answer")
                .leftJoinAndSelect("answer.session", "session")
                .where("session.id = :id", { id: sessionId })
                .getMany()
                .then((answers) => __awaiter(this, void 0, void 0, function* () {
                let result = [];
                yield answers.forEach((answer) => __awaiter(this, void 0, void 0, function* () {
                    const selectedQuestionnaire = yield typeorm_1.getConnection().getRepository(questionnaire_entity_1.QuestionnaireEntity).createQueryBuilder("questionnaire")
                        .leftJoinAndSelect("questionnaire.domain", "domain")
                        .leftJoinAndSelect("questionnaire.subdomain", "subdomain")
                        .where("questionnaire.id = :id", { id: answer.questionid })
                        .getOne();
                    answer["questionnaire"] = selectedQuestionnaire;
                    result.push(answer);
                }));
                return yield result;
            }));
            return selectedAnswer;
        });
    }
};
SessionService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('SessionRepository')),
    __param(1, common_1.Inject('AnswerRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], SessionService);
exports.SessionService = SessionService;
//# sourceMappingURL=session.service.js.map