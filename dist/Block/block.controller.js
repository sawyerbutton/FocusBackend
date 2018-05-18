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
const create_Block_dto_1 = require("./DTO/create-Block.dto");
const block_service_1 = require("./block.service");
let BlockController = class BlockController {
    constructor(blockService) {
        this.blockService = blockService;
    }
    getAllBlock() {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.blockService.getAllBlock();
            return msg;
        });
    }
    getBlock(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.blockService.getBlock(params.id);
            return msg;
        });
    }
    addBlock(block) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.blockService.addBlock(block);
            return msg;
        });
    }
    updateBlock(params, newBlock) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.blockService.updateBlock(params.id, newBlock);
            return msg;
        });
    }
    deleteBlock(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.blockService.deleteBlock(params.id);
            return msg;
        });
    }
    getBlockByCommunity(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const msg = yield this.blockService.getBlockByCommunity(params.id);
            return msg;
        });
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "getAllBlock", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "getBlock", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_Block_dto_1.CreateBlockDto]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "addBlock", null);
__decorate([
    common_1.Patch(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_Block_dto_1.CreateBlockDto]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "updateBlock", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "deleteBlock", null);
__decorate([
    common_1.Get('community/:id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BlockController.prototype, "getBlockByCommunity", null);
BlockController = __decorate([
    common_1.Controller('block'),
    __metadata("design:paramtypes", [block_service_1.BlockService])
], BlockController);
exports.BlockController = BlockController;
//# sourceMappingURL=block.controller.js.map