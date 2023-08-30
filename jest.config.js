/** @type {import('jest').Config} */
module.exports = {
  roots: ['<rootDir>/src'],
  // collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testEnvironment: "jest-environment-node",
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
};