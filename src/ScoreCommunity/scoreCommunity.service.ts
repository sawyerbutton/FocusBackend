import { Component, Inject} from "@nestjs/common";
import { IScoreCommunity,IScoreCommunityService} from "./Interfaces";
import { ScoreCommunityEntity} from "./scoreCommunity.entity";
import {getConnection, getRepository, Repository} from "typeorm";
import {CommunityMemberEntity} from "../CommunityMembers/communityMember.entity";
import {SessionEntity} from "../Session/session.entity";
import {DomainEntity} from "../DomainForQuestionnaire/Domain/domain.entity";

@Component()
export class ScoreCommunityService implements IScoreCommunityService{
    constructor(
        @Inject('ScoreCommunityRepository') private readonly scoreCommunityRepository:Repository<ScoreCommunityEntity>
    ){}

    public async getAllCommunityScore():Promise<Array<ScoreCommunityEntity>>{
        return await this.scoreCommunityRepository.find();
    }
    public async getCommunityScoreByCommunityId(id:number):Promise<Array<ScoreCommunityEntity>>{
        return await this.scoreCommunityRepository.find({where:{communityId:id}});
    }

    public async addCommunityScoreById(id:number):Promise<boolean>{
        //get all community member belongs to selected community
        const selectedCommunityMembers = await getRepository(CommunityMemberEntity).createQueryBuilder("communityMember")
            .innerJoinAndSelect("communityMember.community","community")
            .where("communityMember.community = :community",{community:id}).getMany();
        let communityScore: object[] = [];
        const selectedDomains = await getConnection().getRepository(DomainEntity).createQueryBuilder("domain").getMany();
        await selectedDomains.forEach((domain) => {
            let temp = {domain:domain.domain,score:0};
            communityScore.push(temp);
        })
        await selectedCommunityMembers.forEach(async(communityMember) => {
            const selectedSession = await getConnection().getRepository(SessionEntity).createQueryBuilder("session")
                .where("userid = :id",{id:communityMember.id})
                .orderBy("session.id","DESC").limit(1).getOne();

            let result = [];

            await selectedDomains.forEach((domainItem)=>{
                // console.log(domainItem);
                let answersGroupByDomain =  selectedSession.answer.filter((answer)=> answer.domain === domainItem.domain);
                // console.log(answersGroupByDomain);
                //correct
                let domainScore:number = 0;

                answersGroupByDomain.forEach((item)=>{
                    domainScore += item.answer.point * item.weight;
                    // console.log(domainScore);
                })

                let domainMax:number = domainItem.maxScore;
                let domainMin:number = domainItem.minScore;
                domainScore = parseFloat(((domainScore-domainMin)/(domainMax-domainMin)).toFixed(2));
                // console.log(domainScore);
                domainScore = domainScore<0?0:domainScore;
                result.push({domain:domainItem.domain,score:domainScore});
            });
            let overallScore:number = 0;
            await result.forEach((item) => {
                overallScore += item.score;
            })
            await result.push({domain:'WellnessScore',score:overallScore});
            await function () {
                for(let i = 0; i< communityScore.length;i++){
                    communityScore[i]['score'] += result[i]['score'];
                }
            }

        })
        await getConnection()
            .createQueryBuilder()
            .insert()
            .into(ScoreCommunityEntity).values({
                communityId:id,
                createDate:'',
                score:communityScore
            }).execute();

        return true;
    }
}