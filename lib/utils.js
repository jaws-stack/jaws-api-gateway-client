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
    };

    if (options.body) opts.body = JSON.stringify(options.body);

    opts = aws4.sign(opts, {
      accessKeyId: options.accessKeyId,
      secretAccessKey: options.secretAccessKey
    });

    var request = function () {
      return new Promise(function(resolve, reject){
        var req = https.request(opts, function(res) {
          var body = '';

          res.on('data', function(d) {
            body += d;
          });

          res.on('end', function() {
            resolve({
              "statusCode": res.statusCode,
              "body": body
            });
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
    };

    var handle = function(){
      request().then(function (res) {
        if (~[200,201,203,205,206].indexOf(res.statusCode)) {
          // Successful w/ Body
          resolve(JSON.parse(res.body));
        } else if (~[202,204].indexOf(res.statusCode)){
          //Successful w/o Body
          resolve({
            message:"Request is processing"
          });
        } else if (~[439].indexOf(res.statusCode)){
          //Too Many Requests
          setTimeout( handle, 5000 );
        } else {
          res.body = JSON.parse(res.body);
          reject(res);
        }

      },function(err){
        reject( err );
      });
    };

    handle();
  });
};
