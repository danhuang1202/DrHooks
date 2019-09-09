module.exports = {
  rootDir: '../',
  transform: { '^.+\\.ts?$': 'babel-jest' },
  testMatch: [`**/__tests__/**/*.test.ts`],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1'
  }
}
