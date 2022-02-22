import app from '@app';
import { SubtitleStatus } from '@interfaces/subtitle';
import Subtitle from '@models/Subtitle';
import User from '@models/User';
import SubtitleService from '@services/subtitle.service';
import { Client as MinioClient } from 'minio';
import nodemailer from 'nodemailer';

class TranslationProcessJob {
    async handle(data: { id: string; fileName: string }) {
        try {
            if (data.id && data.fileName) {
                const minioClient = new MinioClient({
                    endPoint: app.configObject.app.minio.host,
                    port: 9000,
                    useSSL: false,
                    accessKey: app.configObject.app.minio.user,
                    secretKey: app.configObject.app.minio.pass,
                });

                const searchSubtitle = await Subtitle.findById(data.id);
                const searchUser = await User.findById(searchSubtitle?._user);

                if (
                    searchSubtitle &&
                    searchSubtitle.status === SubtitleStatus.PENDING &&
                    searchUser
                ) {
                    let subtitleFileData;
                    minioClient.getObject(
                        app.configObject.app.minio.bucket,
                        data.fileName,
                        (err, stream) => {
                            stream.on('data', (chunk) => {
                                subtitleFileData += chunk;
                            });
                            stream.on('end', async () => {
                                const regex = /(\d*?)\s\[(.*?)\]\s(.*?)$/gm;
                                const subtitleLines =
                                    subtitleFileData.split('\n');

                                const subtitleService = new SubtitleService();
                                const subtitlesTranslated =
                                    await subtitleService.translate(
                                        {
                                            source: searchSubtitle.sourceLanguage,
                                            target: searchSubtitle.targetLanguage,
                                        },
                                        subtitleLines.map((subtitleLine) => {
                                            return subtitleLine.split(regex);
                                        })
                                    );

                                const transporter = nodemailer.createTransport({
                                    // @ts-ignore
                                    host: app.configObject.app.mailhog.host,
                                    port: app.configObject.app.mailhog.port,
                                    from: app.configObject.app.mailhog.from,
                                });

                                await transporter.sendMail({
                                    from: `Lengoo < ${app.configObject.app.mailhog.from} >`,
                                    to: searchUser.email,
                                    subject: `Lengoo translations report!`,
                                    text: `Hi ${searchUser.name}, here is your translations from Lengoo!`,
                                    attachments: [
                                        {
                                            filename: 'lengoo-translations.txt',
                                            content: Buffer.from(
                                                String(
                                                    subtitlesTranslated
                                                        .map((sub) => {
                                                            return `${sub.id} [${sub.range}] ${sub.translation} \n`;
                                                        })
                                                        .join('')
                                                )
                                            ),
                                        },
                                    ],
                                });

                                await Subtitle.updateOne(
                                    { _id: searchSubtitle._id },
                                    { $set: { status: SubtitleStatus.SENT } }
                                );
                            });
                        }
                    );
                }
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export default new TranslationProcessJob().handle;
