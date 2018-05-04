import { Component ,Inject} from "@nestjs/common";
import { CommunityMemberEntity } from "./communityMember.entity";
import { Repository,getConnection,getRepository } from 'typeorm';
import { ICommunityMemberService, ICommunityMember,CommunityRelatedInfo} from "./Interfaces/index";
import { StateEntity} from "../State/state.entity";
import { CommunityEntity} from "../Community/community.entity";
import {CityEntity} from "../City/city.entity";
import {CountyEntity} from "../County/county.entity";
import {BhcoEntity} from "../Bhco/bhco.entity";

@Component()
export class CommunityMemberService implements ICommunityMemberService{

    constructor(
        @Inject('CommunityMemberRepository') private readonly communityMemberRepository: Repository<CommunityMemberEntity>
    ){}

    public async getAllCommunityMember(): Promise<Array<CommunityMemberEntity>>{
        return await getRepository(CommunityMemberEntity).createQueryBuilder("communityMember")
            .innerJoinAndSelect("communityMember.community","community")
            .getMany();
    }

    public async getCommunityMemberByUser(options:object):Promise<CommunityMemberEntity|null>{
        return await this.communityMemberRepository.findOne(options);
    }

    public async getAllCommunityMemberByState(stateId:number):Promise<Array<CommunityMemberEntity>>{
        //stupid version but workable
        const selectedState = await getRepository(StateEntity).findOne({id:stateId});
        const communityMembers = await getRepository(CommunityMemberEntity).createQueryBuilder("communityMember")
            .innerJoinAndSelect("communityMember.community","community")
            .where("communityMember.state = :state",{state:selectedState.state})
            .getMany();
        return communityMembers;
        // return await this.communityMemberRepository.find({state:selectedState.state});
        //fancy version

    }

    public async getAllCommunityMemberByCommunity(communityId:number):Promise<Array<CommunityMemberEntity>>{
        // const selectedCommunity = await getRepository(CommunityEntity).findOne({id:communityId});
        const communityMembers = await getRepository(CommunityMemberEntity).createQueryBuilder("communityMember")
            .innerJoinAndSelect("communityMember.community","community")
            .where("communityMember.community = :community",{community:communityId}).getMany();
        return communityMembers;
        // return await this.communityMemberRepository.find({where:{community:communityId}});
    }

    public async getAllCommunityMemberByBhco(bhcoId:number):Promise<Array<CommunityMemberEntity>>{
        const selectedBhco = await getRepository(BhcoEntity).createQueryBuilder("bhco")
            .leftJoinAndSelect("bhco.communityMember","communityMember")
            .where("bhco.id = :id",{id:bhcoId})
            .getOne();
        return await selectedBhco.communityMember;
    }

    public async getUnAssignedCommunityMember(communityId:number):Promise<Array<CommunityMemberEntity>>{
        const unAssignedCommunityMember = await getRepository(CommunityMemberEntity)
            .createQueryBuilder("communityMember")
            .where("communityMember.assigned = :assigned AND communityMember.community = :community",{assigned:false,community:communityId})
            .getMany();

        return unAssignedCommunityMember;
    }

    public async getAssignedCommunityMember(communityId:number):Promise<Array<CommunityMemberEntity>>{
        const AssignedCommunityMember = await getRepository(CommunityMemberEntity)
            .createQueryBuilder("communityMember")
            .innerJoinAndSelect("communityMember.bhco","bhco")
            .where("communityMember.assigned = :assigned AND communityMember.community = :community",{assigned:true,community:communityId})
            .getMany();

        return AssignedCommunityMember;
    }

    public async getCommunityMember(id:number): Promise<CommunityMemberEntity | null>{
        return await this.communityMemberRepository.findOneById(id);
    }

    public async addCommunityMember(communityMember: ICommunityMember){
        //below is save action
        const selectedCommunityMember = await this.communityMemberRepository.save(communityMember);
        await getConnection().createQueryBuilder().relation(CommunityMemberEntity,"community").of(selectedCommunityMember.id).set(communityMember.community);
    }


    public async assignCommunityMember(bhcoID:number,communityMemberIDs:any){
        for(let communityMemberID of communityMemberIDs){
            await getConnection().createQueryBuilder().relation(CommunityMemberEntity,"bhco").of(communityMemberID).set(bhcoID);
            await getConnection().createQueryBuilder().update(CommunityMemberEntity).set({assigned:true}).where("id = :id",{id:communityMemberID}).execute();
        }
        // return await this.getUnAssignedCommunityMember();
    }

    public async unAssignCommunityMember(communityMemberIDs:any){
        for(let communityMemberID of communityMemberIDs){
            await getConnection().createQueryBuilder().relation(CommunityMemberEntity,"bhco").of(communityMemberID).set(null);
            await getConnection().createQueryBuilder().update(CommunityMemberEntity).set({assigned:false}).where("id = :id",{id:communityMemberID}).execute();
        }
        // return await this.getAssignedCommunityMember();
    }

    public async updateCommunityMember(id:number,newCommunityMember: ICommunityMember): Promise<CommunityMemberEntity | null>{
        const communityMember = await this.communityMemberRepository.findOneById(id);
        if(!communityMember.id){
            console.log("community member does not exist");
        }
        await this.communityMemberRepository.updateById(id,newCommunityMember);
        return await this.communityMemberRepository.findOneById(id);
    }

    public async deleteCommunityMember(id:number): Promise<string>{
        await this.communityMemberRepository.deleteById(id);
        const communityMember = await this.communityMemberRepository.findOneById(id);
        if(!communityMember){
            return 'delete success';
        }
        else{
            return 'delete fail';
        }
    }

}