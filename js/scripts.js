var currentListID = "l0";
initializeData;

//Adds data to localstorage
function addData(list) {
  // console.log(list)
  localStorage.setItem(list.title, JSON.stringify(list));
}

//adds data from json file to localstorage using addData() function
//Also checks for whether the user wants to reset localstorage
function initializeData(reset) {
  clearLists();
  // console.log("Hello World!",lists)
  let listOfLists = [];
  if (localStorage.getItem("listArchive")) {
    let listArchive = JSON.parse(localStorage.getItem("listArchive"));
    // console.log(listArchive)
    listArchive.forEach((list) => {
      listOfLists.push(list);
    });
  }

  //checks if user wants to reset localstorage
  //if true it first deletes all current data about existing lists
  if (reset == true) {
    // console.log(listOfLists)
    listOfLists.forEach((listname) => {
      localStorage.removeItem(listname.title);
    });
    localStorage.removeItem("listArchive");
  }

  //Check if localstorage exists
  //If it does stop running this
  //if not then continue
  if (localStorage.getItem("listArchive") !== null) {
    return;
  }

  //Adds the default lists again
  lists.forEach(addData);

  //Creates a list of all the default lists that were just added to localstorage
  listOfLists = [];
  lists.forEach((list) => {
    listOfLists.push({ title: list.title, id: list.id });
  });
  // console.log(listOfLists)
  localStorage.setItem("listArchive", JSON.stringify(listOfLists));

  //used for testing, checks if data is stored correctly
  // let checkList = []
  // listOfLists.forEach((listname)=>{
  //     let listInfo = JSON.parse(localStorage.getItem(listname))
  // checkList.push(JSON.parse(localStorage.getItem(listname)))
  // checkList.push(listInfo)
  // console.log(JSON.parse(localStorage.getItem(listname)))
  // console.log(listInfo)
  // })
  // console.log(checkList)
}

//Creates a List of the different to-do Lists
function createLists() {
  let listArchive = JSON.parse(localStorage.getItem("listArchive"));
  listArchive.forEach((list) => {
    let listData = JSON.parse(localStorage.getItem(list.title));
    // console.log(listData)

    //creates elements
    let listBody = document.createElement("div");
    let infoBlock = document.createElement("div");
    let listTitle = document.createElement("h1");
    let listDescription = document.createElement("p");
    let listRemoveButton = document.createElement("button");
    // let listEditButton = document.createElement("button");

    //adds innerhtml
    listRemoveButton.innerHTML = "Remove";
    // listEditButton.innerHTML = "Edit";
    listTitle.innerHTML = listData.title;
    listDescription.innerHTML = listData.description;
    //sets class and onclick
    listRemoveButton.setAttribute("class", "ms-auto hoverButtonRed btn");
    // listEditButton.setAttribute("class", "ms-auto hoverButtonGreen btn");
    listBody.setAttribute("class", "listBody d-flex flex-row");
    listBody.setAttribute("id", `${listData.id}`);
    infoBlock.setAttribute("onclick", `openSelectedList('${listData.id}')`);
    listRemoveButton.setAttribute("onclick", `removeList('${listData.id}')`);
    // listEditButton.setAttribute("onclick", `editLists('${listData.id}')`);
    infoBlock.setAttribute("class", "listOpener");
    listTitle.setAttribute("class", "listTitle");
    listDescription.setAttribute("class", "listDescription");
    //appends elements
    infoBlock.appendChild(listTitle);
    infoBlock.appendChild(listDescription);
    listBody.appendChild(infoBlock);
    // listBody.appendChild(listEditButton);
    listBody.appendChild(listRemoveButton);
    // console.log(listBody)

    document.getElementById("listContainer").appendChild(listBody);
  });
}

//Allows for new lists to be created
function addNewList() {
  if (document.getElementById("listForm")) {
    removeListForm();
  }
  //creates elements
  let listBody = document.createElement("form");
  let listInput = document.createElement("input");
  let listTitle = document.createElement("label");
  let listDescription = document.createElement("textarea");
  let acceptChangesButton = document.createElement("button");
  let removeChangesButton = document.createElement("button");
  let inputBox = document.createElement("div");
  let warningText = document.createElement("p");
  let warningTextdesc = document.createElement("p");

  //adds innerhtml
  listTitle.innerHTML = "List Title";
  acceptChangesButton.innerHTML = "Accept";
  removeChangesButton.innerHTML = "Remove";
  warningText.innerHTML =
    "The title needs to be between 4 and 40 characters long";
  warningTextdesc.innerHTML =
    "The description needs to be between 4 and 600 characters long";
  //sets class and onclick
  warningText.setAttribute("class", "warningText");
  warningTextdesc.setAttribute("class", "warningText");
  warningText.setAttribute("id", "warningTextTitleList");
  warningTextdesc.setAttribute("id", "warningTextDescList");
  warningText.setAttribute("style", "display:none");
  warningTextdesc.setAttribute("style", "display:none");
  acceptChangesButton.setAttribute(
    "class",
    "ms-auto hoverButtonGreen btn disabled"
  );
  acceptChangesButton.setAttribute("id", "listFormButton");
  removeChangesButton.setAttribute("class", "ms-auto hoverButtonRed btn");
  listBody.setAttribute("class", "listBody d-flex flex-row");
  listBody.setAttribute("id", "listForm");
  listBody.setAttribute("onsubmit", "return false");
  acceptChangesButton.setAttribute("onclick", `acceptNewList()`);
  removeChangesButton.setAttribute("onclick", "removeListForm()");
  listInput.setAttribute("class", "w-100 mb-1");
  listInput.setAttribute("onchange", `checkForErrors("listForm")`);
  inputBox.setAttribute("class", "p-2");
  listTitle.setAttribute("class", "listTitle");
  listDescription.setAttribute("id", "newListDescription");
  listDescription.setAttribute("onchange", `checkForErrors("listForm")`);
  listInput.setAttribute("id", "newListTitle");
  //appends elements
  inputBox.appendChild(listTitle);
  inputBox.appendChild(listInput);
  inputBox.appendChild(warningText);
  inputBox.appendChild(listDescription);
  inputBox.appendChild(warningTextdesc);
  listBody.appendChild(inputBox);
  listBody.appendChild(acceptChangesButton);
  listBody.appendChild(removeChangesButton);

  document.getElementById("listContainer").appendChild(listBody);
}
//finalises the creation of new lists
function acceptNewList() {
  //
  let listArchive = JSON.parse(localStorage.getItem("listArchive"));

  let newListID = newID("list");

  let listBody = document.createElement("div");
  let infoBlock = document.createElement("div");
  let listTitle = document.createElement("h1");
  let listDescription = document.createElement("p");
  let listRemoveButton = document.createElement("button");

  //adds innerhtml
  listRemoveButton.innerHTML = "Remove";
  listTitle.innerHTML = document.getElementById("newListTitle").value;
  listDescription.innerHTML =
    document.getElementById("newListDescription").value;
  //sets class and onclick
  listRemoveButton.setAttribute("class", "ms-auto hoverButtonRed btn");
  listBody.setAttribute("class", "listBody d-flex flex-row");
  listBody.setAttribute("id", `${newListID}`);
  infoBlock.setAttribute("onclick", `openSelectedList('${newListID}')`);
  listRemoveButton.setAttribute("onclick", `removeList('${newListID}')`);
  infoBlock.setAttribute("class", "listOpener");
  listTitle.setAttribute("class", "listTitle");
  listDescription.setAttribute("class", "listDescription");
  //appends elements
  infoBlock.appendChild(listTitle);
  infoBlock.appendChild(listDescription);
  listBody.appendChild(infoBlock);
  listBody.appendChild(listRemoveButton);
  // console.log(listBody)

  document.getElementById("listContainer").appendChild(listBody);

  let newList = {
    id: newListID,
    title: document.getElementById("newListTitle").value,
    description: document.getElementById("newListDescription").value,
    listItems: [],
  };

  localStorage.setItem(
    document.getElementById("newListTitle").value,
    JSON.stringify(newList)
  );

  listArchive.push({
    title: newList.title,
    id: newListID,
  });
  // console.log(listArchive)
  localStorage.setItem("listArchive", JSON.stringify(listArchive));

  removeListForm();
}

//Allows for lists to be removed
function removeList(listID) {
  //Find list data
  let listArchive = JSON.parse(localStorage.getItem("listArchive"));
  //   console.log(listArchive)
  let listTitle = "";
  let newArchive;
  listArchive.forEach((listInfo, index) => {
    // console.log(listInfo.id,listID)

    if (listInfo.id == listID) {
      newArchive = listArchive.splice(index, 1);
      listTitle = listInfo.title;
    }
  });
  localStorage.removeItem(listTitle);
  // console.log(listArchive)
  localStorage.setItem("listArchive", JSON.stringify(listArchive));

  document.getElementById(listID).remove();
  if (currentListID == listID) {
    clearListItems();
  }
}

//Used for giving new ids to lists and tasks
function newID(idFor) {
  //Creates a new id for a new task, by looking at the curretn amount of tasks, and then
  //by comparing if the new id already exists
  if (idFor == "task") {
    let listArchive = JSON.parse(localStorage.getItem("listArchive"));
    // console.log(listArchive)
    let listTitle = "";
    listArchive.forEach((listInfo) => {
      // console.log(listInfo.id,currentListID)
      if (listInfo.id == currentListID) {
        listTitle = listInfo.title;
        // console.log(listTitle)
      }
    });

    let listLength = JSON.parse(localStorage.getItem(listTitle));
    let newID = listLength.listItems.length;

    for (let disallowID = 0; disallowID < 1; ) {
      // console.log("Hellow1")
      disallowID = 0;
      listLength.listItems.forEach((list) => {
        // console.log("Hellow2",`${newID}`,list.id)
        if (newID == list.id) {
          newID += 1;
          disallowID -= 1;
          // console.log(disallowID)
        }
      });
      // console.log(disallowID)
      if (disallowID == 0) {
        disallowID += 1;
      }
    }

    return newID;
  }
  //Creates a new id for a new list, by looking at the curretn amount of lists, and then
  //by comparing if the new id already exists
  else if (idFor == "list") {
    let listCount = JSON.parse(localStorage.getItem("listArchive"));
    let newID = listCount.length + 1;
    for (let disallowID = 0; disallowID < 1; ) {
      // console.log("Hellow1")
      disallowID = 0;
      listCount.forEach((list) => {
        // console.log("Hellow2",`l${newID}`,list.id)
        if (`l${newID}` == list.id) {
          newID += 1;
          disallowID -= 1;
          // console.log(disallowID)
        }
      });
      // console.log(disallowID)
      if (disallowID == 0) {
        disallowID += 1;
      }
    }
    return `l${newID}`;
  }
}

//creates new tasks in the current list
function addNewListItem() {
  if (document.getElementById("taskForm")) {
    removeTaskForm();
  }

  let listArchive = JSON.parse(localStorage.getItem("listArchive"));
  //   console.log(listArchive)
  //
  let listTitle = "";
  listArchive.forEach((listInfo) => {
    // console.log(listInfo.id,listID)
    if (listInfo.id == currentListID) {
      listTitle = listInfo.title;
    }
  });

  let data = {
    id: newID("task"),
    type: "checkbox",
  };
  //creates elements
  let itemBody = document.createElement("form");
  let itemInput = document.createElement("input");
  let itemLabel = document.createElement("label");
  let descriptionBox = document.createElement("textarea");
  let acceptChangesButton = document.createElement("button");
  let removeChangesButton = document.createElement("button");
  let inputBox = document.createElement("div");
  let warningText = document.createElement("p");
  let warningTextdesc = document.createElement("p");
  // //adds innerhtml
  acceptChangesButton.innerHTML = "Accept";
  removeChangesButton.innerHTML = "Remove";
  itemLabel.innerHTML = "Add name:";
  warningText.innerHTML =
    "The title needs to be between 4 and 40 characters long";
  warningTextdesc.innerHTML =
    "The description needs to be between 4 and 600 characters long";
  // //sets class and onclick
  warningText.setAttribute("class", "warningText");
  warningTextdesc.setAttribute("class", "warningText");
  warningText.setAttribute("style", "display:none");
  warningTextdesc.setAttribute("style", "display:none");
  warningText.setAttribute("id", "warningTextTitleTask");
  warningTextdesc.setAttribute("id", "warningTextDescTask");
  acceptChangesButton.setAttribute("class", "hoverButtonGreen btn disabled");
  acceptChangesButton.setAttribute("id", "taskFormButton");
  removeChangesButton.setAttribute("class", "hoverButtonRed btn");
  itemBody.setAttribute("class", "listItem");
  itemBody.setAttribute("onsubmit", "return false");
  itemBody.setAttribute("id", "taskForm");
  itemInput.setAttribute("type", "text");
  itemInput.setAttribute("onchange", "checkForErrors('taskForm')");
  itemInput.setAttribute("class", "mb-1 w-100");
  itemInput.setAttribute("id", "newTaskName");
  descriptionBox.setAttribute("id", "newDescription");
  descriptionBox.setAttribute("onchange", "checkForErrors('taskForm')");
  acceptChangesButton.setAttribute(
    "onclick",
    ` acceptNewTask('${listTitle}','${data.id}')`
  );
  removeChangesButton.setAttribute("onclick", "removeTaskForm()");
  itemLabel.setAttribute("class", "itemTitle w-100");
  // //appends elements
  inputBox.appendChild(itemLabel);
  inputBox.appendChild(itemInput);
  inputBox.appendChild(warningText);
  inputBox.appendChild(descriptionBox);
  inputBox.appendChild(warningTextdesc);
  itemBody.appendChild(inputBox);
  itemBody.appendChild(acceptChangesButton);
  itemBody.appendChild(removeChangesButton);

  // console.log(itemBody)
  document.getElementById("listItems").appendChild(itemBody);
}

//removes form used for creating a new task, once it has been created
function removeTaskForm() {
  document.getElementById("taskForm").remove();
}

//removes form used for creating a new list, once it has been created
function removeListForm() {
  document.getElementById("listForm").remove();
}

//allows for changes made to new tasks to be finalized
function acceptNewTask(list, dataID) {
  //Data needed for creating new task
  let listToAddTo = JSON.parse(localStorage.getItem(list));
  // console.log(listToAddTo)
  let task = {
    id: dataID,
    type: "checkbox",
    name: document.getElementById("newTaskName").value,
    description: document.getElementById("newDescription").value,
  };
  // console.log(task)

  //creates elements
  let itemBody = document.createElement("div");
  let itemInput = document.createElement("input");
  let itemLabel = document.createElement("label");
  let descriptionBox = document.createElement("div");
  let itemDescription = document.createElement("p");
  let descriptionText = document.createElement("p");
  let itemRemoveButton = document.createElement("button");

  // //adds innerhtml
  itemRemoveButton.innerHTML = "Remove";
  itemLabel.innerHTML = task.name;
  itemDescription.innerHTML = task.description;
  descriptionText.innerHTML = "Description:";
  // //sets class and onclick
  itemRemoveButton.setAttribute("class", "hoverButtonRed btn");
  itemBody.setAttribute("class", "listItem");
  itemBody.setAttribute("id", `${task.id}`);
  itemInput.setAttribute("type", "checkbox");
  itemInput.setAttribute("class", "checkbox clicker");
  itemRemoveButton.setAttribute("onclick", `removeListItem(${task.id})`);
  itemInput.setAttribute("onclick", `completeTask(${task.id})`);
  itemLabel.setAttribute("onclick", `completeTask(${task.id})`);
  itemInput.setAttribute("name", `${task.name}`);
  itemLabel.setAttribute("class", "itemTitle clicker");
  itemLabel.setAttribute("for", `${task.name}`);
  // //appends elements
  itemBody.appendChild(itemInput);
  itemBody.appendChild(itemLabel);
  itemBody.appendChild(itemRemoveButton);
  descriptionBox.appendChild(descriptionText);
  descriptionBox.appendChild(itemDescription);
  itemBody.appendChild(descriptionBox);
  // console.log(itemBody)
  document.getElementById("listItems").appendChild(itemBody);
  //removes task form
  removeTaskForm();
  //adds new taks to localstorage
  listToAddTo.listItems.push(task);
  // console.log(listToAddTo)
  localStorage.setItem(`${list}`, JSON.stringify(listToAddTo));
}
//Allows for the removal of items in a list
function removeListItem(itemID) {
  let listArchive = JSON.parse(localStorage.getItem("listArchive"));
  //   console.log(listArchive)
  let listTitle = "";
  listArchive.forEach((listInfo) => {
    // console.log(listInfo.id,listID)

    if (listInfo.id == currentListID) {
      listTitle = listInfo.title;
    }
  });
  // console.log(listTitle)

  let list = JSON.parse(localStorage.getItem(listTitle));
  // console.log(list)
  let itemPosition = null;
  list.listItems.forEach((item, index) => {
    // console.log(item)
    if (item.id == itemID) {
      itemPosition = index;
      // console.log(item.id,itemPosition)
      return;
    }
  });
  if (itemPosition !== null) {
    list.listItems.splice(itemPosition, 1);
  }
  // console.log(list.listItems)
  localStorage.setItem(`${listTitle}`, JSON.stringify(list));
  document.getElementById(`${itemID}`).remove();
}
//clears the elements from the tasks part of the ui, so that a set of tasks can be loaded
function clearListItems() {
  let listOfItems = document.getElementById("listItems");
  while (listOfItems.firstChild) {
    listOfItems.removeChild(listOfItems.firstChild);
  }
}
//clears the elements from the tasks part of the ui, so that a set of tasks can be loaded
function clearLists() {
  let listOfItems = document.getElementById("listContainer");
  // console.log(listOfItems.childNodes.length)
  while (listOfItems.childNodes.length > 4) {
    listOfItems.removeChild(listOfItems.lastChild);
  }
}
//opens selected list
function openSelectedList(listid) {
  document
    .getElementById("addTask")
    .setAttribute("onclick", `addNewListItem(${currentListID})`);
  currentListID = listid;
  clearListItems();
  //Find list data
  if(JSON.parse(localStorage.getItem("listArchive")).length==0){
    return
  }
  let listArchive = JSON.parse(localStorage.getItem("listArchive"));
  //   console.log(listArchive)
  let listTitle = "";
  listArchive.forEach((listInfo) => {
    // console.log(listInfo.id,listid)

    if (listInfo.id == listid) {
      listTitle = listInfo.title;
    }
  });
  // console.log(listTitle);
  let listData = JSON.parse(localStorage.getItem(listTitle)).listItems;
  // console.log(listData)
  document.getElementById("selectedTitle").innerHTML = `${listTitle}`;
  //Create list items
  listData.forEach((data) => {
    //creates elements
    let itemBody = document.createElement("div");
    let itemInput = document.createElement("input");
    let itemLabel = document.createElement("label");
    let descriptionBox = document.createElement("div");
    let itemDescription = document.createElement("p");
    let descriptionText = document.createElement("p");
    let itemRemoveButton = document.createElement("button");
    let itemEditButton = document.createElement("button");

    // //adds innerhtml
    itemRemoveButton.innerHTML = "Remove";
    itemEditButton.innerHTML = "Edit";
    itemDescription.innerHTML = data.description;
    descriptionText.innerHTML = "Description:";
    // //sets class and onclick
    if (data.completed) {
      itemBody.setAttribute("class", "selectedListItem");
      itemInput.setAttribute("onclick", `incompleteTask(${data.id})`);
      itemInput.checked = true;
      itemLabel.setAttribute("onclick", `incompleteTask(${data.id})`);
      itemLabel.innerHTML = `<s>${data.name}</s>`;
    } else {
      itemLabel.innerHTML = data.name;
      itemBody.setAttribute("class", "listItem");
      itemInput.setAttribute("onclick", `completeTask(${data.id})`);
      itemLabel.setAttribute("onclick", `completeTask(${data.id})`);
    }
    itemRemoveButton.setAttribute("class", "hoverButtonRed btn");
    itemEditButton.setAttribute("class", "hoverButtonGreen btn");
    itemBody.setAttribute("id", `${data.id}`);
    itemInput.setAttribute("type", "checkbox");
    itemInput.setAttribute("class", "checkbox clicker");
    itemRemoveButton.setAttribute("onclick", `removeListItem(${data.id})`);
    itemEditButton.setAttribute("onclick", `editListItems(${data.id})`);
    itemInput.setAttribute("name", `${data.name}`);
    itemLabel.setAttribute("class", "itemTitle clicker");
    itemLabel.setAttribute("for", `${data.name}`);
    // //appends elements
    itemBody.appendChild(itemInput);
    itemBody.appendChild(itemLabel);
    itemBody.appendChild(itemEditButton);
    itemBody.appendChild(itemRemoveButton);
    descriptionBox.appendChild(descriptionText);
    descriptionBox.appendChild(itemDescription);
    itemBody.appendChild(descriptionBox);
    // console.log(itemBody)
    document.getElementById("listItems").appendChild(itemBody);
  });
}
//allows the user to complete tasks once they have done them
function completeTask(id) {
  document.getElementById(`${id}`).setAttribute("class", "selectedListItem");
  document
    .getElementById(`${id}`)
    .children[0].setAttribute("onclick", `incompleteTask(${id})`);
  document.getElementById(`${id}`).children[0].checked = true;
  document
    .getElementById(`${id}`)
    .children[1].setAttribute("onclick", `incompleteTask(${id})`);
  document.getElementById(`${id}`).children[1].innerHTML = `<s>${
    document.getElementById(`${id}`).children[1].innerHTML
  }</s>`;

  let listArchive = JSON.parse(localStorage.getItem("listArchive"));
  //   console.log(listArchive)
  let listTitle = "";
  listArchive.forEach((listInfo) => {
    // console.log(listInfo.id,listID)

    if (listInfo.id == currentListID) {
      listTitle = listInfo.title;
    }
  });
  // console.log(listTitle)
  //Data needed for creating new task
  let listToAddTo = JSON.parse(localStorage.getItem(listTitle));
  // console.log(listToAddTo)
  //adds new taks to localstorage
  let indexForChange;
  listToAddTo.listItems.forEach((listitem, index) => {
    if (listitem.id == id) {
      indexForChange = index;
    }
  });
  listToAddTo.listItems[indexForChange].completed = true;
  // console.log(listToAddTo)
  localStorage.setItem(`${listTitle}`, JSON.stringify(listToAddTo));
}

//allows the user to uncomplete tasks
function incompleteTask(id) {
  document.getElementById(`${id}`).setAttribute("class", "listItem");
  document.getElementById(`${id}`).children[0].checked = false;
  document
    .getElementById(`${id}`)
    .children[0].setAttribute("onclick", `completeTask(${id})`);
  document
    .getElementById(`${id}`)
    .children[1].setAttribute("onclick", `completeTask(${id})`);
  let revertedName = document
    .getElementById(`${id}`)
    .children[1].innerHTML.slice(3);
  revertedName = revertedName.slice(0, -4);
  document.getElementById(`${id}`).children[1].innerHTML = `${revertedName}`;

  let listArchive = JSON.parse(localStorage.getItem("listArchive"));
  //   console.log(listArchive)
  let listTitle = "";
  listArchive.forEach((listInfo) => {
    // console.log(listInfo.id,listID)

    if (listInfo.id == currentListID) {
      listTitle = listInfo.title;
    }
  });
  // console.log(listTitle)
  //Data needed for creating new task
  let listToAddTo = JSON.parse(localStorage.getItem(listTitle));
  // console.log(listToAddTo)
  //adds new taks to localstorage
  let indexForChange;
  listToAddTo.listItems.forEach((listitem, index) => {
    if (listitem.id == id) {
      indexForChange = index;
    }
  });
  listToAddTo.listItems[indexForChange].completed = false;
  // console.log(listToAddTo)
  localStorage.setItem(`${listTitle}`, JSON.stringify(listToAddTo));
}

//function for checking input fields for errors
function checkForErrors(itemID) {
  let titleCorrect = true;
  let descriptionCorrect = true;
  // console.log("Hello World")

  if (itemID == "listForm") {
    //get data
    let newItem = {
      id: itemID,
      title: document.getElementById("newListTitle").value,
      description: document.getElementById("newListDescription").value,
    };

    //check for errors
    if (newItem.title.length < 4 || newItem.title > 40) {
      titleCorrect = false;
    }
    if (newItem.description.length < 4 || newItem.description.length > 600) {
      descriptionCorrect = false;
    }
    // console.log(titleCorrect,descriptionCorrect)

    //if there are errors then show them to the user
    if (titleCorrect == false) {
      document.getElementById("newListTitle").style.border = "red solid 1px";
      document.getElementById("warningTextTitleList").style.display = "block";
    } else if (titleCorrect == true) {
      document.getElementById("newListTitle").style.border = "black solid 1px";
      document.getElementById("warningTextTitleList").style.display = "none";
    }
    if (descriptionCorrect == false) {
      document.getElementById("newListDescription").style.border =
        "red solid 1px";
      document.getElementById("warningTextDescList").style.display = "block";
    } else if (descriptionCorrect == true) {
      document.getElementById("newListDescription").style.border =
        "black solid 1px";
      document.getElementById("warningTextDescList").style.display = "none";
    }
    if (descriptionCorrect && titleCorrect) {
      document
        .getElementById("listFormButton")
        .setAttribute("class", "hoverButtonGreen btn");
    }
  } else if (itemID == "taskForm") {
    //get data
    let newItem = {
      id: itemID,
      title: document.getElementById("newTaskName").value,
      description: document.getElementById("newDescription").value,
    };

    //check for errors
    if (newItem.title.length < 4 || newItem.title > 40) {
      titleCorrect = false;
    }
    if (newItem.description.length < 4 || newItem.description.length > 600) {
      descriptionCorrect = false;
    }
    // console.log(titleCorrect,descriptionCorrect)

    //if there are errors then show them to the user
    if (titleCorrect == false) {
      document.getElementById("newTaskName").style.border = "red solid 1px";
      document.getElementById("warningTextTitleTask").style.display = "block";
      // console.log("Hello!")
    } else if (titleCorrect == true) {
      document.getElementById("newTaskName").style.border = "black solid 1px";
      document.getElementById("warningTextTitleTask").style.display = "none";
    }
    if (descriptionCorrect == false) {
      document.getElementById("newDescription").style.border = "red solid 1px";
      document.getElementById("warningTextDescTask").style.display = "block";
    } else if (descriptionCorrect == true) {
      document.getElementById("newDescription").style.border =
        "black solid 1px";
      document.getElementById("warningTextDescTask").style.display = "none";
    }
    if (descriptionCorrect && titleCorrect) {
      document
        .getElementById("taskFormButton")
        .setAttribute("class", "hoverButtonGreen btn");
    }
  } else {
    //get data
    let newItem = {
      id: itemID,
      title: document.getElementById(itemID).childNodes[0].childNodes[1].value,
      description:
        document.getElementById(itemID).childNodes[0].childNodes[3].value,
    };
    // console.log(newItem)
    // console.log(document.getElementById(itemID))
    //check for errors
    if (newItem.title.length < 4 || newItem.title > 40) {
      titleCorrect = false;
    }
    if (newItem.description.length < 4 || newItem.description.length > 600) {
      descriptionCorrect = false;
    }
    // console.log(titleCorrect,descriptionCorrect)

    //if there are errors then show them to the user
    if (titleCorrect == false) {
      document.getElementById(`taskEditName${itemID}`).style.border =
        "red solid 1px";
      document.getElementById(`warningTextTitleTask${itemID}`).style.display =
        "block";
    } else if (titleCorrect == true) {
      document.getElementById(`taskEditName${itemID}`).style.border =
        "black solid 1px";
      document.getElementById(`warningTextTitleTask${itemID}`).style.display =
        "none";
    }
    if (descriptionCorrect == false) {
      document.getElementById(`taskEditDescription${itemID}`).style.border =
        "red solid 1px";
      document.getElementById(`warningTextDescTask${itemID}`).style.display =
        "block";
    } else if (descriptionCorrect == true) {
      document.getElementById(`taskEditDescription${itemID}`).style.border =
        "black solid 1px";
      document.getElementById(`warningTextDescTask${itemID}`).style.display =
        "none";
    }
    if (descriptionCorrect && titleCorrect) {
      document
        .getElementById(`taskFormButton${itemID}`)
        .setAttribute("class", "hoverButtonGreen btn");
    }
  }
}

//allows for editing of existing information about lists, currently not implemented
// function editLists(id){
//   let values={
//     "title":"",
//     "description":""
//   };
//   // console.log(document.getElementById(id).childNodes[0])
//   values.title = document.getElementById(id).childNodes[0].childNodes[0]
//   values.description = document.getElementById(id).childNodes[0].childNodes[1]
//   console.log(values)
// }

//allows for editing of existing information about lists
function editListItems(id) {
  let values = {
    id: id,
    completed: false,
    name: document.getElementById(id).childNodes[1].innerHTML,
    description:
      document.getElementById(id).childNodes[4].childNodes[1].innerHTML,
  };
  if (document.getElementById(id).classList.contains("selectedListItem")) {
    values.completed = true;
    let revertedName = values.name.slice(3);
    revertedName = revertedName.slice(0, -4);
    values.name = revertedName;
  } else {
    values.completed = false;
  }
  // console.log(document.getElementById(id).childNodes)
  // console.log(values)
  let itemInput = document.createElement("input");
  let itemLabel = document.createElement("label");
  let descriptionBox = document.createElement("textarea");
  let acceptChangesButton = document.createElement("button");
  let removeChangesButton = document.createElement("button");
  let inputBox = document.createElement("div");
  let warningText = document.createElement("p");
  let warningTextdesc = document.createElement("p");
  // //adds innerhtml
  acceptChangesButton.innerHTML = "Accept";
  removeChangesButton.innerHTML = "Revert";
  itemLabel.innerHTML = "Add name:";
  itemInput.value = `${values.name}`;
  descriptionBox.innerHTML = `${values.description}`;
  warningText.innerHTML =
    "The title needs to be between 4 and 40 characters long";
  warningTextdesc.innerHTML =
    "The description needs to be between 4 and 600 characters long";
  // //sets class and onclick
  warningText.setAttribute("class", "warningText");
  warningTextdesc.setAttribute("class", "warningText");
  warningText.setAttribute("style", "display:none");
  warningTextdesc.setAttribute("style", "display:none");
  warningText.setAttribute("id", `warningTextTitleTask${id}`);
  warningTextdesc.setAttribute("id", `warningTextDescTask${id}`);

  acceptChangesButton.setAttribute("class", "hoverButtonGreen btn");
  acceptChangesButton.setAttribute("id", `taskFormButton${id}`);
  removeChangesButton.setAttribute("class", "hoverButtonRed btn");
  itemInput.setAttribute("type", "text");
  itemInput.setAttribute("onchange", `checkForErrors('${id}')`);
  itemInput.setAttribute("class", "mb-1 w-100");
  itemInput.setAttribute("id", `taskEditName${id}`);
  descriptionBox.setAttribute("id", `taskEditDescription${id}`);
  descriptionBox.setAttribute("onchange", `checkForErrors('${id}')`);
  acceptChangesButton.setAttribute(
    "onclick",
    `finishEditsForTasks('taskEditName${id}','taskEditDescription${id}',${id})`
  );
  removeChangesButton.setAttribute(
    "onclick",
    `revertEditsForTasks(${JSON.stringify(values)})`
  );
  itemLabel.setAttribute("class", "itemTitle w-100");
  // //appends elements
  inputBox.appendChild(itemLabel);
  inputBox.appendChild(itemInput);
  inputBox.appendChild(warningText);
  inputBox.appendChild(descriptionBox);
  inputBox.appendChild(warningTextdesc);

  while (document.getElementById(values.id).firstChild) {
    // console.log(document.getElementById(id).firstChild)
    document.getElementById(values.id).childNodes[0].remove();
  }
  document.getElementById(id).appendChild(inputBox);
  document.getElementById(id).appendChild(acceptChangesButton);
  document.getElementById(id).appendChild(removeChangesButton);
}

//finalizes edits for tasks
function finishEditsForTasks(titleid, descid, editedID) {
  let values = {
    id: editedID,
    name: document.getElementById(titleid).value,
    description: document.getElementById(descid).value,
  };
  // console.log(values)
  let listArchive = JSON.parse(localStorage.getItem("listArchive"));
  //   console.log(listArchive)
  let listTitle = "";
  listArchive.forEach((listInfo) => {
    // console.log(listInfo.id,listid)
    if (currentListID == listInfo.id) {
      listTitle = listInfo.title;
    }
  });
  // console.log(listTitle);
  let listData = JSON.parse(localStorage.getItem(listTitle));
  // console.log(listData)
  listData.listItems.forEach((item) => {
    if (item.id == editedID) {
      // console.log("Helo")
      item.name = values.name;
      item.description = values.description;
    }
  });
  // console.log(listData)
  localStorage.setItem(`${listTitle}`, JSON.stringify(listData));
  revertEditsForTasks(values);
}

//reverts edits for tasks
function revertEditsForTasks(info) {
  // console.log(info)
  while (document.getElementById(info.id).firstChild) {
    // console.log(document.getElementById(info.id).firstChild)
    document.getElementById(info.id).childNodes[0].remove();
  }

  let itemInput = document.createElement("input");
  let itemLabel = document.createElement("label");
  let descriptionBox = document.createElement("div");
  let itemDescription = document.createElement("p");
  let descriptionText = document.createElement("p");
  let itemRemoveButton = document.createElement("button");
  let itemEditButton = document.createElement("button");

  // //adds innerhtml
  itemRemoveButton.innerHTML = "Remove";
  itemEditButton.innerHTML = "Edit";
  itemDescription.innerHTML = info.description;
  descriptionText.innerHTML = "Description:";
  // //sets class and onclick
  if (info.completed) {
    itemInput.setAttribute("onclick", `incompleteTask(${info.id})`);
    itemInput.checked = true;
    itemLabel.setAttribute("onclick", `incompleteTask(${info.id})`);
    itemLabel.innerHTML = `<s>${info.name}</s>`;
  } else {
    itemLabel.innerHTML = info.name;
    itemInput.setAttribute("onclick", `completeTask(${info.id})`);
    itemLabel.setAttribute("onclick", `completeTask(${info.id})`);
  }
  itemRemoveButton.setAttribute("class", "hoverButtonRed btn");
  itemEditButton.setAttribute("class", "hoverButtonGreen btn");
  itemInput.setAttribute("type", "checkbox");
  itemInput.setAttribute("class", "checkbox clicker");
  itemRemoveButton.setAttribute("onclick", `removeListItem(${info.id})`);
  itemEditButton.setAttribute("onclick", `editListItems(${info.id})`);
  itemInput.setAttribute("name", `${info.name}`);
  itemLabel.setAttribute("class", "itemTitle clicker");
  itemLabel.setAttribute("for", `${info.name}`);
  //appends
  document.getElementById(info.id).appendChild(itemInput);
  document.getElementById(info.id).appendChild(itemLabel);
  document.getElementById(info.id).appendChild(itemEditButton);
  document.getElementById(info.id).appendChild(itemRemoveButton);
  descriptionBox.appendChild(descriptionText);
  descriptionBox.appendChild(itemDescription);
  document.getElementById(info.id).appendChild(descriptionBox);
}

//runs functions needed for the website to work, once laoding has finished
function initialLoad(reset) {
  if (
    localStorage.getItem("listArchive") &&
    JSON.parse(localStorage.getItem("listArchive")).length != 0
  ) {
    let listArchive = JSON.parse(localStorage.getItem("listArchive"));
    currentListID = listArchive[0].id;
  }
  initializeData(reset);
  createLists();
  openSelectedList(currentListID);
}

//JSON objects used for default set of lists
var lists = [
  {
    id: "l0",
    title: "list1",
    description:
      "Short description for this list, made with lots of love and care",
    listItems: [
      {
        id: "0",
        type: "checkbox",
        name: "milk",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "1",
        type: "checkbox",
        name: "chocolate",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "2",
        type: "checkbox",
        name: "sugar",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "3",
        type: "checkbox",
        name: "eggs",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "4",
        type: "checkbox",
        name: "cheese",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "5",
        type: "checkbox",
        name: "butter",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
    ],
  },
  {
    id: "l1",
    title: "list2",
    description:
      "Short description for this list, made with lots of love and care",
    listItems: [
      {
        id: "0",
        type: "checkbox",
        name: "blood",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "1",
        type: "checkbox",
        name: "jogurt",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "2",
        type: "checkbox",
        name: "garlic",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "3",
        type: "checkbox",
        name: "beer",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "4",
        type: "checkbox",
        name: "coco powder",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "5",
        type: "checkbox",
        name: "bananas",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
    ],
  },
  {
    id: "l2",
    title: "list3",
    description:
      "Short description for this list, made with lots of love and care",
    listItems: [
      {
        id: "0",
        type: "checkbox",
        name: "juice",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "1",
        type: "checkbox",
        name: "honey",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "2",
        type: "checkbox",
        name: "potato",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "3",
        type: "checkbox",
        name: "carrots",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "4",
        type: "checkbox",
        name: "cheese",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
      {
        id: "5",
        type: "checkbox",
        name: "bread",
        completed: false,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, nisi!",
      },
    ],
  },
];
