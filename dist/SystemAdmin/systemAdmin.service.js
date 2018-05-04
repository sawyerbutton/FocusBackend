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
let SystemAdminService = class SystemAdminService {
    constructor(systemAdminRepository) {
        this.systemAdminRepository = systemAdminRepository;
    }
    getAllSystemAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.systemAdminRepository.find();
        });
    }
    getSystemAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.systemAdminRepository.findOneById(id);
        });
    }
    getSystemAdminByUser(options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.systemAdminRepository.findOne(options);
        });
    }
    addSystemAdmin(systemAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.systemAdminRepository.save(systemAdmin);
        });
    }
    updateSystemAdmin(id, newSystemAdmin) {
        return __awaiter(this, void 0, void 0, function* () {
            const systemAdmin = yield this.systemAdminRepository.findOneById(id);
            if (!systemAdmin) {
                console.log("system admin does not exist");
            }
            else {
                yield this.systemAdminRepository.updateById(id, newSystemAdmin);
                return yield this.systemAdminRepository.findOneById(id);
            }
        });
    }
    deleteSystemAdmin(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.systemAdminRepository.deleteById(id);
            const systemAdmin = yield this.systemAdminRepository.findOneById(id);
            if (!systemAdmin) {
                return 'delete success';
            }
            else {
                return 'delete fail';
            }
        });
    }
};
SystemAdminService = __decorate([
    common_1.Component(),
    __param(0, common_1.Inject('SystemAdminRepository')),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], SystemAdminService);
exports.SystemAdminService = SystemAdminService;
//# sourceMappingURL=systemAdmin.service.js.map