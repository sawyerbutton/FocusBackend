import { Component ,Inject} from "@nestjs/common";
import {getConnection, Repository} from 'typeorm';
import { UserDemographicEntity} from "./userDemographic.entity";
import { IUserDemographicService,IUserDemographic} from "./Interfaces";
import {DemographicEntity} from "../Demographic/demographic.entity";

@Component()
export class UserDemographicService{
    constructor(
        @Inject('UserDemographicRepository') private readonly userDemographicRepository: Repository<UserDemographicEntity>
    ){}

    public async getAllUserDemographic():Promise<Array<UserDemographicEntity>>{
        return await this.userDemographicRepository.find();
    }

    public async getUserDemographic(id:number):Promise<UserDemographicEntity|null>{
        return await this.userDemographicRepository.findOneById(id);
    }

    public async addUserDemographic(userDemographic:IUserDemographic):Promise<UserDemographicEntity>{
        return await this.userDemographicRepository.save(userDemographic);
    }

    public async updateUserDemographic(id:number,newUserDemographic:IUserDemographic):Promise<UserDemographicEntity|null>{
        const userDemographic = await this.userDemographicRepository.findOneById(id);
        if(!userDemographic){
            console.log('user demographic does not exist');
        }
        await this.userDemographicRepository.updateById(id,newUserDemographic);
        return await this.userDemographicRepository.findOneById(id);
    }

    public async deleteUserDemographic(id:number):Promise<string>{
        await this.userDemographicRepository.deleteById(id);
        const userDemographic = await this.userDemographicRepository.findOneById(id);
        if(userDemographic){
            return 'delete fail';
        }else {
            return 'delete success';
        }
    }

    public async getDemographicAnswerByUserId(userId:number):Promise<Array<UserDemographicEntity>>{
        return await getConnection().getRepository(UserDemographicEntity).createQueryBuilder("userDemographic")
            .leftJoinAndSelect(DemographicEntity,"demographic","demographic.id = userDemographic.questionid")
            .where("userDemographic.userid = :id",{id:userId})
            .getMany();
    }
}