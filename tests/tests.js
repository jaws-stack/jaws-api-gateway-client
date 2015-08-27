var Client = require('../index')
dotenv = require('dotenv'),
  AWS = require('aws-sdk'),
shortid = require('shortid');

dotenv.load();

// Test Data
var testData = {
  credentials: new AWS.SharedIniFileCredentials({
    profile: process.env.profile
  })
};


describe('Test client', function() {

  var client = new Client({
    accessKeyId: testData.credentials.accessKeyId,
    secretAccessKey: testData.credentials.secretAccessKey,
    region: 'us-east-1'
  });

  it('restapis: create', function(done) {
    this.timeout(0);

    var body = {
      name: 'test-rest-api-' + shortid.generate(),
      description: 'temporary, test rest api'
    };

    client.createRestApi(body).then(function(response) {
      console.log(response);
      testData.restApiId = response.id;
      testData.restApiName = response.name;
      done();
    }).catch(done);
  });

  it('restapis: list', function(done) {
    this.timeout(0);

    client.listRestApis().then(function(response) {
      console.log(response);
      done();
    }).catch(done);
  });

  it('restapis: show by id', function(done) {
    this.timeout(0);

    client.showRestApi(testData.restApiId).then(function(response) {
        console.log(response);
        done();
      })
        .catch(done);
  });

  it('resources: list', function(done) {
    this.timeout(0);

    client.listResources(testData.restApiId).then(function(response) {
      console.log(response);
      testData.parentResourceId = response._embedded.item.id; // The default resource is a '/'
      done();
    }).catch(done);
  });

  it('resources: create', function(done) {
    this.timeout(0);

    client.createResource(testData.restApiId, testData.parentResourceId, 'users').then(function(response) {
      console.log(response);
      testData.childResourceId = response.id;
      done();
    }).catch(done);
  });

  it('resources: create 2', function(done) {
    this.timeout(0);

    client.createResource(testData.restApiId, testData.parentResourceId, 'events').then(function(response) {
      console.log(response);
      testData.tempResourceId = response.id;
      done();
    }).catch(done);
  });

  it('resources: show', function(done) {
    this.timeout(0);

    client.showResource(testData.restApiId, testData.childResourceId).then(function(response) {
      console.log(response);
      done();
    }).catch(done);
  });

  it('resources: delete', function(done) {
    this.timeout(0);

    client.deleteResource(testData.restApiId, testData.tempResourceId).then(function(response) {
      console.log(response);
      done();
    }).catch(done);
  });

  it('methods: create', function(done) {
    this.timeout(0);

    var method = {
      "authorizationType" : "none",
      "apiKeyRequired" : false,
      "requestParameters" : {
        "method.request.querystring.access_token": true
      },
      "requestModels" : {}
    };

    client.createMethod(testData.restApiId, testData.childResourceId, 'GET', method).then(function(response) {
      console.log(response);
      done();
    }).catch(done);
  });

  it('methods: show', function(done) {
    this.timeout(0);

    client.showMethod(testData.restApiId, testData.childResourceId, 'GET').then(function(response) {
      console.log(response);
      done();
    }).catch(done);
  });

  //it('integrations: create', function(done) {
  //  this.timeout(0);
  //
  //  var integration = {
  //
  //  };
  //
  //  client.createIntegration(testData.restApiId, testData.childResourceId, 'GET', integration).then(function(response) {
  //    console.log(response);
  //    done();
  //  }).catch(done);
  //});


  it('methods: delete', function(done) {
    this.timeout(0);

    client.deleteMethod(testData.restApiId, testData.childResourceId, 'GET').then(function(response) {
      console.log(response);
      done();
    }).catch(done);
  });

  it('deployments: list', function(done) {
    this.timeout(0);

    client.listDeployments(testData.restApiId).then(function(response) {
        console.log(response);
        done();
      })
        .catch(done);
  });

  it('restapis: delete', function(done) {
    this.timeout(0);

    client.deleteRestApi(testData.restApiId).then(function(response) {
      console.log(response);
      done();
    })
        .catch(done);
  });

});
