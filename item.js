// Item Controller
const ItemCtrl = (function () {
  // Create the item constructor
  const Item = function (id, name, amount) {
    this.id = id;
    this.name = name;
    this.amount = amount;
  };
  const data = {
    // items: [
    //   // { id: 0, name: 'Rice', amount: '30' },
    //   // { id: 1, name: 'Oil', amount: '50' },
    //   // { id: 2, name: 'Milk', amount: '60' },
    // ],
    items: StorageCtrl.getItemDateStorage(),
    currentItem: null,
    totalAmount: 0,
  };
  // All the public methods
  return {
    //get the item
    getData: function () {
      return data.items;
    },
    // Add item
    addItem: function (name, amount) {
      // Crete an ID
      let ID;
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }
      // turn amounts in number
      amount = parseInt(amount);
      // Create new item
      newItem = new Item(ID, name, amount);
      // Push newItem into the data structure
      data.items.push(newItem);
      return newItem;
    },
    // get the item id to edit
    getItemById: function (id) {
      let found = null;
      /// loop through item
      data.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    // Set the Current Item
    setCurrentItem: function (item) {
      data.currentItem = item;
    },
    // Get the Current item
    getCurrentItem: function () {
      return data.currentItem;
    },
    // Get the total amount
    getTotalAmount: function () {
      let total = 0;
      data.items.forEach((item) => {
        total += item.amount;
      });
      data.totalAmount = total;
      // return the total amount
      return data.totalAmount;
    },
    // update the item
    updateItem: function (name, amount) {
      // Turn amount into a number
      amount = parseInt(amount);
      let found = null;
      /// loop through item
      data.items.forEach((item) => {
        if (item.id === data.currentItem.id) {
          item.name = name;
          item.amount = amount;
          found = item;
        }
      });
      return found;
    },
    // Delete the item
    deleteItem: function (id) {
      // Get the ids
      const ids = data.items.map(function (item) {
        return item.id;
      });
      // get index
      const index = ids.indexOf(id);
      // Remove the item
      data.items.splice(index, 1);
    },
    // Clear all the items
    clearAllItems: function () {
      data.items = [];
    },
    // load the item
    logData: function () {
      return data;
    },
  };
})();
