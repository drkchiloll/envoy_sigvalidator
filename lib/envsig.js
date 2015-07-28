var crypto = require('crypto');

module.exports = function(key) {
  var sigService = {};

  sigService.createToken = function(callback) {
    crypto.randomBytes(11, function(err, buffer) {
      if (err) return callback(err);
      callback(null, buffer.toString('hex'));
    });
  };

  sigService.createSigDef = function(callback) {
    var timestamp = Date.now().toString();
    sigService.createToken(function(err, token) {
      if (err) return callback(err);
      var auth =  {
        timestamp : timestamp,
        signature : crypto.createHmac('sha256', key).update(timestamp+token).digest('hex'),
        token : token
      };
      callback(null, auth);
    });
  };

  sigService.verifySig = function(args) {
    var timestamp = args.timestamp,
        token = args.token;
    var sig = crypto.createHmac('sha256', key).update(timestamp+token).digest('hex');
    return (sig === args.signature);
  };

  return sigService;
};
