"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const scoreCommunity_entity_1 = require("./scoreCommunity.entity");
exports.scoreCommunityProvider = {
    provide: 'ScoreCommunityRepository',
    useFactory: (connection) => connection.getRepository(scoreCommunity_entity_1.ScoreCommunityEntity),
    inject: ['TypeORMInstance']
};
//# sourceMappingURL=ScoreCommunity.providers.js.map