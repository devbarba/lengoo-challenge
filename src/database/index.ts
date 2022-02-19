import IConfig from 'src/interfaces/configs';
import {
    createConnection,
    Connection,
    ConnectionOptions,
    getConnection,
} from 'typeorm';

export default async (
    database: IConfig['app']['database']
): Promise<Connection> => {
    const options: ConnectionOptions = {
        logging: true,
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
    };

    if (process.env.NODE_ENV === 'production') {
        try {
            return getConnection(options.name);
        } catch (error) {
            return createConnection(options);
        }
    } else {
        try {
            await getConnection(options.name).close();
            return createConnection(options);
        } catch (error) {
            return createConnection(options);
        }
    }
};
