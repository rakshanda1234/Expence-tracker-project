function saveToLocalStorage(event) {
  event.preventDefault();
  const name = event.target.name.value;
  const amount = event.target.amount.value;
  const description = event.target.description.value;
  const category = event.target.category.value;

  //localStorage.setItem("name",name);
  // localStorage.setItem("amount", amount);
  // localStorage.setItem("description", description);
  //localStorage.setItem("category",category);
  const obj = {
    name,
    amount,
    description,
    category,
  };

  localStorage.setItem(obj.name, JSON.stringify(obj));
  showNewUserOnScreen(obj);
}

window.addEventListener("DOMContentLoaded", () => {
  const localStorageObj = localStorage;
  const localstoragekeys = Object.keys(localStorageObj);

  for (var i = 0; i < localstoragekeys.length; i++) {
    const key = localstoragekeys[i];
    const userDetailsString = localStorageObj[key];
    const userDetailsObj = JSON.parse(userDetailsString);
    showNewUserOnScreen(userDetailsObj);
  }
});

function showNewUserOnScreen(user) {
  if (localStorage.getItem(user.name) !== null) {
    removeUserFromScreen(user.name);
  }

  const parentNode = document.getElementById("listOfExpenses");
  const childHTML = `<li> ${user.name} - ${user.amount} - ${user.description} - ${user.category}
  <button onClick=deleteUser("${user.name}")>Delete</button>
  <button onClick=editUserDetails("${user.name}","${user.amount}","${user.description}","${user.category}")>Edit</button>
  </li>`;

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

//Edit User
function editUserDetails(name, amount, description, category) {
  document.getElementById("name").value = name;
  document.getElementById("amount").value = amount;
  document.getElementById("description").value = description;
  document.getElementById("category").value = category;

  deleteUser(name);
}

function deleteUser(name) {
  console.log(name);
  localStorage.removeItem(name);
  removeUserFromScreen(name);
}

function removeUserFromScreen(name) {
  const parentNode = document.getElementById("listOfExpenses");
  const childNodeToBeDeleted = document.getElementById(name);

  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}
