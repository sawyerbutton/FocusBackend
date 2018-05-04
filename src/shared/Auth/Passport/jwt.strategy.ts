import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Inject } from '@nestjs/common';
import { AuthService } from '../auth.service';
import {async} from "rxjs/scheduler/async";

@Component()
export class JwtStrategy extends Strategy {
    constructor(private readonly authService: AuthService) {
        super({
                //用來帶入驗證的函式
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                //設成true就可以在verify的callback中使用
                passReqToCallback: true,
                secretOrKey: 'secret',
            },
            async (req, payload, next) => await this.verify(req, payload, next),
        );
        passport.use(this);
    }

    public async verify(req, payload, done) {
        //呼叫authService.validate()，會去撈表確認有無資料
        const requestRoute = req.originalUrl.substring(1);
        req.authInfo = payload;
        const isValid = await this.authService.validate(payload,requestRoute);
        if (!isValid) {
            return done('Unauthorized', false);
        }
        done(null, payload);
    }
}