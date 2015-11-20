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

    var opts = {
      service: 'apigateway',
      region: options.region,
      method: options.method,
      path: options.path
    },
        credentials = {
            accessKeyId: options.accessKeyId,
            secretAccessKey: options.secretAccessKey
        };

    if (options.body) opts.body = JSON.stringify(options.body);

    if(options.sessionToken) credentials.sessionToken;

    opts = aws4.sign(opts, credentials);

    var req = https.request(opts, function(res) {

      var body = '';

      res.on('data', function(d) {
        body += d;
      });

      res.on('end', function() {

        if (~[200,201,203,205,206].indexOf(res.statusCode)) {
          // Successful w/ Body
          resolve(JSON.parse(body));
        } else if (~[202,204].indexOf(res.statusCode)){
          //Successful w/o Body
          resolve({
            message:"Request is processing"
          });
        } else {
          body = JSON.parse(body);
          body.statusCode = res.statusCode;
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

    if (options.body) req.write(JSON.stringify(options.body));
    req.end();
  });
}
