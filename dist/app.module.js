"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const communityMember_module_1 = require("./CommunityMembers/communityMember.module");
const bhco_module_1 = require("./Bhco/bhco.module");
const stateAdmin_module_1 = require("./StateAdmin/stateAdmin.module");
const systemAdmin_module_1 = require("./SystemAdmin/systemAdmin.module");
const communityAdmin_module_1 = require("./CommunityAdmin/communityAdmin.module");
const demographic_module_1 = require("./Demographic/demographic.module");
const questionnaire_module_1 = require("./Questionnaire/questionnaire.module");
const community_module_1 = require("./Community/community.module");
const state_module_1 = require("./State/state.module");
const county_module_1 = require("./County/county.module");
const city_module_1 = require("./City/city.module");
const block_module_1 = require("./Block/block.module");
const family_module_1 = require("./Family/family.module");
const userDemographic_module_1 = require("./UserDemographic/userDemographic.module");
const domain_module_1 = require("./DomainForQuestionnaire/Domain/domain.module");
const subDomain_module_1 = require("./DomainForQuestionnaire/SubDomain/subDomain.module");
const session_module_1 = require("./Session/session.module");
const answer_module_1 = require("./Answer/answer.module");
const auth_module_1 = require("./shared/Auth/auth.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        modules: [
            communityMember_module_1.CommunityMemberModule,
            bhco_module_1.BhcoModule,
            stateAdmin_module_1.StateAdminModule,
            systemAdmin_module_1.SystemAdminModule,
            communityAdmin_module_1.CommunityAdminModule,
            demographic_module_1.DemographicModule,
            questionnaire_module_1.QuestionnaireModule,
            community_module_1.CommunityModule,
            state_module_1.StateModule,
            county_module_1.CountyModule,
            city_module_1.CityModule,
            block_module_1.BlockModule,
            family_module_1.FamilyModule,
            userDemographic_module_1.UserDemographicModule,
            domain_module_1.DomainModule,
            subDomain_module_1.SubDomainModule,
            session_module_1.SessionModule,
            answer_module_1.AnswerModule,
            auth_module_1.AuthModule
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map