import { Guard, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { Reflector } from '@nestjs/core';

@Guard()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(req, context: ExecutionContext): boolean {
        // {
        //     "statusCode": 403,
        //     "message": "Forbidden resource"
        // }
        // return false;
        const { parent, handler} = context;
        const roles = this.reflector.get<string[]>('roles', handler);
        if(!roles){
            return true;
        }
        //req should be in session or token
        // req.user = { "account": "Ted", "roles": ["systemAdmin"] };
        // const user = req.user;
        // const hasRole = () => !!user.roles.find((role) => !!roles.find((item) => item === role));
        // return user && user.roles && hasRole();
        //req now can fix the roles guard problem
        const user = req.user;
        const hasRole = () => !!roles.find((item)=> item === user.role);
        return user && user.role && hasRole();
    }
}