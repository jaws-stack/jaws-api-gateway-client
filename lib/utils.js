/**
 * Utilities
 */

var http = require('http'),
  https = require('https'),
    request = require('request'),
  Promise = require('bluebird'),
  aws4 = require('aws4');

/**
 * API Request
 */

module.exports.request = function(options) {
  return new Promise(function(resolve, reject) {

    var opts = {
      service: 'apigateway',
      region: options.region,
      method: options.method,
      path: options.path
    };
    if (options.body) opts.body = JSON.stringify(options.body);

    opts = aws4.sign(opts, {
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey
    });

    var req = https.request(opts, function(res) {

      var body = '';

      res.on('data', function(d) {
        body += d;
      });

      res.on('end', function() {

        if (~[200,201,203,204,205,206].indexOf(res.statusCode)) {
          // Successful w/ Body
          resolve(JSON.parse(body));
        } else if (res.statusCode === 202){
          //Successful w/o Body
          resolve({
            message:"Request is processing"
          });
        } else {
          reject(body);
        }
      });
    });

    req.on('error', function(e) {
      // General error, i.e.
      //  - ECONNRESET - server closed the socket unexpectedly
      //  - ECONNREFUSED - server did not listen
      //  - HPE_INVALID_VERSION
      //  - HPE_INVALID_STATUS
      reject(e);
    });

    if (~['POST','PUT'].indexOf(options.method)) req.write(JSON.stringify(options.body));
    req.end();
  });
}
