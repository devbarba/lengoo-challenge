import app from '@app';
import Subtitle from '@models/Subtitle';
import { Client as MinioClient } from 'minio';

class SubtitleUploadJob {
    async handle(subtitles: any) {
        try {
            const minioClient = new MinioClient({
                endPoint: app.configObject.app.minio.host,
                port: 9000,
                useSSL: false,
                accessKey: app.configObject.app.minio.user,
                secretKey: app.configObject.app.minio.pass,
            });

            const fileName = `${Date.now()}-${subtitles.file.originalname}`;
            await minioClient.putObject(
                app.configObject.app.minio.bucket,
                fileName,
                Buffer.from(subtitles.file.buffer.data)
            );

            await Subtitle.create({
                ...subtitles,
                status: 'pending',
                file: fileName,
            });
        } catch (error) {
            console.log(error);
        }
    }
}

export default new SubtitleUploadJob().handle;
