import app from '@app';
import createConnection from '@database';
import SubtitleService from '@services/subtitle.service';
import * as dotenv from 'dotenv-safe';
import mongoose from 'mongoose';

describe('Testing SubtitleService', () => {
    let subtitleService: SubtitleService;

    beforeAll(async () => {
        dotenv.config();
        createConnection(app.configObject.app.database);
        subtitleService = new SubtitleService();
    }, 20000);

    afterAll(async () => {
        await mongoose.disconnect();
    });

    test('should retrieve data fuzzed from mongoDB', async () => {
        const records = await subtitleService.translate(
            {
                source: 'en',
                target: 'de',
            },
            [
                [
                    '',
                    '1',
                    '00:00:12.00 - 00:01:20.00',
                    "I am Arwen - I've come to help you.",
                    '',
                ],
            ]
        );

        expect(records).toBeDefined();
        expect(records.length).toBeGreaterThan(0);
        expect(records).toMatchObject(
            {} as Promise<{ id: string; range: string; translation: string }[]>
        );
        expect.assertions(3);
    });
});
