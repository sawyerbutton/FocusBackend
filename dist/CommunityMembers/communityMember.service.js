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
const communityMember_entity_1 = require("./communityMember.entity");
const typeorm_1 = require("typeorm");
const state_entity_1 = require("../State/state.entity");
const bhco_entity_1 = require("../Bhco/bhco.entity");
let CommunityMemberService = class CommunityMemberService {
    constructor(communityMemberRepository) {
        this.communityMemberRepository = communityMemberRepository;
    }
    getAllCommunityMember() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getRepository(communityMember_entity_1.CommunityMemberEntity).createQueryBuilder("communityMember")
                .innerJoinAndSelect("communityMember.community", "community")
                .getMany();
        });
    }
    getCommunityMemberByUser(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.communityMemberRepository.findOne(options);
        });
    }
    getAllCommunityMemberByState(stateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedState = yield typeorm_1.getRepository(state_entity_1.StateEntity).findOne({ id: stateId });
            const communityMembers = yield typeorm_1.getRepository(communityMember_entity_1.CommunityMemberEntity).createQueryBuilder("communityMember")
                .innerJoinAndSelect("communityMember.community", "community")
                .where("communityMember.state = :state", { state: selectedState.state })
                .getMany();
            return communityMembers;
        });
    }
    getAllCommunityMemberByCommunity(communityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const communityMembers = yield typeorm_1.getRepository(communityMember_entity_1.CommunityMemberEntity).createQueryBuilder("communityMember")
                .innerJoinAndSelect("communityMember.community", "community")
                .where("communityMember.community = :community", { community: communityId }).getMany();
            return communityMembers;
        });
    }
    getAllCommunityMemberByBhco(bhcoId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedBhco = yield typeorm_1.getRepository(bhco_entity_1.BhcoEntity).createQueryBuilder("bhco")
                .leftJoinAndSelect("bhco.communityMember", "communityMember")
                .where("bhco.id = :id", { id: bhcoId })
                .getOne();
            return yield selectedBhco.communityMember;
        });
    }
    getUnAssignedCommunityMember(communityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const unAssignedCommunityMember = yield typeorm_1.getRepository(communityMember_entity_1.CommunityMemberEntity)
                .createQueryBuilder("communityMember")
                .where("communityMember.assigned = :assigned AND communityMember.community = :community", { assigned: false, community: communityId })
                .getMany();
            return unAssignedCommunityMember;
        });
    }
    getAssignedCommunityMember(communityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const AssignedCommunityMember = yield typeorm_1.getRepository(communityMember_entity_1.CommunityMemberEntity)
                .createQueryBuilder("communityMember")
                .innerJoinAndSelect("communityMember.bhco", "bhco")
                .where("communityMember.assigned = :assigned AND communityMember.community = :community", { assigned: true, community: communityId })
                .getMany();
            return AssignedCommunityMember;
        });
    }
    getCommunityMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.communityMemberRepository.findOneById(id);
        });
    }
    addCommunityMember(communityMember) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedCommunityMember = yield this.communityMemberRepository.save(communityMember);
            yield typeorm_1.getConnection().createQueryBuilder().relation(communityMember_entity_1.CommunityMemberEntity, "community").of(selectedCommunityMember.id).set(communityMember.community);
        });
    }
    assignCommunityMember(bhcoID, communityMemberIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let communityMemberID of communityMemberIDs) {
                yield typeorm_1.getConnection().createQueryBuilder().relation(communityMember_entity_1.CommunityMemberEntity, "bhco").of(communityMemberID).set(bhcoID);
                yield typeorm_1.getConnection().createQueryBuilder().update(communityMember_entity_1.CommunityMemberEntity).set({ assigned: true }).where("id = :id", { id: communityMemberID }).execute();
            }
        });
    }
    unAssignCommunityMember(communityMemberIDs) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let communityMemberID of communityMemberIDs) {
                yield typeorm_1.getConnection().createQueryBuilder().relation(communityMember_entity_1.CommunityMemberEntity, "bhco").of(communityMemberID).set(null);
                yield typeorm_1.getConnection().createQueryBuilder().update(communityMember_entity_1.CommunityMemberEntity).set({ assigned: false }).where("id = :id", { id: communityMemberID }).execute();
            }
        });
    }
    updateCommunityMember(id, newCommunityMember) {
        return __awaiter(this, void 0, void 0, function* () {
            const communityMember = yield this.communityMemberRepository.findOneById(id);
            if (!communityMember.id) {
                console.log("community member does not exist");
            }
            yield this.communityMemberRepository.updateById(id, newCommunityMember);
            return yield this.communityMemberRepository.findOneById(id);
        });
    }
    deleteCommunityMember(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.communityMemberRepository.deleteById(id);
            const communityMember = yield this.communityMemberRepository.findOneById(id);
            if (!communityMember) {
                return 'delete success';
            }
            else {
                return 'delete fail';
            }
        });
    }
};
CommunityMemberService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('CommunityMemberRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CommunityMemberService);
exports.CommunityMemberService = CommunityMemberService;
//# sourceMappingURL=communityMember.service.js.map