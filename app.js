// App Controller
const AppCtrl = (function (ItemCtrl, UICtrl, StorageCtrl) {
  // Load Event listeners
  const loadEventListeners = function () {
    // Get all the selectors form the UICtrl
    const UISelectors = UICtrl.getSelectors();
    // get the input fields
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', addItemSubmit);
    // Disable any submit click
    document.addEventListener('keypress', function (e) {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });
    // edit icon click
    document
      .querySelector(UISelectors.itemList)
      .addEventListener('click', itemEditSubmit);
    // update load event
    document
      .querySelector(UISelectors.updateBtn)
      .addEventListener('click', itemUpdateSubmit);
    // Delete load event
    document
      .querySelector(UISelectors.deleteBtn)
      .addEventListener('click', itemDeleteSubmit);
    // BackBtn load event
    document
      .querySelector(UISelectors.backBtn)
      .addEventListener('click', itemBackSubmit);
    // clearBtn load event
    document
      .querySelector(UISelectors.clearBtn)
      .addEventListener('click', itemClearSubmit);
  };
  // Add Item to the UI with addBtn
  const addItemSubmit = function (e) {
    const input = UICtrl.getItmeInput();
    // Check if the input field is empty or not
    if (input.name === '' || input.amount === '') {
      // Show an error
      alert('Input Fields can not be empty...');
    } else {
      // add the Item to ItemCtrl
      const newItem = ItemCtrl.addItem(input.name, input.amount);
      // add the item to the UICtrl
      UICtrl.addItemList(newItem);
      // Get the total amount
      const totalAmount = ItemCtrl.getTotalAmount();
      // show total amount to the UI
      UICtrl.showTotalAmount(totalAmount);
      // Store item in the local Storage
      StorageCtrl.storeItem(newItem);
      // ClearINput fields
      UICtrl.clearInput();
    }
    e.preventDefault();
  };
  // Edit item
  const itemEditSubmit = function (e) {
    if (e.target.classList.contains('edit-item')) {
      const listID = e.target.parentElement.parentElement.id;
      // Break into an array
      const listIDArr = listID.split('-');
      // Get the id
      const id = parseInt(listIDArr[1]);
      // Get the item
      const itemToEdit = ItemCtrl.getItemById(id);
      // Set the current Item
      ItemCtrl.setCurrentItem(itemToEdit);
      // Add item to the form
      UICtrl.addItemToForm();
    }
    e.preventDefault();
  };
  // Update item
  const itemUpdateSubmit = function (e) {
    const input = UICtrl.getItmeInput();
    // update the data sturcture in the item controller
    const updatedItem = ItemCtrl.updateItem(input.name, input.amount);
    // update the UI
    UICtrl.updateListItem(updatedItem);
    // Get the total amount
    const totalAmount = ItemCtrl.getTotalAmount();
    // show total amount to the UI
    UICtrl.showTotalAmount(totalAmount);
    // Update local Storage
    StorageCtrl.updateLocalStorage(updatedItem);
    // clear edit state
    UICtrl.clearEditState();
    e.preventDefault();
  };
  // Delete Item
  const itemDeleteSubmit = function (e) {
    // Get Current item
    const currentItem = ItemCtrl.getCurrentItem();
    // Delete form Data Structure
    ItemCtrl.deleteItem(currentItem.id);
    // Delete form the UI
    UICtrl.deleteListItem(currentItem.id);
    // Get the total amount
    const totalAmount = ItemCtrl.getTotalAmount();
    // show total amount to the UI
    UICtrl.showTotalAmount(totalAmount);
    // Delete From local Storage
    StorageCtrl.deleteFormLocalStorage(currentItem.id);
    // clear edit state
    UICtrl.clearEditState();
    e.preventDefault();
  };
  // Back Btn
  const itemBackSubmit = function (e) {
    // Clear Edit State
    UICtrl.clearEditState();
    e.preventDefault();
  };
  // Clear btn
  const itemClearSubmit = function (e) {
    ItemCtrl.clearAllItems();
    // Get the total amount
    const totalAmount = ItemCtrl.getTotalAmount();
    // show total amount to the UI
    UICtrl.showTotalAmount(totalAmount);
    // clear edit state
    UICtrl.clearEditState();
    // clear all the list form UI
    UICtrl.clearAllItemsUI();
    // clear all form the local Storage
    StorageCtrl.clearAllformLocalStorage();
    // hide the UL
    UICtrl.hideList();
    e.preventDefault();
  };
  // Public methods
  return {
    init: function () {
      // Clear edit state
      UICtrl.clearEditState();
      // Fetch the data fomr the item structures
      const items = ItemCtrl.getData();

      if (items.length === 0) {
        // hide the UL
        UICtrl.hideList();
      } else {
        // populate the item list into the ui controller
        UICtrl.populateItemList(items);
      }
      // Get the total amount
      const totalAmount = ItemCtrl.getTotalAmount();
      // show total amount to the UI
      UICtrl.showTotalAmount(totalAmount);
      // Load All event
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl, StorageCtrl);
/// Initialize the app controller
AppCtrl.init();
