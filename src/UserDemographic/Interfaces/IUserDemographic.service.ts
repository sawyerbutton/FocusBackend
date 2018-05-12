import {IUserDemographic} from "./IUserDemographic";
import {UserDemographicEntity} from "../userDemographic.entity";

export interface IUserDemographicService {
    getAllUserDemographic():Promise<Array<UserDemographicEntity>>;
    getUserDemographic(id:number):Promise<UserDemographicEntity|null>;
    addUserDemographic(userDemographics:Array<IUserDemographic>):Promise<boolean>;
    updateUserDemographic(id:number,newUserDemographic:IUserDemographic):Promise<UserDemographicEntity|null>;
    deleteUserDemographic(id:number):Promise<string>;
}