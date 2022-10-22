module.exports = {
    setupFiles: ['<rootDir>/__tests__/setup.js'],
    testEnvironment: 'node',
    verbose: false,
    silent: false,
    moduleNameMapper: {
        '^pages/(.*)$': '<rootDir>/testBuild/pages/$1',
        '^__tests__/client$': '<rootDir>/__tests__/client',
        '^lib/(.*)$': '<rootDir>/testBuild/lib/$1',
    },
    testRegex: '(\\.|/)(test|spec)\\.[jt]sx?$',
    extensionsToTreatAsEsm: ['.ts'],
};
//moduleDirectories: ['node_modules', '<rootDir>', __dirname],
