import { IScoreCommunity} from "./IScoreCommunity";
import {ScoreCommunityEntity} from "../scoreCommunity.entity";

export interface IScoreCommunityService {
    getAllCommunityScore():Promise<Array<ScoreCommunityEntity>>;
    getCommunityScoreByCommunityId(communityId:number):Promise<Array<ScoreCommunityEntity>>;
    addCommunityScoreById(id:number):Promise<boolean>;
}