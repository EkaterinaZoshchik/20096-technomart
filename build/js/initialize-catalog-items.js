'use strict';

(function () {
  var breadcrumbsLinkGroup = document.querySelector('.breadcrumbs__link--group');
  var catalogPageTitle = document.querySelector('.catalog-page__title');
  var subnav = document.querySelector('.subnav');
  var items = document.querySelectorAll('.catalog-item');
  var priceMinElement = document.getElementById('min-price');
  var priceMaxElement = document.getElementById('max-price');
  var capacityMinElement = document.getElementById('min-capacity');
  var capacityMaxElement = document.getElementById('max-capacity');
  var weightMinElement = document.getElementById('min-weight');
  var weightMaxElement = document.getElementById('max-weight');
  var brandsFilterWrapper = document.querySelector('.form__brands-wrapper');
  var brandsFilterTemplate = document.getElementById('brands-filter-template');
  var brandsFilter = document.querySelectorAll('.form__brands-filter input[type=checkbox]');
  var powerSupplyFilter = document.querySelector('.form__power-supply-filter');
  var submit = document.querySelector('.form__btn');
  var sortingList = document.querySelector('.catalog-page__sorting-list');
  var priceSortingLink = sortingList.querySelector('.catalog-page__sorting-link--price');
  var capacitySortingLink = sortingList.querySelector('.catalog-page__sorting-link--capacity');
  var weightSortingLink = sortingList.querySelector('.catalog-page__sorting-link--weight');
  var orderAscSortingLink = sortingList.querySelector('.catalog-page__sorting-order--asc');
  var orderDescSortingLink = sortingList.querySelector('.catalog-page__sorting-order--desc');

  window.tryGetHashParam('group', function (groupValue) {
    breadcrumbsLinkGroup.textContent = groupValue;
    catalogPageTitle.textContent = groupValue;
  });

  window.load (BRANDS_SERVICE_URL, null, function (brands) {
    var brandsData = brands.data;

    for (var i = 0; i < brandsData.length; i++) {
      var brandsItem = brandsFilterTemplate.content.querySelector('.form__checkbox-block').cloneNode(true);
      var brandCheckbox = brandsItem.querySelector('.form__checkbox');
      var brandCheckboxLabel = brandsItem.querySelector('.form__checkbox-label');

      brandCheckbox.setAttribute('id', brandsData[i].name);
      brandCheckbox.setAttribute('name', brandsData[i].name);
      brandCheckboxLabel.setAttribute('for', brandsData[i].name);
      brandCheckboxLabel.textContent = brandsData[i].name;

      brandsFilterWrapper.appendChild(brandsItem);
    }
  });

  var onCatalogItemsLoaded = function (parsedData) {
    var pageNumbers = Math.ceil(parsedData.total / parsedData.limit);
    var selectedPageNumber = parsedData.skip / parsedData.limit;
    window.showCatalogItems(parsedData.data, pageNumbers, selectedPageNumber);
  };

  var getParamsForLoad = function () {
    var priceMinDefaultValue = parseInt(document.getElementById('min-price').getAttribute('placeholder')) * 100;
    var priceMaxDefaultValue = parseInt(document.getElementById('max-price').getAttribute('placeholder')) * 100;
    var capacityMinDefaultValue = parseInt(document.getElementById('min-capacity').getAttribute('placeholder'));
    var capacityMaxDefaultValue = parseInt(document.getElementById('max-capacity').getAttribute('placeholder'));
    var weightMinDefaultValue = parseFloat(document.getElementById('min-weight').getAttribute('placeholder')) * 1000;
    var weightMaxDefaultValue = parseFloat(document.getElementById('max-weight').getAttribute('placeholder')) * 1000;
    var params = {
      '$limit': items.length,
      '$skip': window.getHashParam('page', 0) * items.length,
      'price[$gte]': window.getHashParam('priceMin', priceMinDefaultValue),
      'price[$lte]': window.getHashParam('priceMax', priceMaxDefaultValue),
      'capacity[$gte]': window.getHashParam('capacityMin', capacityMinDefaultValue),
      'capacity[$lte]': window.getHashParam('capacityMax', capacityMaxDefaultValue),
      'weight[$gte]': window.getHashParam('weightMin', weightMinDefaultValue),
      'weight[$lte]': window.getHashParam('weightMax', weightMaxDefaultValue),
      'powerSupply': window.getHashParam('powerSupply', 'all')
    }

    params['$sort['+ window.getHashParam('sortField', 'price') +']'] = window.getHashParam('sortDir', '1');

    if (params.powerSupply === 'all') {
      delete params.powerSupply;
    }

    window.tryGetHashParam('brand', function(brands) {
      params['brand[$in]'] = brands;
    });

    window.tryGetHashParam('group', function(group) {
      params['group'] = group;
    });

    return params;
  };

  window.tryGetHashParam('priceMin', function (priceMinValue) {
    priceMinElement.value = priceMinValue / 100;
  });
  window.tryGetHashParam('priceMax', function (priceMaxValue) {
    priceMaxElement.value = priceMaxValue / 100;
  });
  window.tryGetHashParam('capacityMin', function (capacityMinValue) {
    capacityMinElement.value = capacityMinValue;
  });
  window.tryGetHashParam('capacityMax', function (capacityMaxValue) {
    capacityMaxElement.value = capacityMaxValue;
  });
  window.tryGetHashParam('weightMin', function (weightMinValue) {
    weightMinElement.value = weightMinValue / 1000;
  });
  window.tryGetHashParam('weightMax', function (weightMaxValue) {
    weightMaxElement.value = weightMaxValue / 1000;
  });
  window.tryGetHashParam('brand', function (brandsValue) {
    for (var i = 0; i < brandsValue.length; i++) {
      for (var j = 0; j < brandsFilter.length; j++) {
        if (brandsValue[i] === brandsFilter[j].name) {
          brandsFilter[j].setAttribute('checked', true);
        }
      }
    }
  });
  window.tryGetHashParam('powerSupply', function (powerSupplyValue) {
    powerSupplyFilter.querySelector('input[value='+powerSupplyValue+']').setAttribute('checked', true);
  });

  var syncSortingWithHash = function () {
    var sortingLinks = sortingList.querySelectorAll('.catalog-page__sorting-link');
    for (var i = 0; i < sortingLinks.length; i++) {
      sortingLinks[i].classList.remove('catalog-page__sorting-link--selected');
    }
    var sortFieldValue = window.getHashParam('sortField', 'price');
    var selectedSortingLink = sortingList.querySelector('.catalog-page__sorting-link--'+sortFieldValue);
    selectedSortingLink.classList.add('catalog-page__sorting-link--selected');

    var sortingOrderLinks = sortingList.querySelectorAll('.catalog-page__sorting-order');
    for (var i = 0; i < sortingOrderLinks.length; i++) {
      sortingOrderLinks[i].classList.remove('catalog-page__sorting-order--selected');
    }
    var sortOrderValue = window.getHashParam('sortDir', 1);
    var sortOrderSelected = sortOrderValue === 1 ? 'asc' : 'desc';
    var selectedSortingOrderLink = sortingList.querySelector('.catalog-page__sorting-order--'+sortOrderSelected);
    selectedSortingOrderLink.classList.add('catalog-page__sorting-order--selected');
  };

  syncSortingWithHash();
  window.load(CATALOG_ITEMS_SERVICE_URL, getParamsForLoad(), onCatalogItemsLoaded);

  window.onhashchange = function() {
    syncSortingWithHash();
    window.load(CATALOG_ITEMS_SERVICE_URL, getParamsForLoad(), onCatalogItemsLoaded);
    window.tryGetHashParam('group', function (groupValue) {
      breadcrumbsLinkGroup.textContent = groupValue;
      catalogPageTitle.textContent = groupValue;
    });
  };

  submit.addEventListener('click', function (event) {
    event.preventDefault();
    window.deleteHashParam('page');
    var priceMinValue = parseInt(priceMinElement.value);
    if (isNaN(priceMinValue) === false) {
      window.setHashParam('priceMin', priceMinValue * 100);
    }
    var priceMaxValue = parseInt(priceMaxElement.value);
    if (isNaN(priceMaxValue) === false) {
      window.setHashParam('priceMax', priceMaxValue * 100);
    }
    var capacityMinValue = parseInt(capacityMinElement.value);
    if (isNaN(capacityMinValue) === false) {
      window.setHashParam('capacityMin', capacityMinValue);
    }
    var capacityMaxValue = parseInt(capacityMaxElement.value);
    if (isNaN(capacityMaxValue) === false) {
      window.setHashParam('capacityMax', capacityMaxValue);
    }
    var weightMinValue = parseFloat(weightMinElement.value.replace(',','.').replace(' ',''));
    if (isNaN(weightMinValue) === false) {
      window.setHashParam('weightMin', weightMinValue * 1000);
    }
    var weightMaxValue = parseFloat(weightMaxElement.value.replace(',','.').replace(' ',''));
    if (isNaN(weightMaxValue) === false) {
      window.setHashParam('weightMax', weightMaxValue * 1000);
    }
    var brandsValue = Array.from(document.querySelectorAll('.form__brands-filter input[type=checkbox]:checked')).map(x=>x.name);
    if (brandsValue.length !== 0) {
      window.setHashParam('brand', brandsValue);
    } else {
      window.deleteHashParam('brand');
    }
    var powerSupplyValue = powerSupplyFilter.querySelector('input[name="powerSupply"]:checked').value;
    if (powerSupplyValue !== 'all') {
      window.setHashParam('powerSupply', powerSupplyValue);
    }
  });

  priceSortingLink.addEventListener('click', function () {
    event.preventDefault();
    window.setHashParam('sortField', 'price');
  });

  capacitySortingLink.addEventListener('click', function () {
    event.preventDefault();
    window.setHashParam('sortField', 'capacity');
  });

  weightSortingLink.addEventListener('click', function () {
    event.preventDefault();
    window.setHashParam('sortField', 'weight');
  });

  orderAscSortingLink.addEventListener('click', function () {
    event.preventDefault();
    window.setHashParam('sortDir', 1);
  });

  orderDescSortingLink.addEventListener('click', function () {
    event.preventDefault();
    window.setHashParam('sortDir', -1);
  });
})();
