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
        database: {
            type: string;
            host: string;
            port: string;
            name: string;
            user: string;
            pass: string;
        };
    };
}
