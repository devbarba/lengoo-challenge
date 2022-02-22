import createConnection from '@database';
import Handler from '@errors/handler.error';
import IConfig from '@interfaces/configs';
import { loadQueueUi, loadCron } from '@queue';
import routes from '@routes/index';
import { autoloadConfig, getBaseDir } from '@utils/helper';
import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';

const Minio = require('minio');

class App {
    public server: Application;
    public configObject: IConfig;
    public minio: unknown;

    constructor() {
        this.loadConfigurations();
        this.server = express();
        this.middlewares();
        this.routes();
        this.mongoDatabase();
        this.minioBucket();
        this.errorHandling();
        loadCron();
        loadQueueUi(this.server);
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

    private minioBucket() {
        const minioConfigs = this.configObject.app.minio;

        this.minio = new Minio.Client({
            endPoint: minioConfigs.host,
            useSSL: false,
            accessKey: minioConfigs.user,
            secretKey: minioConfigs.pass,
        });
    }
}

export default new App();
