var btnOpenWriteUs = document.querySelector(".btn-write-us"),
    popupWriteUs = document.querySelector(".modal-write-us"),
    btnCloseWriteUs = document.querySelector(".modal-write-us .modal-content-close"),
    btnOpenCart = document.querySelectorAll(".btn-buy"),
    popupCart = document.querySelector(".modal-cart"),
    btnCloseCart = document.querySelector(".modal-cart .modal-content-close"),
    mapOpen = document.querySelector(".js-open-map"),
    mapPopup = document.querySelector(".modal-map"),
    mapClose = document.querySelector(".modal-map .modal-content-close");

/********** Модальное окно "Напишите нам" **********/
if (btnOpenWriteUs && popupWriteUs && btnCloseWriteUs) {
  form = popupWriteUs.querySelector("form");
  fieldName = popupWriteUs.querySelector("#name");
  fieldEmail = popupWriteUs.querySelector("#email");
  fieldText = popupWriteUs.querySelector("#text");
  
  btnOpenWriteUs.addEventListener("click", function (event) {
    event.preventDefault();
    popupWriteUs.classList.add("show");
    fieldName.focus();
  });

  form.addEventListener("submit", function (event) {
    if (!fieldName.value || !fieldEmail.value || !fieldText.value) {
      event.preventDefault();
      popupWriteUs.classList.remove("modal-error");
      popupWriteUs.offsetWidth = popupWriteUs.offsetWidth;
      popupWriteUs.classList.add("modal-error");
    }
  });
  btnCloseWriteUs.addEventListener("click", function (event) {
    event.preventDefault();
    popupWriteUs.classList.remove("show");
    popupWriteUs.classList.remove("modal-error");
  });
  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      if (popupWriteUs.classList.contains("show")) {
        popupWriteUs.classList.remove("show");
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
    });
  }    
  btnCloseCart.addEventListener("click", function (event) {
    event.preventDefault();
    popupCart.classList.remove("show");
  });
  window.addEventListener("keydown", function (event) {
    if (event.keyCode === 27) {
      if (popupCart.classList.contains("show")) {
        popupCart.classList.remove("show");       
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