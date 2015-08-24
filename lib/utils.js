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
      body: options.body || ''
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
        resolve(response);
      });
    });
    req.on('error', function(e) {
      reject(e);
    });
    req.write(options.body);
    req.end();
  });
}
