import {Controller, Get, Param, Patch} from "@nestjs/common";
import { ScoreCommunityService} from "./scoreCommunity.service";

@Controller('communityScore')
export class ScoreCommunityController {
    constructor(
        private scoreCommunityServic: ScoreCommunityService
    ){}

    @Get()
    public async getAllCommunityScore(){
        const msg = await this.scoreCommunityServic.getAllCommunityScore();
        return msg;
    }

    @Get(':id')
    public async getCommunityScoreByCommunityId(@Param() params){
        const msg = await this.scoreCommunityServic.getCommunityScoreByCommunityId(params.id);
        return msg;
    }

    @Get('addScore/:id')
    public async addCommunityScore(@Param() params){
        const msg = await this.scoreCommunityServic.addCommunityScoreById(params.id);
        return msg;
    }
}