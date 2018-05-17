import {ISession} from "./ISession";
import {SessionEntity} from "../session.entity";

export interface ISessionService {
    getAllSession():Promise<Array<SessionEntity>>;
    getSessionByUserId(userId:number):Promise<Array<SessionEntity>>;
    getSessionById(id:number):Promise<SessionEntity|null>;
    addSession(sessionId:number,session:ISession):Promise<SessionEntity>;
    updateSession(id:number,newSession:ISession):Promise<SessionEntity|null>;
    deleteSession(id:number):Promise<Array<SessionEntity>>;
}