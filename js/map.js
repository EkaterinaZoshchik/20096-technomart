var  mapOpen = document.querySelector(".js-open-map"),
     mapPopup = document.querySelector(".modal-map"),
     mapClose = document.querySelector(".modal-map .modal-content-close");
      
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