'use strict';

(function () {
  var form = document.querySelector('.form');
  var lastName = document.getElementById('account__last-name');
  var firstName = document.getElementById('account__first-name');
  var middleName = document.getElementById('account__middle-name');
  var tel = document.getElementById('account__tel');
  var email = document.getElementById('account__email');
  var localStorageUserData = JSON.parse(localStorage.getItem('userData'));

  lastName.value = localStorageUserData.lastName;
  firstName.value = localStorageUserData.firstName;
  middleName.value = localStorageUserData.middleName;
  email.value = localStorageUserData.email;
})();
