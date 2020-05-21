module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['client/src/**/*.{js,jsx,mjs}', 'server/*.{js,jsx,mjs}'],
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules'],
  moduleFileExtensions: ['js', 'json', 'jsx'],
  setupFiles: ['<rootDir>/enzyme.config.js'],
  setupFilesAfterEnv: ['jest-enzyme'],
  testEnvironment: 'jest-environment-jsdom-sixteen',
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.jsx$': 'babel-jest',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
};
