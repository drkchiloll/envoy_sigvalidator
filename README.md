# Envoy.co Webhooks Signature Verification
Description: This module verifies that the data being received by your "http listener" actually originated from Envoy.

The Envoy Webhooks API currently invokes a request when a Guest either signs in or signs out. Below is a representation of this object.

```json
{
  "entry" : "{User Data}",
  "status" : "sign_in or sign_out",
  "timestamp" : "UTC UNIX Time",
  "token" : "Random String",
  "signature" : "HASH of API KEY/TimeStamp/Token"
}
```

#### Validate Envoy Signature

To ensure the contents being received originated from Envoy you need the Envoy API Key stored in a Variable, config file, et al (my example uses a config.js file)

```javascript
module.exports = {
  key : "my envoy api key"
};
```

##### Useage of this API

```javascript
var envoyValidator = require('envoy_sigvalidator');

var apiKey = 'your api key from some source';
var verifier = envoyValidator(apiKey);

//Taken from an Envoy Request (POST) to our WebServer
var envoySignage = {
  timestamp : req.body.timestamp,
  token : req.body.token,
  signature : req.body.signature
};

var dataIsValid = verifier.verifySig(envoySignage);
if (dataIsValid) console.log('The Message Came From Envoy');
else console.log('That Message did not originate from Envoy');
```

##### Verify Algorithm

If you don't have a mechanism in place to verify data received from Envoy you can use your "API Key" to create a "mock" Signature Definition Object (timestamp, token, sig)

```javascript
var envoyValidator = require('envoy_sigvalidator');
var apiKey = 'your api key';
var verifier = envoyValidator(apiKey);
verifier.createSigDef(function(err, sig) {
  var mockEnvoySignage = sig;
  var dataIsValid = verifier.verifySig(mockEnvoySignage);
  if (dataIsValid) console.log('The Message Came From Envoy');
  else console.log('That Message did not originate from Envoy');
});
```
