/* eslint-env node */

module.exports = function(deployTarget) {
  let ENV = {
    build: {
      environment: deployTarget
    },

    'revision-data': {
      type: 'git-commit'
    },

   's3-index': {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      bucket: "brandynbennett.com",
      region: "us-east-2",
      prefix: 'piano',
      allowOverwrite: true
    },

    // Don't copy these between s3-index and s3, there are issues that will break the deploy.
    // Fix is being worked on
    's3': {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      bucket: "brandynbennett.com",
      prefix: 'piano',
      region: "us-east-2"
    }
  };

  return ENV;
};
