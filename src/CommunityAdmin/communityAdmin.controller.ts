import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {CreateCAdminDto} from "./DTO/create-CAdmin.dto";
import {CommunityAdminService} from "./communityAdmin.service";
import {Roles} from "../shared/Decorators/roles.decorator";
import {RolesGuard} from "../shared/Guards/roles.guard";
import {UseGuards} from "@nestjs/common";

@Controller('communityAdmin')
@UseGuards(RolesGuard)
export class CommunityAdminController{
    constructor(
        private communityAdminService:CommunityAdminService
    ){}

    @Get()
    @Roles('systemAdmin','stateAdmin')
    public async getAllCommunityAdmin(){
        const msg = await this.communityAdminService.getAllCommunityAdmin();
        return msg;
    }

    @Get(':id')
    @Roles('systemAdmin','stateAdmin')
    public async getCommunityAdmin(@Param() params){
        const msg = await this.communityAdminService.getCommunityAdmin(params.id);
        return msg;
    }

    @Get('/state/:id')
    @Roles('systemAdmin','stateAdmin')
    public async getCommunityAdminByState(@Param() params){
        const msg = await this.communityAdminService.getCommunityAdminByState(params.id);
        return msg;
    }

    @Post()
    @Roles('systemAdmin','stateAdmin')
    public async addCommunityAdmin(@Body() communityAdmin:CreateCAdminDto){
        const msg = await this.communityAdminService.addCommunityAdmin(communityAdmin);
        return msg;
    }

    @Patch(':id')
    @Roles('systemAdmin','stateAdmin')
    public async updateCommunityAdmin(@Param() params,@Body() newCommunityAdmin:CreateCAdminDto){
        const msg = await this.communityAdminService.updateCommunityAdmin(params.id,newCommunityAdmin);
        return msg;
    }

    @Delete(':id')
    @Roles('systemAdmin','stateAdmin')
    public async deleteCommunityAdmin(@Param() params){
        const msg = await this.communityAdminService.deleteCommunityAdmin(params.id);
        return msg;
    }

    @Get('communityRelatedInfo/:id')
    @Roles('systemAdmin','stateAdmin')
    public async getCommunityRelatedInfo(@Param() params){
        const msg = await this.communityAdminService.getCommunityRelatedInfo(params.id);
        return msg;
    }

}