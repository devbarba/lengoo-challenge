const defaultPayload = {
    source: "I am Arwen - I've come to help you.",
    target: 'Ich bin Arwen - Ich bin gekommen, um dir zu helfen.',
    sourceLanguage: 'en',
    targetLanguage: 'de',
};

const missingKeysPayload = {
    source: "I am Arwen - I've come to help you.",
    targetLanguage: 'de',
};

const validationResponses = [
    'is not allowed',
    'is required',
    'must be a string',
    'length must be less than or equal to 2 characters long',
    'must be an array',
];

export { defaultPayload, missingKeysPayload, validationResponses };
