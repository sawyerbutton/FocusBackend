import { Component ,Inject} from "@nestjs/common";
import {getRepository, Repository} from 'typeorm';
import { ICommunityAdmin,ICommunityService} from "./Interfaces";
import { CommunityAdminEntity} from "./communityAdmin.entity";
import {CommunityEntity} from "../Community/community.entity";
import {CityEntity} from "../City/city.entity";
import {CountyEntity} from "../County/county.entity";
import {StateEntity} from "../State/state.entity";

@Component()
export class CommunityAdminService implements ICommunityService{
    constructor(
        @Inject('CommunityAdminRepository') private readonly communityAdminRepository: Repository<CommunityAdminEntity>
    ){}

    public async getAllCommunityAdmin():Promise<Array<CommunityAdminEntity>>{
        return await this.communityAdminRepository.find();
    }

    public async getCommunityAdminByUser(options:object):Promise<CommunityAdminEntity|null>{
        return await this.communityAdminRepository.findOne(options);
    }

    public async getCommunityAdmin(id:number):Promise<CommunityAdminEntity | null>{
        return await this.communityAdminRepository.findOneById(id);
    }

    public async getCommunityAdminByState(stateId:number):Promise<Array<CommunityAdminEntity>>{
        const selectedState = await getRepository(StateEntity).findOne({id:stateId});
        return await this.communityAdminRepository.find({state:selectedState.state});
    }

    public async addCommunityAdmin(communityAdmin:ICommunityAdmin): Promise<CommunityAdminEntity>{
        return await this.communityAdminRepository.save(communityAdmin);
    }

    public async updateCommunityAdmin(id:number,newCommunityAdmin:ICommunityAdmin): Promise<CommunityAdminEntity | null>{
        const communityAdmin = await this.communityAdminRepository.findOneById(id);
        if(!communityAdmin){
            console.log('community admin does not exist');
        }
        await this.communityAdminRepository.updateById(id,newCommunityAdmin);
        return this.communityAdminRepository.findOneById(id);

    }

    public async deleteCommunityAdmin(id:number):Promise<string>{
        await this.communityAdminRepository.deleteById(id);
        const communityAdmin = await this.communityAdminRepository.findOneById(id);
        if(!communityAdmin){
            return 'delete success';
        }else{
            return 'delete fail';
        }
    }

    public async getCommunityRelatedInfo(communityId:number):Promise<object>{
        const selectedCommunity = await getRepository(CommunityEntity)
            .createQueryBuilder("community").leftJoinAndSelect("community.city","city")
            .where("community.id = :id",{id:communityId}).getOne();
        const community = await selectedCommunity.community;
        // return await selectedCommunity;
        const selectedCity = await getRepository(CityEntity)
            .createQueryBuilder("city").leftJoinAndSelect("city.county","county")
            .where("city.id = :id",{id:selectedCommunity.city.id}).getOne();
        const city = await selectedCity.city;
        const selectedCounty = await getRepository(CountyEntity)
            .createQueryBuilder("county").leftJoinAndSelect("county.state","state")
            .where("county.id = :id",{id:selectedCity.county.id}).getOne();
        const county = await selectedCounty.county;
        const selectedState = await getRepository(StateEntity)
            .createQueryBuilder("state").where("state.id = :id",{id:selectedCounty.state.id}).getOne();
        const state = await selectedState.state;
        return await {community,city,county,state};
    }
}