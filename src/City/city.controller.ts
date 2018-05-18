import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import { CreateCityDto} from "./DTO/create-City.dto";
import { CityService} from "./city.service";
// import {Roles} from "../shared/Guards/roles.decorator";
// import { UseGuards} from "@nestjs/common";
// import {RolesGuard} from "../shared/Guards/roles.guard";

@Controller('city')
// @UseGuards(RolesGuard)
export class CityController {
    constructor(
        private cityService: CityService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getAllCity(){
        const msg =  await this.cityService.getAllCity();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getCity(@Param() params){
        const msg = await this.cityService.getCity(params.id);
        return msg;
    }

    @Post()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async addCity(@Body() city:CreateCityDto){
        const msg = await this.cityService.addCity(city);
        return msg;
    }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateCity(@Param() params,@Body() newCity:CreateCityDto){
        const msg = await this.cityService.updateCity(params.id,newCity);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteCity(@Param() params){
        const msg = await this.cityService.deleteCity(params.id);
        return msg;
    }

    @Get('/county/:id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getCityByCounty(@Param() params){
        const msg = await this.cityService.getCityByCounty(params.id);
        return msg;
    }

}