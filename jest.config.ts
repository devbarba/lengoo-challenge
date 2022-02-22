export default {
    testEnvironment: 'node',
    testTimeout: 20000,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: ['src/**'],
    modulePathIgnorePatterns: [
        'dist',
        'src/interfaces',
        'src/server.ts',
        'src/__tests__/__mocks__',
        'src/@types',
        'src/utils/import.ts',
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            lines: 80,
        },
    },
};
