'use strict';

var popupLogin = document.querySelector('.modal--login');
var popupFailed = document.querySelector('.modal--failed');
var modalOverlay = document.querySelector('.modal-overlay');

window.getLoad = function (url, params, onLoad) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function (event) {
    if (event.target.status === 401) {
      if(url === AUTH_SERVICE_URL){
          alert('Такого пользователя нет в системе');
      } else {
          popupLogin.classList.add('show');
          modalOverlay.classList.add('modal-overlay--show');
          loginSubmitCallback = function () {
            window.getLoad(url, params, onLoad);
          }
      }
    } else if (event.target.status >= 400) {
      popupFailed.classList.add('show');
      modalOverlay.classList.add("modal-overlay--show");
    } else if (event.target.status >= 200) {
      onLoad(JSON.parse(event.target.response));
    }
  });

  var paramsString = [];

  if (params) {
    for (var key in params) {
      if (params.hasOwnProperty(key)) {
        var value = params[key];
        if (Array.isArray(value)) {
          for (var i = 0; i < value.length; i++) {
            paramsString.push(key + '=' + value[i]);
          }
        } else {
          paramsString.push(key + '=' + value);
        }
      }
    }
  }
  xhr.open('GET', url + '?' + paramsString.join('&'));
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (localStorage.hasOwnProperty('accessToken')) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  }
  xhr.send();
};

//deprecated
window.load = window.getLoad;

window.postLoad = function(url, params, onLoad) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function (event) {
    if (event.target.status === 401) {
      if(url === AUTH_SERVICE_URL){
          alert('Такого пользователя нет в системе');
      } else {
          popupLogin.classList.add('show');
          modalOverlay.classList.add('modal-overlay--show');
          loginSubmitCallback = function () {
            window.postLoad(url, params, onLoad);
          }
      }
    } else if (event.target.status >= 400) {
      popupFailed.classList.add('show');
      modalOverlay.classList.add("modal-overlay--show");
    } else if (event.target.status >= 200) {
      onLoad(JSON.parse(event.target.response));
    }
  });

  xhr.open('POST', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  if (localStorage.hasOwnProperty('accessToken')) {
    xhr.setRequestHeader('Authorization', 'Bearer ' + localStorage.getItem('accessToken'));
  }
  xhr.send(JSON.stringify(params));
};
