import { Repository } from 'typeorm';
import { Component ,Inject} from "@nestjs/common";
import { StateAdminEntity} from "./stateAdmin.entity";
import {IStateAdmin,IStateAdminService} from "./Interfaces";

@Component()
export class StateAdminService implements IStateAdminService{
    constructor(
        @Inject('StateAdminRepository') private readonly stateAdminRepository: Repository<StateAdminEntity>
    ){}

    public async getAllStateAdmin():Promise<Array<StateAdminEntity>>{
        return await this.stateAdminRepository.find();
    }

    public async getStateAdmin(id:number):Promise<StateAdminEntity | null>{
        return await this.stateAdminRepository.findOneById(id);
    }

    public async getStateAmdinByUser(options: Object):Promise<StateAdminEntity|null>{
        return await this.stateAdminRepository.findOne(options);
    }

    public async addStateAdmin(stateAdmin:IStateAdmin):Promise<StateAdminEntity>{
        return await this.stateAdminRepository.save(stateAdmin);
    }

    public async updateStateAdmin(id:number,newStateAdmin: IStateAdmin): Promise<StateAdminEntity | null>{
        const stateAdmin = await this.stateAdminRepository.findOneById(id);
        if(!stateAdmin){
            console.log('state admin does not exist');
        }
        else{
           await this.stateAdminRepository.updateById(id,newStateAdmin);
           return this.stateAdminRepository.findOneById(id);
        }
    }

    public async deleteStateAdmin(id:number):Promise<string>{
        await this.stateAdminRepository.deleteById(id);
        const stateAdmin = await this.stateAdminRepository.findOneById(id);
        if(!stateAdmin){
            return 'delete success';
        }
        else{
            return 'delete fail';
        }
    }

}