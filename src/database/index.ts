import mongoose from 'mongoose';

import IConfig from '../interfaces/configs';

export default async (database: IConfig['app']['database']): Promise<void> => {
    mongoose
        .connect(`mongodb+srv://${database.host}`, {
            dbName: database.name,
            user: database.user,
            pass: database.pass,
        })
        .catch(() => process.exit(1));
};
