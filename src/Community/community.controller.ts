import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {CommunityService} from "./community.service";
import {CreateCommunityDto} from "./DTO/create-Community.dto";
// import {Roles} from "../shared/Guards/roles.decorator";
// import {UseGuards} from "@nestjs/common";
// import {RolesGuard} from "../shared/Guards/roles.guard";

@Controller('community')
// @UseGuards(RolesGuard)
export class CommunityController {
    constructor(
        private communityService: CommunityService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getAllCommunity(){
        const msg = await this.communityService.getAllCommunity();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getCommunity(@Param() params){
        const msg = await this.communityService.getCommunity(params.id);
        return msg;
    }

    @Post()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async addCommunity(@Body() community:CreateCommunityDto){
        const msg = await this.communityService.addCommunity(community);
        return msg;
    }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateCommunity(@Param() params,@Body() newCommunity:CreateCommunityDto){
        const msg = await this.communityService.updateCommunity(params.id,newCommunity);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteCommunity(@Param() params){
        const msg = await this.communityService.deleteCommunity(params.id);
        return msg;
    }

    @Get('/city/:id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getCommunityByCity(@Param() params){
        const msg = await this.communityService.getCommunityByCity(params.id);
        return msg;
    }
}