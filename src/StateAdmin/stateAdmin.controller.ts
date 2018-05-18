import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import { CreateStateAdminDto} from "./DTO/create-StateAdmin.dto";
import {StateAdminService} from "./stateAdmin.service";
// import { Roles} from '../shared/Guards/roles.decorator';
// import{ UseGuards } from '@nestjs/common';
// import { RolesGuard } from '../Shared/Guards/roles.guard';


@Controller('stateAdmin')
// @UseGuards(RolesGuard)
export class StateAdminController {
    constructor(
        private stateAdminService:StateAdminService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin')
    public async getAllStateAdmin(){
        const msg = await this.stateAdminService.getAllStateAdmin();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin')
    public async getStateAdmin(@Param() params){
        const msg = await this.stateAdminService.getStateAdmin(params.id);
        return msg;
    }

    @Post()
    // @Roles('systemAdmin','stateAdmin')
    public async addStateAdmin(@Body() stateAdmin:CreateStateAdminDto){
        const msg = await this.stateAdminService.addStateAdmin(stateAdmin);
    }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin')
    public async updateStateAdmin(@Param() params,@Body() newStateAdmin:CreateStateAdminDto){
        const msg = await this.stateAdminService.updateStateAdmin(params.id,newStateAdmin);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin')
    public async deleteStateAdmin(@Param() params){
        const msg = await this.stateAdminService.deleteStateAdmin(params.id);
        return msg;
    }
}