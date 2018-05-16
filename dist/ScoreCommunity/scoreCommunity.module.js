"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_module_1 = require("../Database/database.module");
const scoreCommunity_controller_1 = require("./scoreCommunity.controller");
const ScoreCommunity_providers_1 = require("./ScoreCommunity.providers");
const scoreCommunity_service_1 = require("./scoreCommunity.service");
const common_1 = require("@nestjs/common");
let ScoreCommunityModule = class ScoreCommunityModule {
};
ScoreCommunityModule = __decorate([
    common_1.Module({
        imports: [
            database_module_1.DatabaseModule
        ],
        components: [
            ScoreCommunity_providers_1.scoreCommunityProvider,
            scoreCommunity_service_1.ScoreCommunityService
        ],
        controllers: [
            scoreCommunity_controller_1.ScoreCommunityController
        ]
    })
], ScoreCommunityModule);
exports.ScoreCommunityModule = ScoreCommunityModule;
//# sourceMappingURL=scoreCommunity.module.js.map