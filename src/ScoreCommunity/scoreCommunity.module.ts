import { DatabaseModule} from "../Database/database.module";
import { ScoreCommunityController} from "./scoreCommunity.controller";
import { scoreCommunityProvider} from "./ScoreCommunity.providers";
import { ScoreCommunityService} from "./scoreCommunity.service";
import {Module} from "@nestjs/common";

@Module({
    imports:[
        DatabaseModule
    ],
    components:[
        scoreCommunityProvider,
        ScoreCommunityService
    ],
    controllers:[
        ScoreCommunityController
    ]
})

export class ScoreCommunityModule {
    
}

