import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import { FamilyService} from "./family.service";
import { CreateFamilyDto} from "./DTO/create-Family.dto";
// import {Roles} from "../shared/Guards/roles.decorator";
// import{ UseGuards } from '@nestjs/common';
// import { RolesGuard } from '../Shared/Guards/roles.guard';

@Controller('family')
// @UseGuards(RolesGuard)
export class FamilyController {
    constructor(
        private familyService:FamilyService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getAllFamily(){
        const msg = await this.familyService.getAllFamily();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getFamily(@Param() params){
        const msg = await this.familyService.getFamily(params.id);
        return msg;
    }

    @Post()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async addFamily(@Body() family:CreateFamilyDto){
        const msg = await this.familyService.addFamily(family);
        return msg;
    }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateFamily(@Param() params,@Body() newFamily:CreateFamilyDto){
        const msg = await this.familyService.updateFamily(params.id,newFamily);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteFamily(@Param() params){
        const msg = await this.familyService.deleteFamily(params.id);
        return msg;
    }

    @Get('/block/:id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getFamilyByBlock(@Param() params){
        const msg = await this.familyService.getFamilyByBlock(params.id);
        return msg;
    }
}