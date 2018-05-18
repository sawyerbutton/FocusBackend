import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {CreateUserDemographicDto} from "./DTO/create-UserDemographic.dto";
import {UserDemographicService} from "./userDemographic.service";
// import { Roles} from '../shared/Guards/roles.decorator';
// import{ UseGuards } from '@nestjs/common';
// import { RolesGuard } from '../Shared/Guards/roles.guard';

@Controller('userDemographic')
// @UseGuards(RolesGuard)
export class UserDemographicController{
    constructor(
        private userDemographicService: UserDemographicService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllUserDemographic(){
        const msg = await this.userDemographicService.getAllUserDemographic();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getUserDemographic(@Param() params){
        const msg = await this.userDemographicService.getUserDemographic(params.id);
        return msg;
    }

    @Post()
    // @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async addUserDemographic(@Body() demographic:CreateUserDemographicDto){
        const msg = await this.userDemographicService.addUserDemographic(demographic);
        return msg;
    }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async updateUserDemographic(@Param() params,@Body() newDemographic:CreateUserDemographicDto){
        const msg = await this.userDemographicService.updateUserDemographic(params.id,newDemographic);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async deleteUserDemographic(@Param() params){
        const msg = await this.userDemographicService.deleteUserDemographic(params.id);
        return msg;
    }
}