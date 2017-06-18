'use strict';

window.getParsedHash = function(){
  var parsedHash = {};
  var hash = window.location.hash;
  if(hash.length>0){
    parsedHash = JSON.parse(hash.substring(1));
  }
  return parsedHash;
};

window.setHashParam = function (key, value) {
  var parsedHash = window.getParsedHash();
  parsedHash[key] = value;
  window.location.hash = JSON.stringify(parsedHash);
};

window.getHashParam = function(key, defaultValue) {
  var parsedHash = window.getParsedHash();
  if(parsedHash.hasOwnProperty(key)){
    return parsedHash[key];
  } else {
    return defaultValue;
  }
}

window.tryGetHashParam = function(key, callback) {
  var parsedHash = window.getParsedHash();
  if(parsedHash.hasOwnProperty(key)){
    callback(parsedHash[key]);
  }
}

window.deleteHashParam = function (key) {
  var parsedHash = window.getParsedHash();
  delete parsedHash[key];
  var jsonHash = JSON.stringify(parsedHash);
  window.location.hash = jsonHash === '{}' ? '' : jsonHash;
}
