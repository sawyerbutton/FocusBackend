import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {DomainService} from "./domain.service";
import {CreateDomainDto} from "./DTO/Create-Domain.dto";
// import {Roles} from "../../shared/Decorators/roles.decorator";
// import {UseGuards} from "@nestjs/common";
// import {RolesGuard} from "../../shared/Guards/roles.guard";

@Controller('domain')
// @UseGuards(RolesGuard)
export class DomainController {
    constructor(
        private domainService:DomainService
    ){}

    @Get()
    // @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllDomain(){
        const msg = await this.domainService.getAllDomain();
        return msg;
    }

    @Get(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getDomain(@Param() params){
        const msg = await this.domainService.getDomain(params.id);
        return msg;
    }

    @Post()
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async addDomain(@Body() domain:CreateDomainDto){
        const msg = await this.domainService.addDomain(domain);
        return msg;
    }

    @Patch(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async updateDomain(@Param() params,@Body() newDomain:CreateDomainDto){
        const msg = await this.domainService.updateDomain(params.id,newDomain);
        return msg;
    }

    @Delete(':id')
    // @Roles('systemAdmin','stateAdmin','communityAdmin')
    public async deleteDomain(@Param() params){
        const msg = await this.domainService.deleteDomain(params.id);
        return msg;
    }
}