var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var https = require('https');
var url = require('url');

var app = express();

'use strict';

var  encoding = {
      alias: 'e',
      default: 'LINEAR16',
      global: true,
      requiresArg: true,
      type: 'string'
    }
  var   sampleRateHertz = {
      alias: 'r',
      default: 16000,
      global: true,
      requiresArg: true,
      type: 'number'
    }

var  languageCode = {
      alias: 'l',
      default: 'en-IN',
      global: true,
      requiresArg: true,
      type: 'string'
    }

var lastText = "";
// function dosomething(str) {
//   console.log(str);
//   lastText += str.results+" ";
// }
var currentRecord;
var currentRes;
function dosomething(str) {
  console.log(str);
  currentRes.end(str.results);
  if(currentRecord)
  currentRecord.stop();
  currentRecord=null;
}

function streamingMicRecognize (encoding, sampleRateHertz, languageCode) {
  // [START speech_streaming_mic_recognize]
  const record = require('node-record-lpcm16');
  if(currentRecord)
    currentRecord.stop();
  currentRecord = record;


  // Imports the Google Cloud client library
  const Speech = require('@google-cloud/speech');
 
  // Instantiates a client
  const speech = Speech();

  const request = {
    config: {
      encoding: encoding,
      sampleRateHertz: sampleRateHertz,
      languageCode: languageCode
    },
    interimResults: false // If you want interim results, set this to true
  };

  // Create a recognize stream
  const recognizeStream = speech.createRecognizeStream(request)
    .on('error', console.error)
    .on('data',dosomething );//(data) => res.end(data.results));

  // Start recording and send the microphone input to the Speech API
  record
    .start({
      sampleRateHertz: sampleRateHertz,
      threshold: 0,
      // Other options, see https://www.npmjs.com/package/node-record-lpcm16#options
      verbose: false,
      recordProgram: 'rec', // Try also "arecord" or "sox"
      silence: '10.0'
    })
    .on('error', console.error)
    .pipe(recognizeStream);



  console.log('Listening Started, press Ctrl+C to stop.');

}

app.use(function(req, res, next) {
  var allowedOrigins = ['http://localhost:3000'];
  var origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

app.get('/', function (req, res) {
  while(currentRecord) {

  }
  
  currentRes = res;
  streamingMicRecognize('LINEAR16', 16000, 'en-IN',res);

})


app.listen(4000, function () {
  console.log('Server listening on port 4000!');
});