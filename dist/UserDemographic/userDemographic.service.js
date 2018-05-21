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
const userDemographic_entity_1 = require("./userDemographic.entity");
const demographic_entity_1 = require("../Demographic/demographic.entity");
let UserDemographicService = class UserDemographicService {
    constructor(userDemographicRepository) {
        this.userDemographicRepository = userDemographicRepository;
    }
    getAllUserDemographic() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDemographicRepository.find();
        });
    }
    getUserDemographic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDemographicRepository.findOneById(id);
        });
    }
    addUserDemographic(userDemographic) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userDemographicRepository.save(userDemographic);
        });
    }
    updateUserDemographic(id, newUserDemographic) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDemographic = yield this.userDemographicRepository.findOneById(id);
            if (!userDemographic) {
                console.log('user demographic does not exist');
            }
            yield this.userDemographicRepository.updateById(id, newUserDemographic);
            return yield this.userDemographicRepository.findOneById(id);
        });
    }
    deleteUserDemographic(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.userDemographicRepository.deleteById(id);
            const userDemographic = yield this.userDemographicRepository.findOneById(id);
            if (userDemographic) {
                return 'delete fail';
            }
            else {
                return 'delete success';
            }
        });
    }
    getDemographicAnswerByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getConnection().getRepository(userDemographic_entity_1.UserDemographicEntity).createQueryBuilder("userDemographic")
                .leftJoinAndSelect(demographic_entity_1.DemographicEntity, "demographic", "demographic.id = userDemographic.questionid")
                .where("userDemographic.userid = :id", { id: userId })
                .getMany();
        });
    }
};
UserDemographicService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('UserDemographicRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], UserDemographicService);
exports.UserDemographicService = UserDemographicService;
//# sourceMappingURL=userDemographic.service.js.map