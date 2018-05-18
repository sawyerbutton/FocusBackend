import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {CreateSystemAdminDto} from "./DTO/create-SystemAdmin.dto";
import {SystemAdminService} from "./systemAdmin.service";
// import { Roles} from '../shared/Guards/roles.decorator';
// import{ UseGuards } from '@nestjs/common';
// import { RolesGuard } from '../Shared/Guards/roles.guard';

@Controller('systemAdmin')
// @UseGuards(RolesGuard)
export class SystemAdminController{
    constructor(
        private systemAdminService: SystemAdminService
    ){}

    @Get()
    // @Roles('systemAdmin')
    public async getAllSystemAdmin(){
        const msg = await this.systemAdminService.getAllSystemAdmin();
        return msg;
    }

    @Post()
    // @Roles('systemAdmin')
    public async addSystemAdmin(@Body() systemAdmin:CreateSystemAdminDto){
        const msg = await this.systemAdminService.addSystemAdmin(systemAdmin);
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin')
    public async getSystemAdmin(@Param() params){
        const msg = await this.systemAdminService.getSystemAdmin(params.id);
        return msg;
    }

    @Patch(':id')
    // @Roles('systemAdmin')
    public async updateSystemAdmin(@Body() newSystemAdmin:CreateSystemAdminDto,@Param() params){
        const msg = await this.systemAdminService.updateSystemAdmin(params.id,newSystemAdmin);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin')
    public async deleteSystemAdmin(@Param() params){
        const msg = await this.systemAdminService.deleteSystemAdmin(params.id);
        return msg;
    }
}
