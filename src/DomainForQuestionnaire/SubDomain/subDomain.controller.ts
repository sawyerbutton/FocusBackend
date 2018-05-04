import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {CreateSubDomainDto} from "./DTO/Create-SubDomain.dto";
import {SubDomainService} from "./subDomain.service";
import {Roles} from "../../shared/Decorators/roles.decorator";
import {UseGuards} from "@nestjs/common";
import {RolesGuard} from "../../shared/Guards/roles.guard";

@Controller('subDomain')
export class SubDomainController {
    constructor(
        private subDomainService:SubDomainService
    ){}

    @Get()
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllSubDomain(){
        const msg = await this.subDomainService.getAllSubDomain();
        return msg;
    }
    //
    @Get(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllSubDomainByDomainID(@Param() params){
        const msg = await this.subDomainService.getAllSubDomainByDomain(params.id);
        return msg;
    }

    @Patch(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async addSubDomain(@Param() params,@Body() subDomain:CreateSubDomainDto){
        const msg = await this.subDomainService.addSubDomain(params.id,subDomain);
        return msg;
    }

    @Patch('update/:id')
    @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateSubDomain(@Param() params,@Body() newSubDomain:CreateSubDomainDto){
        const msg = await this.subDomainService.updateSubDomain(params.id,newSubDomain);
        return msg;
    }

    @Delete(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteSubDomain(@Param() params){
        const msg = await this.subDomainService.deleteSubDomain(params.id);
        return msg;
    }

    @Delete('isolate/:id')
    @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async isolateSubDomain(@Param() params){
        const msg = await this.subDomainService.isolateSubDomain(params.id);
        return msg;
    }

    @Get('isolatedSubDomain')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllSubDomainIsolated(){
        const msg = await this.subDomainService.getAllSubDomainIsolated();
        return msg;
    }
}