'use strict';

var subnav = document.querySelector('.subnav');
var navItemTemplate = document.getElementById('subnav-item-template')

window.load (GROUPS_SERVICE_URL, null, function (groups) {
  var groupsData = groups.data;

  for (var i = 0; i < groupsData.length; i++) {
    var navItem = navItemTemplate.content.querySelector('.subnav__item').cloneNode(true);
    var navLink = navItem.querySelector('.subnav__link');
    navLink.textContent = groupsData[i].name;
    navLink.setAttribute('href', 'catalog.html#{"group":"' + groupsData[i].name + '"}');

    navLink.addEventListener('click', function (event) {
      subnav.style.display = 'none';
      window.setTimeout(() => subnav.style.display = '', 500);
    });

    subnav.appendChild(navItem);
  }
});
