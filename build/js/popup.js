'use strict';

var popup = function () {
  var btnOpenLogin = document.querySelector(".page-header__unauthorized-link--login"),
      popupLogin = document.querySelector(".modal--login"),
      btnCloseLogin = document.querySelector(".modal--login .modal__close"),

      btnOpenWriteUs = document.querySelector(".js-write-us"),
      popupWriteUs = document.querySelector(".modal--write-us"),
      btnCloseWriteUs = document.querySelector(".modal--write-us .modal__close"),

      btnOpenCart = document.querySelectorAll(".btn--buy"),
      popupCart = document.querySelector(".modal--cart"),
      btnCloseCart = document.querySelector(".modal--cart .modal__close"),

      mapOpen = document.querySelector(".js-open-map"),
      mapPopup = document.querySelector(".modal--map"),
      mapClose = document.querySelector(".modal--map .modal__close");

      var modalOverlay = document.querySelector(".modal-overlay");

      /********** Модальное окно "Авторизация" **********/
      if (btnOpenLogin && popupLogin && btnCloseLogin) {
        var form = popupLogin.querySelector(".form");
        var fieldEmail = popupLogin.querySelector("#login__email");
        var fieldPassword = popupLogin.querySelector("#login__password");

        btnOpenLogin.addEventListener("click", function (event) {
          event.preventDefault();
          popupLogin.classList.add("show");
          modalOverlay.classList.add("modal-overlay--show");
          fieldEmail.focus();
        });

        btnCloseLogin.addEventListener("click", function (event) {
          event.preventDefault();
          popupLogin.classList.remove("show");
          modalOverlay.classList.remove("modal-overlay--show");
          popupLogin.classList.remove("modal-error");
        });

        window.addEventListener("keydown", function (event) {
          if (event.keyCode === 27) {
            if (popupLogin.classList.contains("show")) {
              popupLogin.classList.remove("show");
              modalOverlay.classList.remove("modal-overlay--show");
              popupLogin.classList.remove("modal-error");
            }
          }
        });
      }

  /********** Модальное окно "Напишите нам" **********/
  if (btnOpenWriteUs && popupWriteUs && btnCloseWriteUs) {
    var form = popupWriteUs.querySelector(".form");
    var fieldName = popupWriteUs.querySelector("#write-us__name");
    var fieldEmail = popupWriteUs.querySelector("#write-us__email");
    var fieldText = popupWriteUs.querySelector("#write-us__text");

    btnOpenWriteUs.addEventListener("click", function (event) {
      event.preventDefault();
      popupWriteUs.classList.add("show");
      modalOverlay.classList.add("modal-overlay--show");
      fieldName.focus();
    });

    form.addEventListener("submit", function (event) {
      if (!fieldName.value || !fieldEmail.value) {
        event.preventDefault();
        popupWriteUs.classList.remove("modal-error");
        popupWriteUs.style.width = popupWriteUs.offsetWidth;
        popupWriteUs.classList.add("modal-error");
      }
    });

    btnCloseWriteUs.addEventListener("click", function (event) {
      event.preventDefault();
      popupWriteUs.classList.remove("show");
      modalOverlay.classList.remove("modal-overlay--show");
      popupWriteUs.classList.remove("modal-error");
    });

    window.addEventListener("keydown", function (event) {
      if (event.keyCode === 27) {
        if (popupWriteUs.classList.contains("show")) {
          popupWriteUs.classList.remove("show");
          modalOverlay.classList.remove("modal-overlay--show");
          popupWriteUs.classList.remove("modal-error");
        }
      }
    });
  }

  /******* Модальное окно "Добавление товара в корзину" *******/
  if (btnOpenCart && popupCart && btnCloseCart) {
    for (var i=0; i<btnOpenCart.length; i++){
      btnOpenCart[i].addEventListener("click", function (event) {
      event.preventDefault();
      popupCart.classList.add("show");
      modalOverlay.classList.add("modal-overlay--show");
      });
    }

    btnCloseCart.addEventListener("click", function (event) {
      event.preventDefault();
      popupCart.classList.remove("show");
      modalOverlay.classList.remove("modal-overlay--show");
    });

    var btnContinueShopping = popupCart.querySelector('.modal__continue-shopping');
    btnContinueShopping.addEventListener("click", function (event) {
      event.preventDefault();
      popupCart.classList.remove("show");
      modalOverlay.classList.remove("modal-overlay--show");
    });

    window.addEventListener("keydown", function (event) {
      if (event.keyCode === 27) {
        if (popupCart.classList.contains("show")) {
          popupCart.classList.remove("show");
          modalOverlay.classList.remove("modal-overlay--show");
        }
      }
    });
  }

  /********** Модальное окно "Карта" **********/
  if (mapOpen && mapPopup && mapClose) {
    mapOpen.addEventListener("click", function (event) {
    event.preventDefault();
    mapPopup.classList.add("show");
    });

    mapClose.addEventListener("click", function (event) {
      event.preventDefault();
      mapPopup.classList.remove("show");
    });

    window.addEventListener("keydown", function (event) {
      if (event.keyCode === 27) {
        if (mapPopup.classList.contains("show")) {
          mapPopup.classList.remove("show");
        }
      }
    });
  }
};
