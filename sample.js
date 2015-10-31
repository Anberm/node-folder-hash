﻿"use strict"

var crypto = require('crypto');
var path = require('path');

var hashFile = require('./index.js');

console.log('Known hash algorithms: ', '\'' + crypto.getHashes().join('\', \'') + '\'');


function checkPromise(promise) {
    promise.then(function (result) {
        console.log('Promise resolved:', result, '\n\n');
    },
    function (reason) {
        console.error('Promise rejected due to:', reason, '\n\n');
    });
}


var file = 'README.md';
var dir = __dirname;

console.log('\nCreate a hash over a single file:');
checkPromise(hashFile.hashElement(file, dir));

console.log('Create hash over a folder:');
checkPromise(hashFile.hashElement(path.basename(dir), path.dirname(dir)));

