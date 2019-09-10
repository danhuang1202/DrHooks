module.exports = {
  rootDir: '../',
  transform: { '^.+\\.(ts|tsx)?$': 'babel-jest' },
  testMatch: [`**/__tests__/**/*.test.ts?(x)`],
  moduleNameMapper: {
    '^@src/(.*)$': '<rootDir>/src/$1'
  }
}
