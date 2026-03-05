/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',

    moduleNameMapper: {
        '\\.css$': 'identity-obj-proxy',
        '\\.svg\\?react$': '<rootDir>/src/tests/__mocks__/svgMock.js',
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
            '<rootDir>/src/tests/__mocks__/fileMock.js',
    },

    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            {
                tsconfig: 'tsconfig.jest.json',
            },
        ],
    },

    setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
    moduleDirectories: ['node_modules', 'src'],
    coverageReporters: ['html', 'json-summary', 'lcov', 'text'],
    coverageDirectory: 'coverage',
};
