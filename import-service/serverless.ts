import type { AWS } from '@serverless/typescript';

import { importFile, parseFile } from '@handlers';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
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
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 's3:ListBucket',
        Resource: [
          'arn:aws:s3:::nodejs-in-aws-2021q1-files',
        ],
      },
      {
        Effect: 'Allow',
        Action: 's3:*',
        Resource: [
          'arn:aws:s3:::nodejs-in-aws-2021q1-files/*',
        ],
      },
    ],
  },

  // import the function via paths
  functions: {
    importFile,
    parseFile,
  },
};

module.exports = serverlessConfiguration;
