import { MongoConnectionOptions } from 'typeorm/driver/mongodb/MongoConnectionOptions';

export default interface IConfig {
    app: {
        env: 'development' | 'staging' | 'production';
        host: string;
        port: number;
        timezone: string;
        jwt: {
            secret: string;
            ttl: string;
        };
        redis: {
            host: string;
            port: string;
            pass: string;
        };
        database: {
            type: MongoConnectionOptions['type'];
            host: MongoConnectionOptions['host'];
            port: MongoConnectionOptions['port'];
            name: MongoConnectionOptions['database'];
            user: MongoConnectionOptions['username'];
            pass: MongoConnectionOptions['password'];
        };
    };
}
