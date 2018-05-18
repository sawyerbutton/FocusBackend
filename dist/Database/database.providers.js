"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
exports.databaseProviders = [
    {
        provide: 'TypeORMInstance',
        useFactory: () => __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.createConnection({
                type: 'postgres',
                host: 'ec2-54-243-137-182.compute-1.amazonaws.com',
                port: 5432,
                username: "nlnydvzkgdaopy",
                password: "9de0ca8a31119755a02bfe66e4eeacf6bd5b269737ebadad89fc9e0ab4003bb5",
                database: 'd2lenjlgeq0nqh',
                url: 'postgres://nlnydvzkgdaopy:9de0ca8a31119755a02bfe66e4eeacf6bd5b269737ebadad89fc9e0ab4003bb5@ec2-54-243-137-182.compute-1.amazonaws.com:5432/d2lenjlgeq0nqh',
                entities: [
                    __dirname + '/../**/*.entity{.ts,.js}',
                ],
                logging: true,
                synchronize: true
            });
        }),
    }
];
//# sourceMappingURL=database.providers.js.map