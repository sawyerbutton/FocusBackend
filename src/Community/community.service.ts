import { Component ,Inject} from "@nestjs/common";
import { Repository,getRepository,getConnection } from 'typeorm';
import {CommunityEntity} from "./community.entity";
import { ICommunity,ICommunityService} from "./Interfaces";

@Component()
export class CommunityService implements ICommunityService{
    constructor(
        @Inject('CommunityRepository') private readonly communityRepository: Repository<CommunityEntity>
    ){}

    public async getAllCommunity():Promise<Array<CommunityEntity>>{
        return await this.communityRepository.find();
    }
    public async getCommunity(id:number):Promise<CommunityEntity|null>{
        return await this.communityRepository.findOneById(id);
    }

    public async addCommunity(InCommunity: ICommunity):Promise<CommunityEntity>{
        await this.communityRepository.save(InCommunity);
        const requestCommunity:ICommunity = await this.communityRepository.findOne({community:InCommunity.community});
        await getConnection().createQueryBuilder().relation(CommunityEntity,"city").of(requestCommunity.id).set(InCommunity.city);
        return await this.communityRepository.findOneById(requestCommunity.id)
    }
    public async updateCommunity(id:number,newCommunity:ICommunity):Promise<CommunityEntity|null>{
        const community = await this.communityRepository.findOneById(id);
        if(!community){
            console.log('community does not exist');
        }
        await this.communityRepository.updateById(id,newCommunity);
        return await this.communityRepository.findOneById(id);
    }
    public async deleteCommunity(id:number):Promise<string>{
        await this.communityRepository.deleteById(id);
        const community = await this.communityRepository.findOneById(id);
        if(community){
            return 'delete fail';
        }else{
            return 'delete success';
        }
    }

    public async getCommunityByCity(id:number):Promise<Array<CommunityEntity>>{
        const selectedCommunity = await getRepository(CommunityEntity)
            .createQueryBuilder("community")
            .leftJoinAndSelect("community.city","city")
            .where("city.id = :name",{name:id})
            .getMany();

        return selectedCommunity;
    }
}