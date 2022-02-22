import createConnection from '@database';
import Handler from '@errors/handler.error';
import IConfig from '@interfaces/configs';
import Queue from '@queue';
import routes from '@routes/index';
import { autoloadConfig, getBaseDir } from '@utils/helper';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import kue from 'kue';
import kueUi from 'kue-ui';

class App {
    public server: Application;
    public configObject: IConfig;
    public queue: typeof Queue;

    constructor() {
        this.loadConfigurations();
        this.server = express();
        this.middlewares();
        this.routes();
        this.mongoDatabase();
        this.errorHandling();
        this.queue = Queue;
    }

    private loadConfigurations() {
        this.configObject = autoloadConfig(getBaseDir());
    }

    private middlewares() {
        this.server.use(cors());
        this.server.use(bodyParser.json({ limit: '4mb' }));
        this.server.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        this.server.use('/queues/', kueUi.app);
        this.server.use('/queues/api', kue.app);
        kueUi.setup({
            apiURL: '/queues/api',
            baseURL: '/queues',
        });
    }

    private routes() {
        this.server.use('/api', routes);
    }

    private mongoDatabase() {
        createConnection(this.configObject.app.database);
    }

    private errorHandling() {
        this.server.use((error, req, res, next) => {
            if (error instanceof Handler) {
                return res.status(error.getStatusCode()).json({
                    msg: error.getMessage(),
                });
            }

            return res.status(500).json({
                msg: error.message,
            });
        });
    }
}

export default new App();
