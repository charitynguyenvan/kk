export const mTwilioVerifyPhone = (phone) => {
  var accountSid = 'AC4bd0eab0ac039e1c779c2ea64bf82a43'; // Your Account SID from www.twilio.com/console
  var authToken = '6f9c24783885cc9181eaa722f30f4c3e';   // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio.RestClient(accountSid, authToken);

  client.messages.create({
      body: 'My name is Charity! After 5 years in the hell, I\'ve come homw with only one goal ...',
      to: phone,  // Text this number
      from: '+12025688348' // From a valid Twilio number
  }, function(err, message) {
      console.log('message', message);
      console.log('error', err);
  });
}

export const mNexmoVerifyPhone = (phone) => {
  const NexmoVerify = require('verify-javascript-sdk')
  var N = new NexmoVerify({

    appId: '7a554b88-84b8-430e-8dc5-e2dda5336528',

    sharedSecret: '34e97d5e30dd40d'

    })

  N.verify({

    number: phone,

    country: 'VN', // optional

    lg: 'en-US' //optional

    }).then(function(status) {
      console.log('status', status)

    // Handle the request to Verify SDK for JavaScript that is progressing normally.

    // Example status values are: verified, pending, failed.

    }, function( error ) {
      console.log('error', error)

    // Handle an issue in your call to Verify SDK for JavaScript. Normally this occurs when one of

    // the parameters in the NexmoVerify object or this call is incorrect.

    })
}

export const mNexmoVerifyCheck = (phone, code) => {
  const NexmoVerify = require('verify-javascript-sdk')
  var N = new NexmoVerify({

    appId: '7a554b88-84b8-430e-8dc5-e2dda5336528',

    sharedSecret: '34e97d5e30dd40d'

    })

  N.verifyCheck({

    number: phone,

    code: code

    }).then(function(status) {
      console.log('status', status);

    // Handle the request to Verify SDK for JavaScript that is progressing normally.

    },function( error ){
      console.log('error', error);

    // Handle an issue in your call to Verify SDK for JavaScript. Normally this occurs when one of

    // the parameters in the NexmoVerify object or this call is incorrect.

    })
}
