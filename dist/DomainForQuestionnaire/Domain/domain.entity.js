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
const subDomain_entity_1 = require("../SubDomain/subDomain.entity");
const questionnaire_entity_1 = require("../../Questionnaire/questionnaire.entity");
let DomainEntity = class DomainEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], DomainEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], DomainEntity.prototype, "domain", void 0);
__decorate([
    typeorm_1.OneToMany(type => subDomain_entity_1.SubDomainEntity, subDomain => subDomain.domain),
    __metadata("design:type", Array)
], DomainEntity.prototype, "subdomain", void 0);
__decorate([
    typeorm_1.OneToMany(type => questionnaire_entity_1.QuestionnaireEntity, questionnaire => questionnaire.domain),
    __metadata("design:type", Array)
], DomainEntity.prototype, "questionnaire", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], DomainEntity.prototype, "maxScore", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], DomainEntity.prototype, "minScore", void 0);
DomainEntity = __decorate([
    typeorm_1.Entity()
], DomainEntity);
exports.DomainEntity = DomainEntity;
//# sourceMappingURL=domain.entity.js.map