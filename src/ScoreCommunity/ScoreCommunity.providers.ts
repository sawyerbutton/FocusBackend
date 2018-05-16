import {Connection} from "typeorm";
import {ScoreCommunityEntity} from "./scoreCommunity.entity";

export const scoreCommunityProvider = {
    provide:'ScoreCommunityRepository',
    useFactory:(connection:Connection) => connection.getRepository(ScoreCommunityEntity),
    inject:['TypeORMInstance']
}