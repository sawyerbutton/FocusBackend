import { Controller, Post, HttpStatus, HttpCode, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    //test for system admin login
    // @Post('systemAdminLogin')
    // public async systemLogin(@Body() logInfo:any){
    //     const msg =  await this.authService.validateSystemAdmin(logInfo);
    //     // console.log(msg);
    //     if(msg){
    //         return await this.authService.createToken(logInfo);
    //     }else{
    //         return 'log fail'
    //     }
    // }
    // //test for state admin login
    // @Post('stateAdminLogin')
    // public async stateLogin(@Body() logInfo:any){
    //     const msg = await this.authService.validateStateAdmin(logInfo);
    //     if(msg){
    //         return await this.authService.createToken(logInfo);
    //     }else{
    //         return 'username or password not correct';
    //     }
    // }
    //overall login function for several user return token
    @Post('Login')
    public async login(@Body() logInfo:any){
        const msg = await this.authService.validateLogin(logInfo);
        if(msg){
            return await this.authService.createToken(logInfo);
        }else{
            return 'username or password not correct';
        }
    }
}