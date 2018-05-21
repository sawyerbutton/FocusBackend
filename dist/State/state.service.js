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
let StateService = class StateService {
    constructor(stateRepository) {
        this.stateRepository = stateRepository;
    }
    getAllState() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stateRepository.find();
        });
    }
    getState(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stateRepository.findOneById(id);
        });
    }
    addState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stateRepository.save(state);
        });
    }
    addAllState(state) {
        return __awaiter(this, void 0, void 0, function* () {
            yield state.forEach((state) => __awaiter(this, void 0, void 0, function* () {
                yield this.stateRepository.save(state);
            }));
        });
    }
    updateState(id, newState) {
        return __awaiter(this, void 0, void 0, function* () {
            const state = yield this.stateRepository.findOneById(id);
            if (!state) {
                console.log('state does not exist');
            }
            yield this.stateRepository.updateById(id, newState);
            return yield this.stateRepository.findOneById(id);
        });
    }
    deleteState(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stateRepository.deleteById(id);
            const state = yield this.stateRepository.findOneById(id);
            if (state) {
                return 'delete fail';
            }
            else {
                return 'delete success';
            }
        });
    }
};
StateService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('StateRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StateService);
exports.StateService = StateService;
//# sourceMappingURL=state.service.js.map