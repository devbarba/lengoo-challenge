import app from '@app';
import { ISubtitle, SubtitleStatus } from '@interfaces/subtitle';
import Subtitle from '@models/Subtitle';
import { Queue } from '@queue';
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

            const subtitle: ISubtitle = await Subtitle.create({
                ...subtitles,
                status: SubtitleStatus.PENDING,
                file: fileName,
            });

            Queue.create('translation_process', {
                id: String(subtitle._id),
                fileName,
            })
                .removeOnComplete(true)
                .attempts(3)
                .delay(1000)
                .save();
        } catch (error) {
            await Subtitle.create({
                ...subtitles,
                status: SubtitleStatus.FAILED,
                file: `${Date.now()}-${subtitles.file.originalname}`,
            });
        }
    }
}

export default new SubtitleUploadJob().handle;
