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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const session_entity_1 = require("../Session/session.entity");
let AnswerEntity = class AnswerEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], AnswerEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], AnswerEntity.prototype, "questionid", void 0);
__decorate([
    typeorm_1.Column('jsonb'),
    __metadata("design:type", Object)
], AnswerEntity.prototype, "answer", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], AnswerEntity.prototype, "domain", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], AnswerEntity.prototype, "weight", void 0);
__decorate([
    typeorm_1.ManyToOne(type => session_entity_1.SessionEntity, session => session.answer),
    __metadata("design:type", session_entity_1.SessionEntity)
], AnswerEntity.prototype, "session", void 0);
AnswerEntity = __decorate([
    typeorm_1.Entity()
], AnswerEntity);
exports.AnswerEntity = AnswerEntity;
//# sourceMappingURL=answer.entity.js.map