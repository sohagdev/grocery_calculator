// UI Controller
const UICtrl = (function () {
  // // Get all the UI vars
  const UISelectors = {
    itemList: '#item-list',
    listItems: '#item-list li',
    addBtn: '.add-btn',
    updateBtn: '.update-btn',
    deleteBtn: '.delete-btn',
    backBtn: '.back-btn',
    clearBtn: '.clear-btn',
    itemNameInput: '#item-name',
    itemAmountInput: '#item-amount',
    totalAmount: '.total-amount',
    showError: '.showerror',
  };

  // public methods
  return {
    populateItemList: function (items) {
      let html = '';

      items.forEach((item) => {
        html += `
        <li class="collection-item" id="item-${item.id}">
        <strong>${item.name}:</strong> <em>${item.amount} Taka</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>
        `;
      });
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },
    // Get the input fields
    getItmeInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        amount: document.querySelector(UISelectors.itemAmountInput).value,
      };
    },
    // Add item to the List
    addItemList: function (item) {
      // Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create a li elemetn
      const li = document.createElement('li');
      // add class name
      li.className = 'collection-item';
      // add ID number
      li.id = `item-${item.id}`;
      // add inner html
      li.innerHTML = `
      <strong>${item.name}:</strong> <em>${item.amount} Taka</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      `;
      // Insert the li to the list
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },
    // update the UI
    updateListItem: function (item) {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn Node list into an array
      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        const itemId = listItem.getAttribute('id');
        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
           <strong>${item.name}:</strong> <em>${item.amount} Taka</em>
           <a href="#" class="secondary-content">
             <i class="edit-item fa fa-pencil"></i>
           </a>
           `;
        }
      });
    },
    // Delete the selected item
    deleteListItem: function (id) {
      const itemId = `#item-${id}`;
      const item = document.querySelector(itemId);
      item.remove();
    },
    // Clear all the items form the UI
    clearAllItemsUI: function () {
      let listItems = document.querySelectorAll(UISelectors.listItems);
      // Turn Node list into an array
      listItems = Array.from(listItems);
      listItems.forEach((item) => {
        item.remove();
      });
    },
    // clear the input fields from the UI
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemAmountInput).value = '';
    },
    // add edit item to form
    addItemToForm: function () {
      document.querySelector(
        UISelectors.itemNameInput
      ).value = ItemCtrl.getCurrentItem().name;
      document.querySelector(
        UISelectors.itemAmountInput
      ).value = ItemCtrl.getCurrentItem().amount;
      UICtrl.showEditState();
    },
    // show the update button
    showEditState: function () {
      document.querySelector(UISelectors.addBtn).style.display = 'none';
      document.querySelector(UISelectors.updateBtn).style.display = 'inline';
      document.querySelector(UISelectors.deleteBtn).style.display = 'inline';
      document.querySelector(UISelectors.backBtn).style.display = 'inline';
    },

    // Hide the list
    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },
    showTotalAmount: function (total) {
      document.querySelector(UISelectors.totalAmount).textContent = total;
    },
    clearEditState: function () {
      UICtrl.clearInput();
      document.querySelector(UISelectors.addBtn).style.display = 'inline';
      document.querySelector(UISelectors.updateBtn).style.display = 'none';
      document.querySelector(UISelectors.deleteBtn).style.display = 'none';
      document.querySelector(UISelectors.backBtn).style.display = 'none';
    },
    // Return the UISelectors
    getSelectors: function () {
      return UISelectors;
    },
  };
})();
