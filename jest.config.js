const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	setupFiles: ['<rootDir>/__tests__/unit/setup.js'],
	testEnvironment: 'node',
	verbose: false,
	silent: false,
	moduleDirectories: ['node_modules', '<rootDir>'],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
		prefix: '<rootDir>',
	}),
	testRegex: '(\\.|/)(test|spec)\\.[jt]sx?$',
	extensionsToTreatAsEsm: ['.ts'],
	setupFilesAfterEnv: ['<rootDir>/__tests__/unit/setupJest.ts'],
};
