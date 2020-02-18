module.exports = {
  collectCoverageFrom: [
    'test/*.ts',
  ],
  moduleFileExtensions: [
    'js',
    'ts',
  ],
  moduleNameMapper: {
    '@cennznet/api-types(.*)$': '<rootDir>/src/$1',
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
  preset: 'ts-jest',
  testMatch: null,
}
