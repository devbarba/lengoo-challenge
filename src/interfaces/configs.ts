import { ClientOptions } from 'minio';

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
        minio: {
            host: ClientOptions['endPoint'];
            user: ClientOptions['accessKey'];
            pass: ClientOptions['secretKey'];
            bucket: string;
        };
        mailhog: {
            host: string;
            port: string;
            from: string;
        };
        database: {
            host: string;
            port: string;
            name: string;
            user: string;
            pass: string;
        };
    };
}
