import { Component ,Inject} from "@nestjs/common";
import { Repository } from 'typeorm';
import { UserDemographicEntity} from "./userDemographic.entity";
import { IUserDemographicService,IUserDemographic} from "./Interfaces";
import {async} from "rxjs/scheduler/async";

@Component()
export class UserDemographicService implements IUserDemographicService{
    constructor(
        @Inject('UserDemographicRepository') private readonly userDemographicRepository: Repository<UserDemographicEntity>
    ){}

    public async getAllUserDemographic():Promise<Array<UserDemographicEntity>>{
        return await this.userDemographicRepository.find();
    }

    public async getUserDemographic(id:number):Promise<UserDemographicEntity|null>{
        return await this.userDemographicRepository.findOneById(id);
    }

    public async addUserDemographic(userDemographics:Array<IUserDemographic>):Promise<boolean>{
        await userDemographics.forEach(async(userDemographic)=>{
            await this.userDemographicRepository.save(userDemographic);
        });
        return true;
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
}