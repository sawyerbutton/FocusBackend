import * as jwt from 'jsonwebtoken';
import { Component, Inject } from '@nestjs/common';
import {SystemAdminService} from "../../SystemAdmin/systemAdmin.service";
import {StateAdminService} from "../../StateAdmin/stateAdmin.service";
import {CommunityMemberService} from "../../CommunityMembers/communityMember.service";
import {CommunityAdminService} from "../../CommunityAdmin/communityAdmin.service";
import {BhcoService} from "../../Bhco/bhco.service";

@Component()
export class AuthService {

    constructor(
        private readonly systemAdminService: SystemAdminService,
        private readonly stateAdminService:StateAdminService,
        private readonly communityMemberService:CommunityMemberService,
        private readonly communityAdminService:CommunityAdminService,
        private readonly bhcoService:BhcoService
    ) { }

    public async createToken(userInfo:any) {
        //token到期時間
        const expiresIn = 60 * 60;
        //key for token
        const secretOrKey = 'secret';
        /*
        payload不建議放淺顯易懂的敏感資料，如要放敏感資料最好有加密過，
        這邊以不重複的id作替代，對應的是資料表ID欄位。
        */
        const token = jwt.sign(userInfo, secretOrKey, {expiresIn});
        return {
            expires_in:expiresIn,
            token: token
        }
    }
    // //system admin validate
    // public async validateSystem(signedUser: object): Promise<boolean> {
    //     //給定where條件，依據token payload的ID作為where條件。
    //     let queryCondition = { where: { username: signedUser['username'] } };
    //     const user = await this.systemAdminService.getSystemAdminByUser(queryCondition);
    //     //有該筆資料，回傳true
    //     if (user) {
    //         // return user.password === payload['password'];
    //         return true;
    //     }
    //     //沒該筆資料回傳false
    //     else {
    //         return false;
    //     }
    // }
    // //system admin login validate
    // public async validateSystemAdmin(logInfo:any):Promise<boolean>{
    //     let queryCondition = { where: { username: logInfo.username } };
    //     const user = await this.systemAdminService.getSystemAdminByUser(queryCondition);
    //     // console.log(user);
    //     if(user){
    //         return user.password === logInfo.password;
    //     }else{
    //         return false;
    //     }
    // }
    //
    // //state admin validate
    // public async validateState(signedUser:object):Promise<boolean>{
    //     let queryCondition = { where: { username: signedUser['username'] } };
    //     const user = await this.stateAdminService.getStateAmdinByUser(queryCondition);
    //     if(user){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }
    // //state admin login validate
    // public async validateStateAdmin(logInfo:any):Promise<boolean>{
    //     let queryCondition = { where: { username: logInfo.username } };
    //     const user = await this.stateAdminService.getStateAmdinByUser(queryCondition);
    //     // console.log(user);
    //     if(user){
    //         return user.password === logInfo.password;
    //     }else{
    //         return false;
    //     }
    // }
    //overall function for the login validate
    public async validateLogin(logInfo:any):Promise<boolean>{
        let queryCondition = {where:{username:logInfo.username}};
        let user:any;
        switch (logInfo.role){
            case 'systemAdmin':
                user = await this.systemAdminService.getSystemAdminByUser(queryCondition);
                break;
            case 'stateAdmin':
                user = await this.stateAdminService.getStateAmdinByUser(queryCondition);
                break;
            case 'communityAdmin':
                user = await this.communityAdminService.getCommunityAdminByUser(queryCondition);
                break;
            case 'communityMember':
                user = await this.communityMemberService.getCommunityMemberByUser(queryCondition);
                break;
            case 'bhco':
                user = await this.bhcoService.getBhcoByUser(queryCondition);
                break;
        }
        if(user){
            return user.password === logInfo.password;
        }else{
            return false;
        }
    }
    //overall function for the validate
    public async validate(signedUser:object,requestRoute:string):Promise<boolean>{
        let queryCondition = { where: { username: signedUser['username'] } };
        let user:any;
        //need more discussion
        switch (signedUser['role']){
            case 'systemAdmin':
                user = await this.systemAdminService.getSystemAdminByUser(queryCondition);
                break;
            case 'stateAdmin':
                user = await this.stateAdminService.getStateAmdinByUser(queryCondition);
                break;
            case 'communityAdmin':
                user = await this.communityAdminService.getCommunityAdminByUser(queryCondition);
                break;
            case 'communityMember':
                user = await this.communityMemberService.getCommunityMemberByUser(queryCondition);
                break;
            case 'bhco':
                user = await this.bhcoService.getBhcoByUser(queryCondition);
                break;
        }
        if(user){
            return true;
        }else{
            return false;
        }
    }

}