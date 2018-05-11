import { Component ,Inject} from "@nestjs/common";
import {Repository, getRepository, getConnection} from 'typeorm';
import {ISessionService,ISession} from "./Interfaces";
import {SessionEntity} from "./session.entity";
import {AnswerEntity} from "../Answer/answer.entity";
import {DomainEntity} from "../DomainForQuestionnaire/Domain/domain.entity";
import {async} from "rxjs/scheduler/async";

@Component()
export class SessionService implements ISessionService{
    constructor(
        @Inject('SessionRepository') private readonly sessionRepository:Repository<SessionEntity>,
        @Inject('AnswerRepository') private readonly answerRepository:Repository<AnswerEntity>
    ){}

    public async getAllSession():Promise<Array<SessionEntity>>{
        return await this.sessionRepository.find();
    }

    public async getSessionByUserId(userId:number):Promise<Array<SessionEntity>>{
        return await this.sessionRepository.find({where:{userid:userId}});
    }

    public async getSessionById(id:number):Promise<SessionEntity|null>{
        return await this.sessionRepository.findOneById(id);
    }

    public async addSession(session:ISession):Promise<SessionEntity>{
        const selectedSession = await this.sessionRepository.save(session);
        for(let answer of await session.answer){
            const selectedAnswer = await this.answerRepository.save(answer);
            await getConnection().createQueryBuilder().relation(AnswerEntity,"session")
                .of(selectedAnswer.id).set(selectedSession.id);
        }
        return await this.sessionRepository.findOneById(selectedSession.id);
    }
    //modification required
    public async updateSession(sessionId:number,newSession:ISession):Promise<SessionEntity|null>{
        const selectedSession = await this.sessionRepository.findOneById(sessionId);
        if(!selectedSession){
            console.log('session does not exist');
        }
        await this.sessionRepository.updateById(sessionId,newSession);
        // for(let answer of await selectedSession.answer){
        //     const selectedAnswer = await getConnection().createQueryBuilder()
        //         .insert().into(AnswerEntity).values(answer).execute();
        //     await getConnection().createQueryBuilder().relation(AnswerEntity,"session")
        //         .of(selectedAnswer.id).set(selectedSession.id);
        // }
        const requiredSession = await getConnection().getRepository(SessionEntity).createQueryBuilder("session")
            .leftJoinAndSelect("session.answer","answer").where("session.id = :id",{id:sessionId})
            .getOne();
        for(let i = 0;i< await requiredSession.answer.length;i++){
            await this.answerRepository.updateById(requiredSession.answer[i].id,newSession.answer[i]);
        }
        return await this.sessionRepository.findOneById(sessionId);
    }

    public async deleteSession(sessionId:number):Promise<string>{
        const selectedSession = await getConnection().getRepository(SessionEntity)
            .createQueryBuilder("session").leftJoinAndSelect("session.answer","answer")
            .where("session.id = :id",{id:sessionId})
            .getOne();
        for(let answer of await selectedSession.answer){
            await getConnection().createQueryBuilder().relation(AnswerEntity,"session")
                .of(answer.id).set(null);
        }
        await this.sessionRepository.deleteById(sessionId);
        const deletedSession = await this.sessionRepository.findOneById(sessionId);
        if(deletedSession){
            return 'delete fail';
        }else{
            return 'delete success';
        }
    }

    public async calculateScore(sessionId:number):Promise<Array<object>>{
        let result = [];
        const selectedSession = await getRepository(SessionEntity).createQueryBuilder("session")
            .leftJoinAndSelect("session.answer","answer")
            .where("session.id = :id",{id:sessionId})
            .getOne();
        const selectedDomains = await getConnection().createQueryBuilder().select().from(DomainEntity,"domain").getMany();
        // let domains = await selectedDomains.map((domain)=>{
        //     return {domain:domain.domain};
        // });
        await selectedDomains.forEach(async(domainItem)=>{
            let answersGroupByDomain = await selectedSession.answer.filter((answer)=> answer.domain === domainItem.domain);
            let domainScore:number = 0;
            // let domainResult = await answersGroupByDomain.map((item)=>{
            //     domainScore+= item.answer.point * item.weight;
            //     return {domain:domainItem.domain,score:domainScore};
            // });
            // await result.push(domainResult);
            await answersGroupByDomain.forEach((item)=>{
                domainScore += item.answer.point * item.weight;
            })
            let domainMax:number = domainItem.maxScore;
            let domainMin:number = domainItem.minScore;
            domainScore = parseFloat(((domainScore-domainMin)/(domainMax-domainMin)).toFixed(2));
            await result.push({domain:domainItem.domain,score:domainScore});
        });
        let overallScore:number = 0;
        await result.forEach((item) => {
           overallScore += item.score;
        })
        await result.push({wellnessScore:overallScore});
        return await result;
    }
}