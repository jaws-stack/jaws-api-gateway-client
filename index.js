/**
 * JAWS API Gateway Client
 */

var request = require('./lib/utils').request;

module.exports = Client;

function Client(options) {
  this.options = options;
}

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
 * Stages
 */

Client.prototype.listStages = function(restApiId) {
  this.options.method = 'POST';
  this.options.path = '/restapis/' + restApiId + '/stages';
  this.options.body = null;
  return request(this.options);
}

Client.prototype.createStage = function(restApiId, body) {
  this.options.method = 'POST';
  this.options.path = '/restapis/' + restApiId + '/stages';
  this.options.body = body;
  return request(this.options);
}

/**
 * Deployments
 */

Client.prototype.listDeployments = function(restApiId) {
  this.options.method = 'GET';
  this.options.path = '/restapis/' + restApiId + '/deployments';
  this.options.body = null;
  return request(this.options);
}

/**
 * Resources
 */

Client.prototype.listResources = function(restApiId) {
  this.options.method = 'GET';
  this.options.path = '/restapis/' + restApiId + '/resources';
  this.options.body = null;
  return request(this.options);
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

Client.prototype.createMethod = function(restApiId, resourceId, resourceMethod, body) {
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

