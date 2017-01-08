(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController',AlreadyBoughtController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tbc = this;

  tbc.tbitems = ShoppingListCheckOffService.getTBItems();

  tbc.buy = function (itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
    console.log(itemIndex);
  };

  tbc.itemName = "";
  tbc.itemQuantity = "";

  tbc.addItem = function () {
    try {
      ShoppingListCheckOffService.addItem(tbc.itemName, tbc.itemQuantity);
    } catch (error) {
      tbc.errorMessage = error.message;
    }
  };

  tbc.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService){
  var abc = this;

  abc.abitems = ShoppingListCheckOffService.getABItems();
}


// If not specified, maxItems assumed unlimited
function ShoppingListCheckOffService() {
  var service = this;

  // List of to buy items
  var tb = [{ name:'cookies', quantity: 10}, { name:'chips', quantity: 5}, { name:'oranges',quantity: 4},{ name:'candies', quantity: 7}, { name: 'juices', quantity: 8}];
  // List of already bought items
  var ab = [];

  service.addItem = function (itemName, quantity) {
    if ((maxItems === undefined) ||
        (maxItems !== undefined) && (items.length < maxItems)) {
      var item = {
        name: itemName,
        quantity: quantity
      };
      items.push(item);
    }
    else {
      throw new Error("Max items (" + maxItems + ") reached.");
    }
  };

  service.removeItem = function (itemIndex) {
    items.splice(itemIndex, 1);
  };

  service.buyItem = function (itemIndex) {
    ab.push(tb[itemIndex]);
    tb.splice(itemIndex,1);
  };

  service.getTBItems = function () {
    return tb;
  };

  service.getABItems = function () {
    return ab;
  };
}


function ShoppingListServiceProvider() {
  var provider = this;

  provider.defaults = {
    maxItems: 10
  };

  provider.$get = function () {
    var shoppingList = new ShoppingListService(provider.defaults.maxItems);

    return shoppingList;
  };
}

})();
