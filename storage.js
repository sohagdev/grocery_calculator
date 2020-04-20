// Storage Controller
const StorageCtrl = (function () {
  // Public Methods
  return {
    storeItem: function (item) {
      let items;

      if (localStorage.getItem('items') === null) {
        items = [];
        // push item to the empty array
        items.push(item);
        // Set the local Storage
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        // Get the data form local storage
        items = JSON.parse(localStorage.getItem('items'));
        // Push new item
        items.push(item);
        // Set the local Storage
        localStorage.setItem('items', JSON.stringify(items));
      }
    },
    getItemDateStorage: function () {
      let items;
      if (localStorage.getItem('items') === null) {
        items = [];
      } else {
        items = JSON.parse(localStorage.getItem('items'));
      }
      return items;
    },
    updateLocalStorage: function (updatedItem) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (updatedItem.id === item.id) {
          items.splice(index, 1, updatedItem);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    deleteFormLocalStorage: function (id) {
      let items = JSON.parse(localStorage.getItem('items'));

      items.forEach((item, index) => {
        if (id === item.id) {
          items.splice(index, 1);
        }
      });
      localStorage.setItem('items', JSON.stringify(items));
    },
    clearAllformLocalStorage: function () {
      localStorage.removeItem('items');
    },
  };
})();
