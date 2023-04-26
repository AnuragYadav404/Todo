import './style.css';
const newProjectForm = document.getElementById("newProject");
const projectBtns = document.getElementById("projectBtns");
const myForm = document.getElementById("myForm");
const display = document.getElementById("display");


var currentProject = 'HOME';
var currentBtn;


if(!localStorage.getItem('projectNames')) {
  var projectNamesArray = ['HOME'];
  localStorage.setItem('projectNames', JSON.stringify(projectNamesArray));
  localStorage.setItem('HOME', JSON.stringify([]));
  populateProjectNamesArray(projectNamesArray);
}else {
  var projectNamesArray = JSON.parse(localStorage.getItem('projectNames'));
  populateProjectNamesArray(projectNamesArray);
  displaycurrentProjectNotes();
}

function populateProjectNamesArray(projectNamesArr) {
  console.log(projectNamesArr);
  projectNamesArr.map(function (projectName) {
    let projectEle = createProjectElement(projectName);
    projectBtns.appendChild(projectEle);
  })
}

function addToLocalStorage(projectTitle) {
  projectNamesArray.push(projectTitle);
  localStorage.setItem('projectNames', JSON.stringify(projectNamesArray));
  localStorage.setItem(projectTitle, JSON.stringify([]));
}

function changeProject(e) {
  clearDisplay();
  currentProject = e.target.getAttribute('data');
  displaycurrentProjectNotes();
}


function createProjectElement(projectName) {
  const btn = document.createElement('button');
  btn.setAttribute('class', "projectBtn");
  btn.setAttribute('data', projectName);
  btn.innerText = projectName;
  
  btn.addEventListener('click', function(e) {
    // console.log(e.target);
    changeProject(e);
    currentBtn.classList.remove('active');
    currentBtn = e.target;
    currentBtn.classList.add('active');
  })
  if(projectName === 'HOME'){
    currentBtn = btn;
    btn.classList.add('active');
  }
  return btn;
}

function changeCurrentBtn(newBtn) {
  currentBtn.classList.remove('active');
  currentBtn = newBtn;
  newBtn.classList.add('active');
}

function addNewProject(obj) {
  let projectTitle = obj["projectName"];
  let projectEle = createProjectElement(projectTitle);
  changeCurrentBtn(projectEle)
  addToLocalStorage(projectTitle);
  projectBtns.appendChild(projectEle);
  currentProject = projectTitle;
  clearDisplay();
}


newProjectForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(newProjectForm);
  const formValues = Object.fromEntries(formData.entries());
  addNewProject(formValues);
  e.target.reset();
})


myForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(myForm);
  const formValues = Object.fromEntries(formData.entries());
  addNote(formValues);
  e.target.reset();
})

function addNote(noteObj) {
  let projectNotesArray = getCurrentProjectNotes();
  
  projectNotesArray.push(noteObj);
  localStorage.setItem(`${currentProject}`,  JSON.stringify(projectNotesArray));
  clearDisplay();
  displaycurrentProjectNotes();
}

function getCurrentProjectNotes() {
  let projectNotes = localStorage.getItem(currentProject);
  
  let projectNotesArray = JSON.parse(projectNotes);
  return projectNotesArray;
}

function clearDisplay() {
  const notes = display.querySelectorAll('.note');
  notes.forEach(note => {
    note.remove();
  });
}


function displaycurrentProjectNotes() {
  let projectNotesArray = getCurrentProjectNotes();
  if(projectNotesArray !== null) {
    projectNotesArray.map((obj)=>{
      const childEle = createNote(obj);
      display.appendChild(childEle);
    })
  } 
}



function createNote(obj) {
  const ele = document.createElement('div');
  ele.classList.add('note');
  ele.style = "display:flex;padding:16px;border:2px solid black;border-radius:10px;margin:4px;"
  const title = document.createElement('h2');
  title.innerText = obj["title"];
  title.style = "flex-grow:1;padding:16px";
  const date = document.createElement('h2');
  date.innerText = obj["date"];
  date.style = "padding:16px;margin:auto;shadow:none;";
  const deleteBtn = document.createElement('button');
  deleteBtn.innerText = "Delete";
  deleteBtn.style = "font-size:20px;color:red;background-color:black;margin:auto;padding:16px;border-radius:10px;border:2px solid black;";
  let currentProjectArray = JSON.parse(localStorage.getItem(`${currentProject}`));
  deleteBtn.setAttribute('data', currentProject.length);
  deleteBtn.addEventListener('click', function(e) {
    deleteFromtodoNotesArray(e.target)
    
    e.target.parentElement.remove();
  });
  ele.append(title, date, deleteBtn);
  return ele;
}

function deleteFromtodoNotesArray(ele) {
  
  let notes = getCurrentProjectNotes();
  notes.splice(ele.data, 1);
  localStorage.setItem(`${currentProject}`,  JSON.stringify(notes));
}














