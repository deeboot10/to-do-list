// DOM elements
const addButton = document.getElementById("addReminder");
const searchButton = document.getElementById("searchButton");
const reminders = document.querySelector(".reminders");
const deleteAll = document.querySelector(".delete button");

addButton.onclick = add;
deleteAll.onclick = function(){
  localStorage.clear();
  reminders.innerHTML = "";
}


//functions
function add(e){
  e.preventDefault();
  console.log(e);
  const reminderKey = document.getElementById("reminderKey");
  const reminderText = document.getElementById("reminderText");

  if(reminderKey.value !== "" && reminderText.value !== ""){
    localStorage.setItem(reminderKey.value, reminderText.value);
    reminderKey.value = "";
    reminderText.value = "";
  } else{
    alert("both fields must be filled");
  }
  loadData();
}
function loadData (){
  reminders.innerHTML = "";
  for(let i = 0; i < localStorage.length; i ++){
    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const check = document.createElement("input");
    check.id = localStorage.key(i);
    check.type = "checkbox";
    const span = document.createElement("span");
    const p = document.createElement("p");
    p.classList.add("line-clamp");
    span.innerHTML = localStorage.key(i);
    p.innerHTML = localStorage.getItem(localStorage.key(i));
    const svg = document.createElement("img");
    svg.src = "svg/trash.svg";
    svg.onclick = deleteReminder;
    check.onclick = strikeIt;
    div.classList.add("reminder");

    div.appendChild(check);
    div1.appendChild(span);
    div1.appendChild(p);
    div.appendChild(div1);
    div.appendChild(svg);

    reminders.appendChild(div);
  }
}
function strikeIt(e){
  const checkbox = e.target;
  if(checkbox.checked){
    const node = checkbox.parentElement;
    checkbox.parentElement.remove();
    reminders.appendChild(node);
    setTimeout(()=> {
      checkbox.parentElement.querySelector("div").classList.add("strike");
    }, 300);
  } else{
    checkbox.parentElement.querySelector("div").classList.remove("strike");
    const node = checkbox.parentElement;
    checkbox.parentElement.remove();
    reminders.prepend(node);
  }
}
function deleteReminder (e){
  const svg = e.target;
  const div = svg.parentElement;
  const key = div.querySelector("input").id;
  
  localStorage.removeItem(key);
  div.remove();
}
reminderKey.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addButton.click();
  }
});
reminderText.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    addButton.click();
  }
});
function myFunction() {
  let input, filter;
  input = document.getElementById("searchId");
  filter = input.value.toUpperCase();
  
  const toDelete = [];
  for (i = 0; i < reminders.childNodes.length; i++) {
    const comp = reminders.querySelector(".reminder:nth-child(" + (i+1) + ") input");
    
    if(!comp.id.toUpperCase().includes(filter)){
      comp.parentElement.style.display = "none";
    } else{
      comp.parentElement.style.display = "flex";
    }
  }
}



//initioal loading of data
loadData();