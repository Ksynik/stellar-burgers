module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts',
    '^@components': '<rootDir>/src/components',
    '^@ui': '<rootDir>/src/components/ui',
    '^@utils-types': '<rootDir>/src/utils/types',
    '^@selectors': '<rootDir>/src/services/selectors',
    '^@slices': '<rootDir>/src/services/slices',
    '^@pages': '<rootDir>/src/pages',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.json' }]
  }
};
