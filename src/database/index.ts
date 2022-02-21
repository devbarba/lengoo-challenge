import mongoose from 'mongoose';

import IConfig from '../interfaces/configs';

export default (database: IConfig['app']['database']): void => {
    mongoose
        .connect(
            `mongodb://${database.user}:${database.pass}@${database.host}/${database.name}`,
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .catch(() => process.exit(1));
};
