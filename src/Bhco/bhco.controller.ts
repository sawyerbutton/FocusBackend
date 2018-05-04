import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {CreateBhcoDto} from "./DTO/create-Bhco.dto";
import {BhcoService} from "./bhco.service";
import {Roles} from "../shared/Decorators/roles.decorator";

@Controller('bhco')
export class BhcoController{
    constructor(
        private bhcoService: BhcoService
    ){}

    @Get()
    @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getAllBhco(){
        const msg = await this.bhcoService.getAllBhco();
        return msg;
    }

    @Get('Community/:id')
    @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getAllBhcoByCommunity(@Param() params){
        const msg = await this.bhcoService.getAllBhcoByCommunity(params.id);
        return msg;
    }

    @Get('State/:id')
    @Roles('systemAdmin','stateAdmin')
    public async getAllBhcoByState(@Param() params){
        const msg = await this.bhcoService.getAllBhcoByState(params.id);
        return msg;
    }

    @Post()
    public async addBhco(@Body() bhco: CreateBhcoDto){
        const msg = await this.bhcoService.addBhco(bhco);
        return msg;
    }

    @Get(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async getBhco(@Param() params){
       const msg =await this.bhcoService.getBhco(params.id);
       return msg;
    }

    @Patch(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateBhco(@Param() params,@Body() newBhco: CreateBhcoDto){
        const msg = await  this.bhcoService.updateBhco(params.id,newBhco);
        return msg;
    }

    @Delete(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteBhco(@Param() params){
        const msg = await this.bhcoService.deleteBhco(params.id);
        return msg;
    }


}