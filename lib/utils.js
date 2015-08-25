/**
 * Utilities
 */

var http = require('http'),
  https = require('https'),
  Promise = require('bluebird'),
  aws4 = require('aws4');

/**
 * API Request
 */

module.exports.request = function(options) {
  return new Promise(function(resolve, reject) {

    var opts = aws4.sign({
      service: 'apigateway',
      region: options.region,
      method: options.method,
      path: options.path,
      body: options.body ? JSON.stringify(options.body) : ''
    }, {
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey
    });

    var req = https.request(opts, function(res) {

      var body = '';
      res.on('data', function(d) {
        body += d;
      });

      res.on('end', function() {
        var response = JSON.parse(body);
        if ([200,201,202,203,204,205,206].indexOf(res.statusCode) === -1) reject(response);
        else resolve(response);
      });
    });

    req.on('error', function(e) {
      reject(e);
    });

    req.write(options.body ? JSON.stringify(options.body) : '');
    req.end();
  });
}
