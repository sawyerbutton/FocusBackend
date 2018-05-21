import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {CreateStateDto} from './DTO/create-State.dto'
import {StateService} from "./state.service";
// import{ UseGuards } from '@nestjs/common';
// import { RolesGuard } from '../Shared/Guards/roles.guard';
// import {Roles} from "../shared/Guards/roles.decorator";

@Controller('state')
// @UseGuards(RolesGuard)
export class StateController {
    constructor(
        private stateService:StateService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getAllState(){
        const msg = await this.stateService.getAllState();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getState(@Param() params){
        const msg = await this.stateService.getState(params.id);
        return msg;
    }

    // @Post()
    // // @Roles('systemAdmin','stateAdmin','communityAdmin')
    // public async addState(@Body() state:CreateStateDto){
    //     const msg = await this.stateService.addState(state);
    //     return msg;
    // }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateState(@Param() params,@Body() newState:CreateStateDto){
        const msg = await this.stateService.updateState(params.id,newState);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteState(@Param() params){
        const msg = await this.stateService.deleteState(params.id);
        return msg;
    }

    @Post()
    public async addAllState(@Body() state:CreateStateDto[]){
        const msg = await this.stateService.addAllState(state);
    }
}
