import { Component ,Inject} from "@nestjs/common";
import {Repository, getRepository, getConnection} from 'typeorm';
import {IAnswer,IAnswerService} from "./Interfaces";
import {AnswerEntity} from "./answer.entity";
import {SessionEntity} from "../Session/session.entity";

@Component()
export class AnswerService implements IAnswerService{
    constructor(
        @Inject('AnswerRepository') private readonly answerRepository:Repository<AnswerEntity>
    ){}

    public async getAllAnswer():Promise<Array<AnswerEntity>>{
        return await this.answerRepository.find();
    }
    public async getAnswerById(id:number):Promise<AnswerEntity|null>{
        return await this.answerRepository.findOneById(id);
    }
    public async getAnswersBySessionId(sessionId:number):Promise<Array<AnswerEntity>>{
        const selectedSession = await getConnection().getRepository(SessionEntity)
            .createQueryBuilder("session").leftJoinAndSelect("session.answer","answer")
            .where("session.id = :id",{id:sessionId})
            .getOne();
        return await selectedSession.answer;
    }
    public async addAnswer(sessionId:number,answers:IAnswer[]){
        for(let answer of answers){
            const selectedAnswer = await this.answerRepository.save(answer);
            await getConnection().createQueryBuilder().relation(AnswerEntity,"session")
                .of(selectedAnswer.id).set(sessionId);
        }
    }
    public async updateAnswer(sessionId:number,newAnswers:IAnswer[]){
        for(let answer of newAnswers){
            const selectedAnswer = await this.answerRepository.save(answer);
            await getConnection().createQueryBuilder().relation(AnswerEntity,"session")
                .of(selectedAnswer.id).set(sessionId);
        }
    }
    public async deleteAnswer(sessionId:number):Promise<string>{
        const selectedSession = await getConnection().getRepository(SessionEntity)
            .createQueryBuilder("session").leftJoinAndSelect("session.answer","answer")
            .where("session.id = :id",{id:sessionId})
            .getOne();
        for(let answer of await selectedSession.answer){
            await getConnection().createQueryBuilder().relation(AnswerEntity,"session")
                .of(answer.id).set(null);
        }
        return 'delete success'
    }
}