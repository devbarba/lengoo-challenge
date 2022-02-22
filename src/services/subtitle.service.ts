import Translation from '@models/Translation';

interface ISubtitleService {
    translate(
        languages: { source: string; target: string },
        subtitles: string[]
    ): Promise<{ id: string; range: string; translation: string }[]>;
}

class SubtitleService implements ISubtitleService {
    public async translate(
        languages: { source: string; target: string },
        subtitles: string[]
    ): Promise<{ id: string; range: string; translation: string }[]> {
        const allTranslations = Promise.all(
            subtitles.map(async (subtitle) => {
                // @ts-ignore
                const translation = await Translation.fuzzySearch(subtitle[3], {
                    sourceLanguage: { $eq: languages.source },
                    targetLanguage: { $eq: languages.target },
                });

                return {
                    id: subtitle[1],
                    range: subtitle[2],
                    translation: String(
                        translation.length > 0
                            ? translation[0].target
                            : subtitle[3]
                    ),
                };
            })
        );

        return allTranslations;
    }
}

export default SubtitleService;
