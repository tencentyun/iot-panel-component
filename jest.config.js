/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/test/setupTests.js"],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    "^.+\\.svg$": 'jest-svg-transformer'
  }
};
