module.exports = {
  // testEnvironment: 'jest-environment-jsdom',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.cjs'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
