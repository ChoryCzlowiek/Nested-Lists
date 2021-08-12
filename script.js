// Create ul from JSON

function createUls(arrayOfList) {
  const ul = document.createElement("ul");

  if (arrayOfList[0].type) ul.classList.add(`${arrayOfList[0].type}__list`);

  for (let i = 0; i < arrayOfList.length; i++) {
    ul.appendChild(createLis(arrayOfList[i], i + 1));
  }
  return ul;
}

// Create and add li to ul

function createLis(lastLi, counter) {
  const li = document.createElement("li");
  if (lastLi.type) li.classList.add(lastLi.type);

  if (counter % 2 == 0) {
    li.style.backgroundColor = "Gainsboro";
  } else {
    li.style.backgroundColor = "white";
  }

  if (lastLi.type) {
    if (lastLi.type == "branch") {
      li.innerHTML = '<i class="fas fa-plus-circle"></i>';
    } else {
      li.innerHTML = '<i class="fas fa-plus-square"></i>';
    }
  }

  if (lastLi.inputType) {
    const label = document.createElement("label");
    label.innerHTML = lastLi.subname
      ? `${lastLi.name} </br> ${lastLi.subname}`
      : lastLi.name;

    li.appendChild(label);

    const input = document.createElement("input");
    input.type = lastLi.inputType;
    input.name = lastLi.type;
    label.appendChild(input);
  } else {
    const a = document.createElement("a");
    a.innerHTML = lastLi.subname
      ? `${lastLi.name} </br> ${lastLi.subname}`
      : lastLi.name;
    li.appendChild(a);
  }

  if (lastLi.list) li.appendChild(createUls(lastLi.list));

  return li;
}

// Create function which opening and hiding lists

function openAndHideLists(e) {
  // Check if list is radio type
  if (this.classList.contains("branch")) {
    const radioLis = [...document.querySelectorAll(".branch")];
    const activeLi = radioLis.find((li) => li.classList.contains("active"));
    if (activeLi && this != activeLi) {
      changeIcon(activeLi);
      activeLi.classList.remove("active");
    }
  }

  this.classList.toggle("active");

  changeIcon(this);

  e.stopPropagation();
  e.preventDefault();
}

// Create function to change icon to minus or plus

function changeIcon(li) {
  const array = [...li.children];
  const i = array.find((element) => element.tagName === "I");
  if (i) {
    if (li.classList.contains("branch")) {
      i.classList.toggle("fa-plus-circle");
      i.classList.toggle("fa-minus-circle");
    } else {
      i.classList.toggle("fa-plus-square");
      i.classList.toggle("fa-minus-square");
    }
  }
}

// Import entire list from json file
// Main function

fetch("./lists.json")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    const lis = document.getElementsByTagName("li");

    document.body.appendChild(createUls(data));

    for (let li of lis) {
      li.addEventListener("click", openAndHideLists);
    }
  });
