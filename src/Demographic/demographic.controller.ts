import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import { CreateDemographicDto} from "./DTO/create-Demographic.dto";
import {DemographicService} from "./demographic.service";
// import {Roles} from "../shared/Decorators/roles.decorator";
// import {UseGuards} from "@nestjs/common";
// import {RolesGuard} from "../shared/Guards/roles.guard";

@Controller('demographic')
// @UseGuards(RolesGuard)
export class DemographicController{
    constructor(
        private demographicService : DemographicService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllDemographic(){
        const msg = await this.demographicService.getAllDemographic();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getDemographic(@Param() params){
        const msg = await this.demographicService.getDemographic(params.id);
        return msg;
    }

    @Post()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async addDemographic(@Body() demographic:CreateDemographicDto){
        const msg = await this.demographicService.addDemographic(demographic);
        return msg;
    }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateDemographic(@Param() params,@Body() newDemographic: CreateDemographicDto){
        const msg = await this.demographicService.updateDemographic(params.id,newDemographic);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteDemographic(@Param() params){
        const msg = await this.demographicService.deleteDemographic(params.id);
        return msg;
    }
}
