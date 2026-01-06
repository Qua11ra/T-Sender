// jest.config.js
const createJestConfig = () => ({
    testEnvironment: 'node',
    preset: 'ts-jest',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    collectCoverageFrom: [
      '**/*.{js,jsx,ts,tsx}',
      '!**/node_modules/**',
      '!**/coverage/**',
    ],
  });
  
  module.exports = createJestConfig();