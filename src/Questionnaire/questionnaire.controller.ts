import {Controller, Get, Patch, Post, Param, Body,Delete,UseFilters} from '@nestjs/common';
import {CreateQuestionnaireDto} from "./DTO/create-Questionnaire.dto";
import {QuestionnaireService} from "./questionnaire.service";
import {Roles} from "../shared/Guards/roles.decorator";
import{ UseGuards } from '@nestjs/common';
import { RolesGuard } from '../Shared/Guards/roles.guard';

@Controller('questionnaire')
@UseGuards(RolesGuard)
export class QuestionnaireController {
    constructor(
        private questionnaireService: QuestionnaireService
    ){}

    @Get()
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllQuestionnaire(){
        const msg = await this.questionnaireService.getAllQuestionnaire();
        return msg;
    }

    @Get(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getQuestionnaire(@Param() params){
        const msg = await this.questionnaireService.getQuestionnaire(params.id);
        return msg;
    }

    @Get("subDomain/:id")
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getQuestionnairesBySubDomain(@Param() params){
        const msg = await this.questionnaireService.getQuestionsBySubdomain(params.id);
        return msg;
    }

    @Post()
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async addQuestionnaire(@Body() questionnaire:CreateQuestionnaireDto){
        const msg = await this.questionnaireService.addQuestionnaire(questionnaire);
        return msg;
    }

    @Patch(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async updateQuestionnaire(@Param() params,@Body() newQuestionnaire: CreateQuestionnaireDto){
        const msg = await this.questionnaireService.updateQuestionnaire(params.id,newQuestionnaire);
        return msg;
    }

    @Delete(':id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async deleteQuestionnaire(@Param() params){
        const msg = await this.questionnaireService.deleteQuestionnaire(params.id);
        return msg;
    }

    @Get('domain/:id')
    @Roles('systemAdmin','stateAdmin','communityAdmin','bhco')
    public async getAllQuestionnaireByDomain(@Param() params){
        const msg = await this.questionnaireService.getQuestionnaireByDomain(params.id);
        return msg;
    }

    @Get('calculate')
    public async calculateDomain(){
        await this.questionnaireService.calculateDomainMaxAndMin();
    }
}