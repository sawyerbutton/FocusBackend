import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {SessionService} from "./session.service";
import {CreateSessionDto} from "./DTO/create-Session.dto";
import {Roles} from "../shared/Guards/roles.decorator";
import{ UseGuards } from '@nestjs/common';
import { RolesGuard } from '../Shared/Guards/roles.guard';

@Controller('session')
@UseGuards(RolesGuard)
export class SessionController {
    constructor(
        private sessionService: SessionService
    ){}

    @Get()
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllSession(){
        const msg = await this.sessionService.getAllSession();
        return msg;
    }

    @Get('user/:id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllSessionByUserId(@Param() params){
        const msg = await this.sessionService.getSessionByUserId(params.id);
        return msg;
    }

    @Get(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getSessionById(@Param() params){
        const msg = await this.sessionService.getSessionById(params.id);
        return msg;
    }

    @Patch()
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async addSession(@Body() session:CreateSessionDto,@Param() params){
        const msg = await this.sessionService.addSession(params.id,session);
        return msg;
    }

    @Patch(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async updateSession(@Param() params,@Body() newSession:CreateSessionDto){
        const msg = await this.sessionService.updateSession(params.id,newSession);
        return msg;
    }

    @Delete(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async deleteSession(@Param() params){
        const msg = await this.sessionService.deleteSession(params.id);
        return msg;
    }

    @Get('score/:id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getSessionScore(@Param() params){
        const msg = await this.sessionService.calculateScore(params.id);
        return msg;
    }

    @Post()
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async createSession(@Body() session){
        const msg = await this.sessionService.createSession(session);
        return msg;
    }
}