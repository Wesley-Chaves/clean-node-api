/** @type {import('jest').Config} */
module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jest-environment-node",
  preset: '@shelf/jest-mongodb',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};