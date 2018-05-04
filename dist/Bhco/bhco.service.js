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
const state_entity_1 = require("../State/state.entity");
const community_entity_1 = require("../Community/community.entity");
let BhcoService = class BhcoService {
    constructor(bhcoRepository) {
        this.bhcoRepository = bhcoRepository;
    }
    getAllBhco() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bhcoRepository.find();
        });
    }
    getBhcoByUser(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bhcoRepository.findOne(options);
        });
    }
    getAllBhcoByCommunity(communityId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedCommunity = yield typeorm_1.getRepository(community_entity_1.CommunityEntity).findOne({ id: communityId });
            return yield this.bhcoRepository.find({ community: selectedCommunity.community });
        });
    }
    getAllBhcoByState(stateId) {
        return __awaiter(this, void 0, void 0, function* () {
            const selectedState = yield typeorm_1.getRepository(state_entity_1.StateEntity).findOne({ id: stateId });
            return yield this.bhcoRepository.find({ state: selectedState.state });
        });
    }
    getBhco(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bhcoRepository.findOneById(id);
        });
    }
    addBhco(bhco) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.bhcoRepository.save(bhco);
        });
    }
    updateBhco(id, newBhco) {
        return __awaiter(this, void 0, void 0, function* () {
            const bhco = yield this.bhcoRepository.findOneById(id);
            if (!bhco.id) {
                console.log("bhco does not exist");
            }
            yield this.bhcoRepository.updateById(id, newBhco);
            return yield this.bhcoRepository.findOneById(id);
        });
    }
    deleteBhco(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.bhcoRepository.deleteById(id);
            let bhco = yield this.bhcoRepository.findOneById(id);
            if (!bhco) {
                return 'delete success';
            }
            else {
                return 'delete fail';
            }
        });
    }
};
BhcoService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('BhcoRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], BhcoService);
exports.BhcoService = BhcoService;
//# sourceMappingURL=bhco.service.js.map