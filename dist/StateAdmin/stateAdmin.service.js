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
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
let StateAdminService = class StateAdminService {
    constructor(stateAdminRepository) {
        this.stateAdminRepository = stateAdminRepository;
    }
    getAllStateAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stateAdminRepository.find();
        });
    }
    getStateAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stateAdminRepository.findOneById(id);
        });
    }
    getStateAmdinByUser(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stateAdminRepository.findOne(options);
        });
    }
    addStateAdmin(stateAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.stateAdminRepository.save(stateAdmin);
        });
    }
    updateStateAdmin(id, newStateAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const stateAdmin = yield this.stateAdminRepository.findOneById(id);
            if (!stateAdmin) {
                console.log('state admin does not exist');
            }
            else {
                yield this.stateAdminRepository.updateById(id, newStateAdmin);
                return this.stateAdminRepository.findOneById(id);
            }
        });
    }
    deleteStateAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stateAdminRepository.deleteById(id);
            const stateAdmin = yield this.stateAdminRepository.findOneById(id);
            if (!stateAdmin) {
                return 'delete success';
            }
            else {
                return 'delete fail';
            }
        });
    }
};
StateAdminService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('StateAdminRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], StateAdminService);
exports.StateAdminService = StateAdminService;
//# sourceMappingURL=stateAdmin.service.js.map