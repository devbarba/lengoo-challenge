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
        'src/__tests__/mocks',
    ],
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    coverageThreshold: {
        global: {
            lines: 99,
        },
    },
};
