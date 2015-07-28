var assert = require('assert');
var config = require('../config');

var sigFactory = require('../lib/envsig');
var sigVerifier = sigFactory(config.key);

describe('All required variables exists', function() {
  var apiKey = config.key;
  it('API Key lives in configjs file', function() {
    assert(apiKey)
  });
});

describe('Generating a Mock Signature', function() {
  var envSigDef;
  before(function(done) {
    sigVerifier.createSigDef(function(err, sig) {
      envSigDef = sig;
      done();
    });
  });
  it('verify payload sources origin', function() {
    assert(sigVerifier.verifySig(envSigDef));
  });
});
