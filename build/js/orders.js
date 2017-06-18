'use strict';

var ordersBlock = document.querySelector('.orders');
var params = {$limit: 50};

window.load (ORDERS_SERVICE_URL, params, function (orders) {
  var ordersData = orders.data;

  var ids = ordersData.reduce((result, order) => result.concat(order.orderItems), []).map(item => item.productId);
  var ordersProductIds = [...new Set(ids)];
  var params = {'_id[$in]': ordersProductIds, $limit: 100};

  window.load (CATALOG_ITEMS_SERVICE_URL, params, function (ordersProducts) {
    var ordersProductsData = ordersProducts.data;
    var productsInOrder = document.querySelectorAll('.orders__item-data');

    productsInOrder.forEach(function (productsItem) {
      var productPicture = productsItem.querySelector('.orders__product-picture');
      var productTitle = productsItem.querySelector('.orders__product-title');

      ordersProductsData.forEach(function (itemData) {
        if (productsItem.classList.contains('id-' + itemData._id)) {
          productPicture.setAttribute('src', IMAGES_HOST + itemData.imgSrc);
          productPicture.setAttribute('alt', itemData.name);
          productTitle.textContent = itemData.name;
        }
      })
    });
  });

  for (var i = 0; i < ordersData.length; i++) {
    var ordersItemTemplate = document.getElementById('orders-item-template');
    var ordersItem = ordersItemTemplate.content.querySelector('.orders__item').cloneNode(true);
    var ordersHeaderControl = ordersItem.querySelector('.orders__header-control');
    var ordersId = ordersItem.querySelector('.orders__id');
    var ordersDataBlock = ordersItem.querySelector('.orders__data-block');
    var ordersRecipientDataBlock = ordersItem.querySelector('.orders__recipient-data');
    var ordersTotalSum = ordersItem.querySelector('.orders__total-sum');
    var ordersStatus = ordersItem.querySelector('.orders__status');
    var ordersDate = ordersItem.querySelector('.orders__date');
    var ordersAddress = ordersItem.querySelector('.orders__address');
    var ordersLastName = ordersItem.querySelector('.orders__product-last-name');
    var ordersFirstName = ordersItem.querySelector('.orders__product-first-name');
    var ordersMiddleName = ordersItem.querySelector('.orders__product-middle-name');
    var ordersTel = ordersItem.querySelector('.orders__tel');
    var ordersRobokassa = ordersItem.querySelector('.orders__robokassa');
    var totalPricesArray = [];

    ordersId.textContent = ordersData[i]._id;
    ordersDate.textContent = ordersData[i].date.split('T')[0].split('-').reverse().join('.');
    ordersAddress.textContent = ordersData[i].address;
    ordersLastName.textContent = ordersData[i].lastName;
    ordersFirstName.textContent = ordersData[i].firstName;
    ordersMiddleName.textContent = ordersData[i].middleName;
    ordersTel.textContent = ordersData[i].tel;

    if(ordersData[i].robokassa){
        var params=[];
        for(var key in ordersData[i].robokassa){
            params.push(key+'='+ordersData[i].robokassa[key]);
        }
        ordersRobokassa.src = ordersRobokassa.src + '?' + params.join('&');
        ordersRobokassa.classList.add('show');
        ordersStatus.textContent = 'Ожидает оплаты';
    } else if(ordersData[i].invoiceId){
        ordersStatus.textContent = 'Оплачен';
    } else {
        ordersStatus.textContent = 'В обработке';
    }

    ordersBlock.appendChild(ordersItem);

    for (var k = 0; k < ordersData[i].orderItems.length; k++) {
      var ordersItemDataTemplate = document.getElementById('orders-data-template');
      var ordersItemData = ordersItemDataTemplate.content.querySelector('.orders__item-data').cloneNode(true);
      var ordersProductId = ordersItemData.querySelector('.orders__product-id');
      var ordersQuantity = ordersItemData.querySelector('.orders__quantity');
      var ordersPrice = ordersItemData.querySelector('.orders__price');

      ordersItemData.classList.add('id-' + ordersData[i].orderItems[k].productId);
      ordersProductId.textContent = ordersData[i].orderItems[k].productId;
      ordersQuantity.textContent = ordersData[i].orderItems[k].quantity;
      ordersPrice.textContent = ordersData[i].orderItems[k].price / 100 + ' р.';

      totalPricesArray.push(ordersData[i].orderItems[k].price * ordersData[i].orderItems[k].quantity);

      ordersDataBlock.appendChild(ordersItemData);
    }

    var totalSum = totalPricesArray.reduce((sum, currentItem) => sum + currentItem, 0);
    ordersTotalSum.textContent = totalSum / 100 + ' р.';

    var onOrdersHeaderControlHandler = function (ordersDataBlock) {
      return function (event) {
        if (ordersDataBlock.classList.contains('orders__display-none')) {
          ordersDataBlock.classList.remove('orders__display-none');
          event.target.textContent = 'Свернуть';
        } else {
          ordersDataBlock.classList.add('orders__display-none');
          event.target.textContent = 'Развернуть';
        }
      }
    };

    ordersHeaderControl.addEventListener('click', onOrdersHeaderControlHandler(ordersDataBlock));
  }
});
