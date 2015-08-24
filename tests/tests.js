var Client = require('../index')
dotenv = require('dotenv'),
  AWS = require('aws-sdk');

dotenv.load();

// Test Data
var test = {
  credentials: new AWS.SharedIniFileCredentials({
    profile: process.env.profile
  }),
  restApiId: process.env.restApiId,
  resourceId: process.env.resourceId
};


describe('Test client', function() {

  var client = new Client({
    accessKeyId: test.credentials.accessKeyId,
    secretAccessKey: test.credentials.secretAccessKey,
    region: 'us-east-1'
  });

  it('restapis: list', function(done) {
    this.timeout(0);

    client.listRestApis().then(function(response) {
        console.log(response);
        done();
      })
      .catch(function(e) {
        done(e);
      });
  });

  it('restapis: show by id', function(done) {
    this.timeout(0);

    client.showRestApi(test.restApiId).then(function(response) {
        console.log(response);
        done();
      })
      .catch(function(e) {
        done(e);
      });
  });

  it('stages: list', function(done) {
    this.timeout(0);

    client.listStages(test.restApiId).then(function(response) {
        console.log(response);
        done();
      })
      .catch(function(e) {
        done(e);
      });
  });

  it('deployments: list', function(done) {
    this.timeout(0);

    client.listDeployments(test.restApiId).then(function(response) {
        console.log(response);
        done();
      })
      .catch(function(e) {
        done(e);
      });
  });

  it('resources: list', function(done) {
    this.timeout(0);

    client.listResources(test.restApiId).then(function(response) {
        console.log(response);
        done();
      })
      .catch(function(e) {
        done(e);
      });
  });



});
