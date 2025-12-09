import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    specPattern: 'cypress/e2e/**/*.cy.{ts,tsx,js,jsx}',
    supportFile: 'cypress/support/e2e.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      try {
        const webpackPreprocessor = require('@cypress/webpack-preprocessor');
        const path = require('path');

        const webpackOptions = {
          mode: 'development',
          resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
          },
          module: {
            rules: [
              {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      '@babel/preset-env',
                      '@babel/preset-react',
                      '@babel/preset-typescript'
                    ]
                  }
                }
              },
              {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      '@babel/preset-env',
                      '@babel/preset-react',
                      '@babel/preset-typescript'
                    ]
                  }
                }
              },
              {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              }
            ]
          }
        };

        on('file:preprocessor', webpackPreprocessor({ webpackOptions }));

        return config;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.stack || err.message : String(err);
        console.error('Error in setupNodeEvents:', errorMessage);
        return config;
      }
    }
  }
});
