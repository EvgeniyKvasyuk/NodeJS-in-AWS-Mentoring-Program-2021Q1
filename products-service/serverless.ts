import type { AWS } from '@serverless/typescript';
import { config } from 'dotenv';

import { get, getById, create } from '@handlers';

config();

const serverlessConfiguration: AWS = {
  service: 'products-service',
  useDotenv: true,
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: { forceInclude: ['pg'] },
    },
  },
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: 'eu-west-1',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      DB_HOST: process.env.DB_HOST,
      DB_PORT: process.env.DB_PORT,
      DB_NAME: process.env.DB_NAME,
      DB_USER: process.env.DB_USER,
      DB_PASSWORD: process.env.DB_PASSWORD,
    },
    lambdaHashingVersion: '20201221',
  },

  // import the function via paths
  functions: {
    get,
    getById,
    create,
  },
};

module.exports = serverlessConfiguration;
