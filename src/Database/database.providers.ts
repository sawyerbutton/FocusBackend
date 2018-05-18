import { createConnection } from 'typeorm';

export const databaseProviders = [
    {
        provide: 'TypeORMInstance',
        useFactory: async () => await createConnection({
            type: 'postgres',
            host: 'ec2-54-243-137-182.compute-1.amazonaws.com',
            port: 5432,
            username: "nlnydvzkgdaopy",
            password: "9de0ca8a31119755a02bfe66e4eeacf6bd5b269737ebadad89fc9e0ab4003bb5",
            database: 'd2lenjlgeq0nqh',
            url:'postgres://nlnydvzkgdaopy:9de0ca8a31119755a02bfe66e4eeacf6bd5b269737ebadad89fc9e0ab4003bb5@ec2-54-243-137-182.compute-1.amazonaws.com:5432/d2lenjlgeq0nqh',
            entities: [
                __dirname + '/../**/*.entity{.ts,.js}',
            ],
            logging:true,
            synchronize:true
        }),
    }
]