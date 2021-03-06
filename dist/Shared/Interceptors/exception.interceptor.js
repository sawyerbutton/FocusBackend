"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
let ExceptionInterceptor = class ExceptionInterceptor {
    intercept(dataOrRequest, context, stream$) {
        return stream$.catch((err) => Observable_1.Observable.throw(new common_2.HttpException('Exception interceptor message', common_1.HttpStatus.BAD_GATEWAY)));
    }
};
ExceptionInterceptor = __decorate([
    common_1.Interceptor()
], ExceptionInterceptor);
exports.ExceptionInterceptor = ExceptionInterceptor;
//# sourceMappingURL=exception.interceptor.js.map