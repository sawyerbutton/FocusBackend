"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport = require("passport");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../Database/database.module");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./Passport/jwt.strategy");
const auth_controller_1 = require("./auth.controller");
const systemAdmin_service_1 = require("../../SystemAdmin/systemAdmin.service");
const systemAdmin_providers_1 = require("../../SystemAdmin/systemAdmin.providers");
const systemAdmin_controller_1 = require("../../SystemAdmin/systemAdmin.controller");
const stateAdmin_service_1 = require("../../StateAdmin/stateAdmin.service");
const stateAdmin_providers_1 = require("../../StateAdmin/stateAdmin.providers");
const stateAdmin_controller_1 = require("../../StateAdmin/stateAdmin.controller");
const communityAdmin_service_1 = require("../../CommunityAdmin/communityAdmin.service");
const communityAdmin_providers_1 = require("../../CommunityAdmin/communityAdmin.providers");
const communityAdmin_controller_1 = require("../../CommunityAdmin/communityAdmin.controller");
const communityMember_service_1 = require("../../CommunityMembers/communityMember.service");
const communityMember_controller_1 = require("../../CommunityMembers/communityMember.controller");
const communityMember_providers_1 = require("../../CommunityMembers/communityMember.providers");
const bhco_service_1 = require("../../Bhco/bhco.service");
const bhco_controller_1 = require("../../Bhco/bhco.controller");
const bhco_providers_1 = require("../../Bhco/bhco.providers");
const answer_controller_1 = require("../../Answer/answer.controller");
const answer_service_1 = require("../../Answer/answer.service");
const answer_providers_1 = require("../../Answer/answer.providers");
const block_controller_1 = require("../../Block/block.controller");
const block_service_1 = require("../../Block/block.service");
const block_providers_1 = require("../../Block/block.providers");
const questionnaire_service_1 = require("../../Questionnaire/questionnaire.service");
const questionnaire_controller_1 = require("../../Questionnaire/questionnaire.controller");
const questionnaire_providers_1 = require("../../Questionnaire/questionnaire.providers");
const session_service_1 = require("../../Session/session.service");
const session_controller_1 = require("../../Session/session.controller");
const session_providers_1 = require("../../Session/session.providers");
const domain_controller_1 = require("../../DomainForQuestionnaire/Domain/domain.controller");
const domain_service_1 = require("../../DomainForQuestionnaire/Domain/domain.service");
const domain_providers_1 = require("../../DomainForQuestionnaire/Domain/domain.providers");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer.apply(passport.authenticate('jwt', { session: false }))
            .forRoutes({ path: '/systemAdmin', method: common_1.RequestMethod.ALL }, { path: '/stateAdmin*', method: common_1.RequestMethod.ALL }, { path: '/communityAdmin*', method: common_1.RequestMethod.ALL }, { path: '/communityMember*', method: common_1.RequestMethod.ALL }, { path: '/bhco*', method: common_1.RequestMethod.ALL }, { path: '/answer*', method: common_1.RequestMethod.ALL }, { path: '/block*', method: common_1.RequestMethod.ALL }, { path: '/city*', method: common_1.RequestMethod.ALL }, { path: '/community*', method: common_1.RequestMethod.ALL }, { path: '/county*', method: common_1.RequestMethod.ALL }, { path: '/demographic*', method: common_1.RequestMethod.ALL }, { path: '/family*', method: common_1.RequestMethod.ALL }, { path: '/questionnaire*', method: common_1.RequestMethod.ALL }, { path: '/session*', method: common_1.RequestMethod.ALL }, { path: '/state*', method: common_1.RequestMethod.ALL }, { path: '/domain*', method: common_1.RequestMethod.ALL });
    }
};
AuthModule = __decorate([
    common_1.Module({
        modules: [database_module_1.DatabaseModule],
        components: [
            auth_service_1.AuthService,
            jwt_strategy_1.JwtStrategy,
            systemAdmin_service_1.SystemAdminService, systemAdmin_providers_1.systemAdminProvider,
            stateAdmin_service_1.StateAdminService, stateAdmin_providers_1.stateAdminProvider,
            communityAdmin_service_1.CommunityAdminService, communityAdmin_providers_1.communityAdminProvider,
            communityMember_service_1.CommunityMemberService, communityMember_providers_1.communityMemberProvider,
            bhco_service_1.BhcoService, bhco_providers_1.bhcoProvider,
            answer_service_1.AnswerService, answer_providers_1.answerProvider,
            block_service_1.BlockService, block_providers_1.blockProvider,
            questionnaire_service_1.QuestionnaireService, questionnaire_providers_1.questionnaireProvider,
            session_service_1.SessionService, session_providers_1.sessionProvider,
            domain_providers_1.domainProvider, domain_service_1.DomainService
        ],
        controllers: [
            auth_controller_1.AuthController, systemAdmin_controller_1.SystemAdminController,
            stateAdmin_controller_1.StateAdminController, communityAdmin_controller_1.CommunityAdminController,
            communityMember_controller_1.CommunityMemberController, bhco_controller_1.BhcoController,
            answer_controller_1.AnswerController, block_controller_1.BlockController,
            questionnaire_controller_1.QuestionnaireController, session_controller_1.SessionController,
            domain_controller_1.DomainController
        ]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map