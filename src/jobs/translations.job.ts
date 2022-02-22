import app from '@app';
import Subtitle from '@models/Subtitle';
import { Client as MinioClient } from 'minio';

class TranslationProcessJob {
    async handle(subtitles: any) {
        try {
            // const minioClient = new MinioClient({
            //     endPoint: app.configObject.app.minio.host,
            //     port: 9000,
            //     useSSL: false,
            //     accessKey: app.configObject.app.minio.user,
            //     secretKey: app.configObject.app.minio.pass,
            // });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new TranslationProcessJob().handle;
