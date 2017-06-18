(window.includeHTML = function() {
  var z, i, element, file, xhttp;
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    element = z[i];
    file = element.getAttribute("include-html");
    if (file) {
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          element.innerHTML = this.responseText;
          element.removeAttribute("include-html");
          var onLoad = element.getAttribute("on-load");
          eval(onLoad);
            element.removeAttribute("on-load");
          includeHTML();
        }
      }
      xhttp.open("GET", file, true);
      xhttp.send();
      return;
    }
  }
})();
