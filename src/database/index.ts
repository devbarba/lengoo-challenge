import IConfig from 'src/interfaces/configs';
import { createConnection, Connection } from 'typeorm';

export default async (
    database: IConfig['app']['database']
): Promise<Connection> => {
    return createConnection({
        type: database.type,
        host: database.host,
        port: database.port,
        username: database.user,
        password: database.pass,
        database: database.name,
        entities: ['./src/models/*.ts'],
        migrations: ['./src/database/migrations/*.ts'],
        cli: {
            migrationsDir: './src/database/migrations',
        },
    });
};
