/**
 * JAWS API Gateway Client
 */

var request = require('./lib/utils').request;

module.exports = Client;

function Client(options) {
  this.options = options;
}

// TODO: Make these names resemble the API Gateway REST API more closely

/**
 * RestApis
 */

Client.prototype.listRestApis = function() {
  this.options.method = 'GET';
  this.options.path = '/restapis';
  this.options.body = null;
  return request(this.options);
};

Client.prototype.showRestApi = function(restApiId) {
  this.options.method = 'GET';
  this.options.path = '/restapis/' + restApiId;
  this.options.body = null;
  return request(this.options);
};

Client.prototype.createRestApi = function(body) {
  this.options.method = 'POST';
  this.options.path = '/restapis';
  this.options.body = body;
  return request(this.options);
};

Client.prototype.deleteRestApi = function(restApiId) {
  this.options.method = 'DELETE';
  this.options.path = '/restapis/' + restApiId;
  this.options.body = null;
  return request(this.options);
};

/**
 * Resources
 */

Client.prototype.listResources = function(restApiId) {
  this.options.method = 'GET';
  this.options.path = '/restapis/' + restApiId + '/resources?limit=500';
  this.options.body = null;

  var items = [];
  var self = this;

  var getNextPage = function() {
    return request(self.options).then(function(response) {
      var resources = response._embedded.item;
      if (!Array.isArray(resources)) resources = [resources];

      items = items.concat( resources );

      if(response._links && response._links.next && response._links.next.href) {
        self.options.path = response._links.next.href;

        return( getNextPage() );
      } else {
        return( items );
      }
    });
  };

  return( getNextPage() );
};

Client.prototype.createResource = function(restApiId, resourceParentId, pathPart) {
  this.options.method = 'POST';
  this.options.path = '/restapis/' + restApiId + '/resources/' + resourceParentId;
  this.options.body = { pathPart: pathPart };
  return request(this.options);
};

Client.prototype.showResource = function(restApiId, resourceId) {
  this.options.method = 'GET';
  this.options.path = '/restapis/' + restApiId + '/resources/' + resourceId;
  this.options.body = null;
  return request(this.options);
};

Client.prototype.deleteResource = function(restApiId, resourceId) {
  this.options.method = 'DELETE';
  this.options.path = '/restapis/' + restApiId + '/resources/' + resourceId;
  this.options.body = null;
  return request(this.options);
};

/**
 * Methods
 */

Client.prototype.putMethod = function(restApiId, resourceId, resourceMethod, body) {
  this.options.method = 'PUT';
  this.options.path = '/restapis/' + restApiId + '/resources/' + resourceId + '/methods/' + resourceMethod.toUpperCase();
  this.options.body = body;
  return request(this.options);
};

Client.prototype.showMethod = function(restApiId, resourceId, resourceMethod) {
  this.options.method = 'GET';
  this.options.path = '/restapis/' + restApiId + '/resources/' + resourceId + '/methods/' + resourceMethod.toUpperCase();
  this.options.body = null;
  return request(this.options);
};

Client.prototype.deleteMethod = function(restApiId, resourceId, resourceMethod) {
  this.options.method = 'DELETE';
  this.options.path = '/restapis/' + restApiId + '/resources/' + resourceId + '/methods/' + resourceMethod.toUpperCase();
  this.options.body = null;
  return request(this.options);
};

/**
 * Integrations
 */

Client.prototype.putIntegration = function(restApiId, resourceId, resourceMethod, body) {
  this.options.method = 'PUT';
  this.options.path = '/restapis/' + restApiId + '/resources/' + resourceId + '/methods/' + resourceMethod.toUpperCase() + '/integration';
  this.options.body = body;
  return request(this.options);
};

/**
 * Method Response
 */

Client.prototype.putMethodResponse = function(restApiId, resourceId, resourceMethod, statusCode, body) {
  this.options.method = 'PUT';
  this.options.path = '/restapis/' + restApiId + '/resources/' + resourceId + '/methods/' + resourceMethod.toUpperCase() + '/responses/' + statusCode;
  this.options.body = body;
  return request(this.options);
};


/**
 * Integration Response
 */

Client.prototype.putIntegrationResponse = function(restApiId, resourceId, resourceMethod, statusCode, body) {
  this.options.method = 'PUT';
  this.options.path = '/restapis/' + restApiId + '/resources/' + resourceId + '/methods/' + resourceMethod.toUpperCase() + '/integration/responses/' + statusCode;
  this.options.body = body;
  return request(this.options);
};

/**
 * Stages
 */

Client.prototype.listStages = function(restApiId) {
  this.options.method = 'GET';
  this.options.path = '/restapis/' + restApiId + '/stages';
  this.options.body = null;
  return request(this.options);
};

Client.prototype.putStage = function(restApiId, body) {
  this.options.method = 'POST';
  this.options.path = '/restapis/' + restApiId + '/stages';
  this.options.body = body;
  return request(this.options);
};

Client.prototype.showStage = function(restApiId, stageName) {
  this.options.method = 'GET';
  this.options.path = '/restapis/' + restApiId + '/stages/' + stageName.toLowerCase();
  this.options.body = null;
  return request(this.options);
};

Client.prototype.deleteStage = function(restApiId, stageName) {
  this.options.method = 'DELETE';
  this.options.path = '/restapis/' + restApiId + '/stages/' + stageName.toLowerCase();
  this.options.body = null;
  return request(this.options);
};

/**
 * Deployments
 */

Client.prototype.createDeployment = function(restApiId, body) {
  this.options.method = 'POST';
  this.options.path = '/restapis/' + restApiId + '/deployments';
  this.options.body = body;
  return request(this.options);
};

Client.prototype.listDeployments = function(restApiId) {
  this.options.method = 'GET';
  this.options.path = '/restapis/' + restApiId + '/deployments';
  this.options.body = null;
  return request(this.options);
};

