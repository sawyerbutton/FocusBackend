import { Repository } from 'typeorm';
import { Component ,Inject} from "@nestjs/common";
import { SystemAdminEntity} from "./systemAdmin.entity";
import { ISystemAdmin,ISystemAdminService} from "./Interfaces";


@Component()
export class SystemAdminService implements ISystemAdminService{
    constructor(
        @Inject('SystemAdminRepository') private readonly systemAdminRepository :Repository<SystemAdminEntity>
    ){}

    public async getAllSystemAdmin():Promise<Array<SystemAdminEntity>>{
        return await this.systemAdminRepository.find();
    }

    public async getSystemAdmin(id:number):Promise<SystemAdminEntity | null>{
        return await this.systemAdminRepository.findOneById(id);
    }

    public async getSystemAdminByUser(options: Object):Promise<SystemAdminEntity|null>{
        return await this.systemAdminRepository.findOne(options);
    }

    public async addSystemAdmin(systemAdmin:ISystemAdmin):Promise<SystemAdminEntity>{
        return await  this.systemAdminRepository.save(systemAdmin);
    }

    public async updateSystemAdmin(id:number,newSystemAdmin:ISystemAdmin):Promise<SystemAdminEntity|null>{
        const systemAdmin = await this.systemAdminRepository.findOneById(id);
        if(!systemAdmin){
            console.log("system admin does not exist");
        }else{
            await this.systemAdminRepository.updateById(id,newSystemAdmin);
            return await this.systemAdminRepository.findOneById(id);
        }
    }

    public async deleteSystemAdmin(id:number):Promise<string>{
        await this.systemAdminRepository.deleteById(id);
        const systemAdmin = await this.systemAdminRepository.findOneById(id);
        if(!systemAdmin){
            return 'delete success';
        }else{
            return 'delete fail';
        }
    }
}