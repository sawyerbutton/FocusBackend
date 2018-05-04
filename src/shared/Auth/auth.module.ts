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

@Module({
    modules:[DatabaseModule],
    components:[
        AuthService,
        JwtStrategy,
        SystemAdminService, systemAdminProvider,
        StateAdminService,stateAdminProvider,
        CommunityAdminService,communityAdminProvider,
        CommunityMemberService,communityMemberProvider,
        BhcoService,bhcoProvider

    ],
    controllers:[
        AuthController,SystemAdminController,
        StateAdminController,CommunityAdminController,
        CommunityMemberController,BhcoController
    ]
})

export class AuthModule implements NestModule {
    //全域middleware
    public configure(consumer: MiddlewaresConsumer) {
        //apply、forRoute方法允許傳入多個參數
        consumer.apply(passport.authenticate('jwt', { session: false }))
            .forRoutes(
                { path: '/systemAdmin', method: RequestMethod.ALL },
                {path:'/stateAdmin',method:RequestMethod.ALL},
                {path:'/communityAdmin',method:RequestMethod.ALL},
                {path:'/communityMember',method:RequestMethod.ALL},
                {path:'/bhco',method:RequestMethod.ALL},
            );
    }
}