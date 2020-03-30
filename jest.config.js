module.exports = {
  collectCoverageFrom: [
    'test/*.ts',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  moduleNameMapper: {
    '@cennznet/api-types(.*)$': '<rootDir>/src/interfaces/$1',
  },
  testRegex: [
    '.*.e2e.ts',
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        warnOnly: true,
      },
      tsConfig: 'tsconfig.json',
    },
  },
  testTimeout: 15000,
  preset: 'ts-jest',
  testMatch: null,
}
