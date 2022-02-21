import { getEnv } from '@utils/helper';
import * as dotenv from 'dotenv-safe';

dotenv.config();

export default {
    env: getEnv('NODE_EV', 'local'),
    host: getEnv('APP_HOST', '0.0.0.0'),
    port: getEnv('APP_PORT', 3000),
    timezone: getEnv('TZ', 'Europe/Rome'),
    jwt: {
        secret: getEnv('JWT_SECRET', '', true),
        ttl: getEnv('JWT_TTL', '', true),
    },
    redis: {
        host: getEnv('REDIS_HOST', '', true),
        port: getEnv('REDIS_PORT', '', true),
        pass: getEnv('REDIS_PASS', '', true),
    },
    minio: {
        host: getEnv('MINIO_HOST', '', true),
        user: getEnv('MINIO_ROOT_USER', '', true),
        pass: getEnv('MINIO_ROOT_PASSWORD', '', true),
        bucket: getEnv('MINIO_BUCKET', '', true),
    },
    mailhog: {
        host: getEnv('MAILHOG_HOST', '', true),
        port: getEnv('MAILHOG_SMTP_PORT', '', true),
        from: getEnv('MAILHOG_FROM', '', true),
    },
    database: {
        host: getEnv('MONGO_HOST', '', true),
        port: getEnv('MONGO_PORT', '', true),
        name: getEnv('MONGO_DB_NAME', '', true),
        user: getEnv('MONGO_USER', '', true),
        pass: getEnv('MONGO_PASS', '', true),
    },
};
