'use strict';

var loginSubmitCallback = null;

var login = function () {
  var popupLogin = document.querySelector('.modal--login');
  var loginForm = popupLogin.querySelector('.form--login');
  var loginEmailField = popupLogin.querySelector('.login__email');
  var loginPasswordField = popupLogin.querySelector('.login__password');
  var modalOverlay = document.querySelector('.modal-overlay');

  var unauthorizedBlock = document.querySelector('.page-header__unauthorized');
  var authorizedBlock = document.querySelector('.page-header__authorized');
  var authorizedUserName = authorizedBlock.querySelector('.page-header__authorized-link--user');
  var authorizedLogoutBtn = authorizedBlock.querySelector('.page-header__authorized-link--logout');
  var localStorageUserData = JSON.parse(localStorage.getItem('userData'));

  var regBlock = document.querySelector('.register');

  var showAuthorizedUserInPageHeader = function (localStorageUserData) {
    unauthorizedBlock.classList.add('page-header__display-none');
    authorizedBlock.classList.remove('page-header__display-none');
    authorizedUserName.textContent = 'Привет, ' + localStorageUserData.firstName;
  };

  var showUnauthorizedBlockInPageHeader = function (localStorageUserData) {
    authorizedBlock.classList.add('page-header__display-none');
    unauthorizedBlock.classList.remove('page-header__display-none');
  };

  if (localStorageUserData) {
    showAuthorizedUserInPageHeader(localStorageUserData);
  } else {
    showUnauthorizedBlockInPageHeader();
  }

  var parseJwt = function (token) {
      var base64Payload = token.split('.')[1];
      var base64 = base64Payload.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
  };

  if (regBlock) {
    var regForm = regBlock.querySelector('.form');
    var regEmailField = document.getElementById('email');
    var regPasswordField = document.getElementById('password');
    var regLastNameField = document.getElementById('last-name');
    var regFirstNameField = document.getElementById('first-name');
    var regMiddleNameField = document.getElementById('middle-name');

    regForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var regEmail = regEmailField.value;
      var regPassword = regPasswordField.value;
      var regLastName = regLastNameField.value;
      var regFirstName = regFirstNameField.value;
      var regMiddleName = regMiddleNameField.value;

      if (regEmail && regPassword && regLastName && regFirstName && regMiddleName) {
        var regParams = {
          'email': regEmail,
          'password': regPassword,
          'role': ["user"],
          'lastName': regLastName,
          'firstName': regFirstName,
          'middleName': regMiddleName
        };
        var loginParams = {
          'strategy': 'local',
          'email': regEmail,
          'password': regPassword
        };

        window.postLoad(USERS_SERVICE_URL, regParams, function (regData) {
          window.postLoad(AUTH_SERVICE_URL, loginParams, function (token) {
            localStorage.setItem('accessToken', token.accessToken);
            var jwt = parseJwt(token.accessToken);

            window.getLoad(USERS_SERVICE_URL + '/' + jwt.userId, null, function(userData) {
              localStorage.setItem('userData', JSON.stringify(userData));
              showAuthorizedUserInPageHeader(userData);
              window.location = 'index.html';
            });
          });
        });
      } else {
        regLastNameField.style.borderColor = 'red';
        regFirstNameField.style.borderColor = 'red';
        regMiddleNameField.style.borderColor = 'red';
        regEmailField.style.borderColor = 'red';
        regPasswordField.style.borderColor = 'red';
      }
    });
  }

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (loginEmailField.value && loginPasswordField.value) {
      var loginEmail = loginEmailField.value;
      var loginPassword = loginPasswordField.value;
      var loginParams = {
        'strategy': 'local',
        'email': loginEmail,
        'password': loginPassword
      };

      window.postLoad(AUTH_SERVICE_URL, loginParams, function (token) {
        localStorage.setItem('accessToken', token.accessToken);
        var jwt = parseJwt(token.accessToken);

        window.getLoad(USERS_SERVICE_URL + '/' + jwt.userId, null, function(userData) {
          localStorage.setItem('userData', JSON.stringify(userData));
          popupLogin.classList.remove('show');
          modalOverlay.classList.remove('modal-overlay--show');
          popupLogin.classList.remove('modal-error');
          showAuthorizedUserInPageHeader(userData);
          if (loginSubmitCallback) {
            loginSubmitCallback();
            loginSubmitCallback = null;
          }
        });
      });
    } else {
      popupLogin.classList.remove("modal-error");
      popupLogin.style.width = popupLogin.offsetWidth;
      popupLogin.classList.add("modal-error");
    }
  });

  authorizedLogoutBtn.addEventListener('click', function () {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userData');
    showUnauthorizedBlockInPageHeader();
  })
};
