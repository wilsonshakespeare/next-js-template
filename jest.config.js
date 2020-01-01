module.exports = {
  setupFiles: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss|svg)$': 'identity-obj-proxy',
    '^@core(.*)$': '<rootDir>/core$1',
    '^@components(.*)$': '<rootDir>/components$1',
    '^@constants(.*)$': '<rootDir>/constants$1',
    '^@context(.*)$': '<rootDir>/context$1',
    '^@config(.*)$': '<rootDir>/config$1',
    '^@definitions(.*)$': '<rootDir>/definitions$1',
    '^@pages(.*)$': '<rootDir>/pages$1',
    '^@store(.*)$': '<rootDir>/store$1',
    '^@routes(.*)$': '<rootDir>/routes$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
  },
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/(?!(react-icons)/)',
    '<rootDir>/dist/__test__',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!(react-icons)/)'],
};
