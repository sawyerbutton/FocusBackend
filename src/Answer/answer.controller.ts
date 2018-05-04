import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {AnswerService} from "./answer.service";
import {CreateAnswerDto} from "./DTO/create-Answer.dto";
import {Roles} from "../shared/Decorators/roles.decorator";
import {RolesGuard} from "../shared/Guards/roles.guard";
import {UseGuards} from "@nestjs/common";

@Controller('answer')
@UseGuards(RolesGuard)
export class AnswerController {
    constructor(
        private answerService:AnswerService
    ){}

    @Get()
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllAnswer(){
        const msg = await this.answerService.getAllAnswer();
        return msg;
    }

    @Get(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAnswerById(@Param() params){
        const msg = await this.answerService.getAnswerById(params.id);
        return msg;
    }

    @Get('session/:id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAnswerBySessionId(@Param() params){
        const msg = await this.answerService.getAnswersBySessionId(params.id);
        return msg;
    }

    @Patch(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async addAnswer(@Param() params,@Body() answers:CreateAnswerDto[]){
        const msg = await this.answerService.addAnswer(params.id,answers);
        return msg;
    }
    //need more discussion
    @Patch(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async updateAnswer(@Param() params,@Body() newAnswers:CreateAnswerDto[]){
        const msg = await this.answerService.updateAnswer(params.id,newAnswers);
        return msg;
    }

    @Delete(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async deleteAnswer(@Param() params){
        const msg = await this.answerService.deleteAnswer(params.id);
        return msg;
    }

}