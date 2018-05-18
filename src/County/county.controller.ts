import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import { CreateCountyDto} from "./DTO/create-County.dto";
import {CountyService} from "./county.service";
// import {Roles} from "../shared/Guards/roles.decorator";
// import {UseGuards} from "@nestjs/common";
// import { RolesGuard} from "../shared/Guards/roles.guard";

@Controller('county')
// @UseGuards(RolesGuard)
export class CountyController {
    constructor(
        private countyService: CountyService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getAllCounty(){
        const msg = await this.countyService.getAllCounty();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getCounty(@Param() params){
        const msg = await this.countyService.getCounty(params.id);
        return msg;
    }

    @Post()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async addCounty(@Body() county:CreateCountyDto){
        const msg = await this.countyService.addCounty(county);
        return msg;
    }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateCounty(@Param() params,@Body() newCounty:CreateCountyDto){
        const msg = await this.countyService.updateCounty(params.id,newCounty);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteCounty(@Param() params){
        const msg = await this.countyService.deleteCounty(params.id);
        return msg;
    }

    @Get('/state/:id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getCountyByState(@Param() params){
        const msg = await this.countyService.getCountyByState(params.id);
        return msg;
    }
}