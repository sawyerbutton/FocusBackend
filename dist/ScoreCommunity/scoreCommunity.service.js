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
const scoreCommunity_entity_1 = require("./scoreCommunity.entity");
const typeorm_1 = require("typeorm");
const communityMember_entity_1 = require("../CommunityMembers/communityMember.entity");
const session_entity_1 = require("../Session/session.entity");
const domain_entity_1 = require("../DomainForQuestionnaire/Domain/domain.entity");
let ScoreCommunityService = class ScoreCommunityService {
    constructor(scoreCommunityRepository) {
        this.scoreCommunityRepository = scoreCommunityRepository;
    }
    getAllCommunityScore() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.scoreCommunityRepository.find();
        });
    }
    getCommunityScoreByCommunityId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.scoreCommunityRepository.find({ where: { communityId: id } });
        });
    }
    addCommunityScoreById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedCommunityMembers = yield typeorm_1.getRepository(communityMember_entity_1.CommunityMemberEntity).createQueryBuilder("communityMember")
                .innerJoinAndSelect("communityMember.community", "community")
                .where("communityMember.community = :community", { community: id }).getMany();
            let communityScore = [];
            const selectedDomains = yield typeorm_1.getConnection().getRepository(domain_entity_1.DomainEntity).createQueryBuilder("domain").getMany();
            yield selectedDomains.forEach((domain) => {
                let temp = { domain: domain.domain, score: 0 };
                communityScore.push(temp);
            });
            yield selectedCommunityMembers.forEach((communityMember) => __awaiter(this, void 0, void 0, function* () {
                const selectedSession = yield typeorm_1.getConnection().getRepository(session_entity_1.SessionEntity).createQueryBuilder("session")
                    .where("userid = :id", { id: communityMember.id })
                    .orderBy("session.id", "DESC").limit(1).getOne();
                let result = [];
                yield selectedDomains.forEach((domainItem) => {
                    let answersGroupByDomain = selectedSession.answer.filter((answer) => answer.domain === domainItem.domain);
                    let domainScore = 0;
                    answersGroupByDomain.forEach((item) => {
                        domainScore += item.answer.point * item.weight;
                    });
                    let domainMax = domainItem.maxScore;
                    let domainMin = domainItem.minScore;
                    domainScore = parseFloat(((domainScore - domainMin) / (domainMax - domainMin)).toFixed(2));
                    domainScore = domainScore < 0 ? 0 : domainScore;
                    result.push({ domain: domainItem.domain, score: domainScore });
                });
                let overallScore = 0;
                yield result.forEach((item) => {
                    overallScore += item.score;
                });
                yield result.push({ domain: 'WellnessScore', score: overallScore });
                yield function () {
                    for (let i = 0; i < communityScore.length; i++) {
                        communityScore[i]['score'] += result[i]['score'];
                    }
                };
            }));
            yield typeorm_1.getConnection()
                .createQueryBuilder()
                .insert()
                .into(scoreCommunity_entity_1.ScoreCommunityEntity).values({
                communityId: id,
                createDate: '',
                score: communityScore
            }).execute();
            return true;
        });
    }
};
ScoreCommunityService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('ScoreCommunityRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ScoreCommunityService);
exports.ScoreCommunityService = ScoreCommunityService;
//# sourceMappingURL=scoreCommunity.service.js.map