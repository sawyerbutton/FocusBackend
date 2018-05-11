import { Component ,Inject} from "@nestjs/common";
import {getConnection, getRepository, Repository} from 'typeorm';
import { QuestionnaireEntity} from "./questionnaire.entity";
import { IQuestionnaire,IQuestionnaireService} from "./Interfaces";
import {SubDomainEntity} from "../DomainForQuestionnaire/SubDomain/subDomain.entity";
import {DomainEntity} from "../DomainForQuestionnaire/Domain/domain.entity";
import {async} from "rxjs/scheduler/async";

@Component()
export class QuestionnaireService implements IQuestionnaireService{
    constructor(
        @Inject('QuestionnaireRepository') private readonly questionnaireRepository: Repository<QuestionnaireEntity>
    ){}

    public async getAllQuestionnaire():Promise<Array<QuestionnaireEntity>>{
        return await getConnection().getRepository(QuestionnaireEntity).createQueryBuilder("questionnaire")
            // .leftJoinAndSelect(DomainEntity,"domain","domain.id = questionnaire.domain")
            // .leftJoinAndSelect(SubDomainEntity,"subDomain","subDomain.id = questionnaire.subdomain")
            .leftJoinAndSelect("questionnaire.domain","domain")
            .leftJoinAndSelect("questionnaire.subdomain","subdomain")
            .getMany();
    }

    public async getQuestionsBySubdomain(subDomainId:number):Promise<Array<QuestionnaireEntity>>{
        const selectedSubDomain = await getConnection()
            .getRepository(SubDomainEntity)
            .createQueryBuilder("subDomain")
            .leftJoinAndSelect("subDomain.questionnaire","questionnaire")
            .where("subDomain.id = :id",{id:subDomainId})
            .getOne();
        return selectedSubDomain.questionnaire;
    }

    public async getQuestionnaire(id:number):Promise<QuestionnaireEntity|null>{
        return await this.questionnaireRepository.findOneById(id);
    }
    public async addQuestionnaire(questionnaire:IQuestionnaire):Promise<QuestionnaireEntity>{
         const selectedQuestionnaire =  await this.questionnaireRepository.save(questionnaire);
         await getConnection().createQueryBuilder().relation(QuestionnaireEntity,"domain").of(selectedQuestionnaire.id).set(questionnaire.domain);
         await getConnection().createQueryBuilder().relation(QuestionnaireEntity,"subdomain")
             .of(selectedQuestionnaire.id).set(questionnaire.subdomain);
         return await this.questionnaireRepository.findOneById(selectedQuestionnaire.id);
    }
    public async updateQuestionnaire(id:number,newQuestionnaire:IQuestionnaire):Promise<QuestionnaireEntity|null>{
        const questionnaire = await this.questionnaireRepository.findOneById(id);
        if(!questionnaire){
            console.log("questionnaire does not exist");
        }
        await this.questionnaireRepository.updateById(id,newQuestionnaire);
        return await this.questionnaireRepository.findOneById(id);
    }
    public async deleteQuestionnaire(id:number):Promise<string>{
        // await this.questionnaireRepository.deleteById(id);
        // const questionnaire = this.questionnaireRepository.findOneById(id);
        // if(questionnaire){
        //     return 'delete fail';
        // }else{
        //     return 'delete success';
        // }
        const seletedQuestionnaire = await this.questionnaireRepository.findOneById(id);
        if(seletedQuestionnaire){
            await this.questionnaireRepository.deleteById(id);
            return 'delete success';
        }else{
            return 'delete fail';
        }
    }

    public async getQuestionnaireByDomain(domainId:number):Promise<Object>{
        let resultSubDomains = [];
        const selectedDomain = await getConnection().getRepository(DomainEntity)
            .createQueryBuilder("domain").leftJoinAndSelect("domain.subdomain","subdomain")
            .where("domain.id = :id",{id:domainId})
            .getOne();
        for(let subDomain of await selectedDomain.subdomain){
            const subDomainWithQ = await getConnection()
                .getRepository(SubDomainEntity)
                .createQueryBuilder("subDomain")
                .leftJoinAndSelect("subDomain.questionnaire","questionnaire")
                .orderBy("questionnaire.id","ASC")
                .where("subDomain.id = :id",{id:subDomain.id})
                .getOne();
            await resultSubDomains.push(subDomainWithQ);
        }
        return await {selectedDomain,resultSubDomains};
    }

    public async calculateDomainMaxAndMin(){
        const selectedDomains = await getConnection().createQueryBuilder().select().from(DomainEntity,"domain").getMany();
        const questionnaires = await getRepository(QuestionnaireEntity).createQueryBuilder("questionnaire")
            .leftJoinAndSelect("questionnaire.domain","domain")
            .getMany();
        await selectedDomains.forEach(async(domainItem)=>{
            let maxScore:number = 0;
            let minScore:number = 0;
            let questionnairesGroupByDomain = await questionnaires.filter((q)=>q.domain.domain === domainItem.domain);
            await questionnairesGroupByDomain.forEach(async(questionnaire)=>{
                let maxPoint:number;
                let minPoint:number;
                let array:number[] = [];
                questionnaire.options.forEach((option)=>{
                    array.push(option.point);
                })
                maxPoint = Math.max(...array);
                maxScore = maxPoint * questionnaire.weight;
                minPoint = Math.min(...array);
                minScore = minPoint * questionnaire.weight;
            });
            await getConnection().createQueryBuilder().update(DomainEntity)
                .set({maxScore:maxScore}).where("domain = :domain",{domain:domainItem.domain}).execute();

            await getConnection().createQueryBuilder().update(DomainEntity)
                .set({minScore:minScore}).where("domain = :domain",{domain:domainItem.domain}).execute();
        });
    }
}