import { Component ,Inject} from "@nestjs/common";
import { Repository } from 'typeorm';
import { StateEntity} from "./state.entity";
import { IState,IStateService} from "./Interfaces";
// import {async} from "rxjs/scheduler/async";

@Component()
export class StateService implements IStateService{
    constructor(
        @Inject('StateRepository') private readonly stateRepository:Repository<StateEntity>
    ){}

    public async getAllState():Promise<Array<StateEntity>>{
        return await this.stateRepository.find();
    }
    public async getState(id:number):Promise<StateEntity | null>{
        return await this.stateRepository.findOneById(id);
    }
    public async addState(state:IState):Promise<StateEntity>{
        return await this.stateRepository.save(state);
    }

    public async addAllState(state:IState[]){
        await state.forEach(async(state)=> {
            await this.stateRepository.save(state);
        })
    }

    public async updateState(id:number,newState:IState):Promise<StateEntity>{
        const state = await this.stateRepository.findOneById(id);
        if(!state){
            console.log('state does not exist');
        }
        await this.stateRepository.updateById(id,newState);
        return await this.stateRepository.findOneById(id);
    }
    public async deleteState(id:number):Promise<string>{
        await this.stateRepository.deleteById(id);
        const state = await this.stateRepository.findOneById(id);
        if(state){
            return 'delete fail';
        }else{
            return 'delete success';
        }
    }
}