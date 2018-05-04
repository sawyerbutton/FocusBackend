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
const community_entity_1 = require("../Community/community.entity");
const city_entity_1 = require("../City/city.entity");
const county_entity_1 = require("../County/county.entity");
const state_entity_1 = require("../State/state.entity");
let CommunityAdminService = class CommunityAdminService {
    constructor(communityAdminRepository) {
        this.communityAdminRepository = communityAdminRepository;
    }
    getAllCommunityAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.communityAdminRepository.find();
        });
    }
    getCommunityAdminByUser(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.communityAdminRepository.findOne(options);
        });
    }
    getCommunityAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.communityAdminRepository.findOneById(id);
        });
    }
    getCommunityAdminByState(stateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedState = yield typeorm_1.getRepository(state_entity_1.StateEntity).findOne({ id: stateId });
            return yield this.communityAdminRepository.find({ state: selectedState.state });
        });
    }
    addCommunityAdmin(communityAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.communityAdminRepository.save(communityAdmin);
        });
    }
    updateCommunityAdmin(id, newCommunityAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const communityAdmin = yield this.communityAdminRepository.findOneById(id);
            if (!communityAdmin) {
                console.log('community admin does not exist');
            }
            yield this.communityAdminRepository.updateById(id, newCommunityAdmin);
            return this.communityAdminRepository.findOneById(id);
        });
    }
    deleteCommunityAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.communityAdminRepository.deleteById(id);
            const communityAdmin = yield this.communityAdminRepository.findOneById(id);
            if (!communityAdmin) {
                return 'delete success';
            }
            else {
                return 'delete fail';
            }
        });
    }
    getCommunityRelatedInfo(communityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedCommunity = yield typeorm_1.getRepository(community_entity_1.CommunityEntity)
                .createQueryBuilder("community").leftJoinAndSelect("community.city", "city")
                .where("community.id = :id", { id: communityId }).getOne();
            const community = yield selectedCommunity.community;
            const selectedCity = yield typeorm_1.getRepository(city_entity_1.CityEntity)
                .createQueryBuilder("city").leftJoinAndSelect("city.county", "county")
                .where("city.id = :id", { id: selectedCommunity.city.id }).getOne();
            const city = yield selectedCity.city;
            const selectedCounty = yield typeorm_1.getRepository(county_entity_1.CountyEntity)
                .createQueryBuilder("county").leftJoinAndSelect("county.state", "state")
                .where("county.id = :id", { id: selectedCity.county.id }).getOne();
            const county = yield selectedCounty.county;
            const selectedState = yield typeorm_1.getRepository(state_entity_1.StateEntity)
                .createQueryBuilder("state").where("state.id = :id", { id: selectedCounty.state.id }).getOne();
            const state = yield selectedState.state;
            return yield { community, city, county, state };
        });
    }
};
CommunityAdminService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('CommunityAdminRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CommunityAdminService);
exports.CommunityAdminService = CommunityAdminService;
//# sourceMappingURL=communityAdmin.service.js.map