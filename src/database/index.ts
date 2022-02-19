import { createConnection, Connection, ConnectionOptions } from 'typeorm';

import IConfig from '../interfaces/configs';
import User from '../models/User';

export default async (
    database: IConfig['app']['database']
): Promise<Connection> => {
    const options: ConnectionOptions = {
        name: 'default',
        logging: true,
        synchronize: true,
        type: database.type,
        host: database.host,
        port: database.port,
        username: database.user,
        password: database.pass,
        database: database.name,
        entities: [User],
    };

    return createConnection(options);
};
