import * as passport from 'passport';
import {
    Module,
    NestModule,
    MiddlewaresConsumer,
    RequestMethod
} from '@nestjs/common';
import { DatabaseModule} from "../../Database/database.module";
import { AuthService } from './auth.service';
import { JwtStrategy } from './Passport/jwt.strategy';
import { AuthController } from './auth.controller';
//system admin
import { SystemAdminService} from "../../SystemAdmin/systemAdmin.service";
import { systemAdminProvider} from "../../SystemAdmin/systemAdmin.providers";
import { SystemAdminController} from "../../SystemAdmin/systemAdmin.controller";
//state admin
import { StateAdminService} from "../../StateAdmin/stateAdmin.service";
import { stateAdminProvider} from "../../StateAdmin/stateAdmin.providers";
import { StateAdminController} from "../../StateAdmin/stateAdmin.controller";
//community admin
import { CommunityAdminService} from "../../CommunityAdmin/communityAdmin.service";
import { communityAdminProvider} from "../../CommunityAdmin/communityAdmin.providers";
import { CommunityAdminController} from "../../CommunityAdmin/communityAdmin.controller";
//community member
import { CommunityMemberService} from "../../CommunityMembers/communityMember.service";
import { CommunityMemberController} from "../../CommunityMembers/communityMember.controller";
import { communityMemberProvider} from "../../CommunityMembers/communityMember.providers";
//bhco
import { BhcoService} from "../../Bhco/bhco.service";
import { BhcoController} from "../../Bhco/bhco.controller";
import { bhcoProvider} from "../../Bhco/bhco.providers";
//answer
import { AnswerController} from "../../Answer/answer.controller";
import { AnswerService} from "../../Answer/answer.service";
import { answerProvider} from "../../Answer/answer.providers";
//block
import { BlockController} from "../../Block/block.controller";
import { BlockService} from "../../Block/block.service";
import { blockProvider} from "../../Block/block.providers";
//questionnaire
import { QuestionnaireService} from "../../Questionnaire/questionnaire.service";
import { QuestionnaireController} from "../../Questionnaire/questionnaire.controller";
import { questionnaireProvider} from "../../Questionnaire/questionnaire.providers";
//session
import { SessionService} from "../../Session/session.service";
import { SessionController} from "../../Session/session.controller";
import { sessionProvider} from "../../Session/session.providers";
//domain
import { DomainController} from "../../DomainForQuestionnaire/Domain/domain.controller";
import { DomainService} from "../../DomainForQuestionnaire/Domain/domain.service";
import { domainProvider} from "../../DomainForQuestionnaire/Domain/domain.providers";

@Module({
    modules:[DatabaseModule],
    components:[
        AuthService,
        JwtStrategy,
        SystemAdminService, systemAdminProvider,
        StateAdminService,stateAdminProvider,
        CommunityAdminService,communityAdminProvider,
        CommunityMemberService,communityMemberProvider,
        BhcoService,bhcoProvider,
        AnswerService,answerProvider,
        BlockService,blockProvider,
        QuestionnaireService,questionnaireProvider,
        SessionService,sessionProvider,
        domainProvider,DomainService

    ],
    controllers:[
        AuthController,SystemAdminController,
        StateAdminController,CommunityAdminController,
        CommunityMemberController,BhcoController,
        AnswerController,BlockController,
        QuestionnaireController,SessionController,
        DomainController
    ]
})

export class AuthModule implements NestModule {
    //全域middleware
    public configure(consumer: MiddlewaresConsumer) {
        //apply、forRoute方法允許傳入多個參數
        consumer.apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(
                { path: '/systemAdmin', method: RequestMethod.ALL },
                {path:'/stateAdmin*',method:RequestMethod.ALL},
                {path:'/communityAdmin*',method:RequestMethod.ALL},
                {path:'/communityMember*',method:RequestMethod.ALL},
                {path:'/bhco*',method:RequestMethod.ALL},
                {path:'/answer*',method:RequestMethod.ALL},
                {path:'/block*',method:RequestMethod.ALL},
                {path:'/city*',method:RequestMethod.ALL},
                {path:'/community*',method:RequestMethod.ALL},
                {path:'/county*',method:RequestMethod.ALL},
                {path:'/demographic*',method:RequestMethod.ALL},
                {path:'/family*',method:RequestMethod.ALL},
                {path:'/questionnaire*',method:RequestMethod.ALL},
                {path:'/session*',method:RequestMethod.ALL},
                {path:'/state*',method:RequestMethod.ALL},
                {path:'/domain*',method:RequestMethod.ALL}
            );
    }
}