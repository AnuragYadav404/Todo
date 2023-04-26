import './style.css';
// import getCurrentProjectNotes from './getCurrentProjectNotes';
import clearDisplay from './clearDisplay';
import displaycurrentProjectNotes from './displayCurrentProjectNotes';
import addNote from './addNote';

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
  displaycurrentProjectNotes(currentProject);
}

function populateProjectNamesArray(projectNamesArr) {
//   console.log(projectNamesArr);
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
  displaycurrentProjectNotes(currentProject);
}


function createProjectElement(projectName) {
  const btn = document.createElement('button');
  btn.setAttribute('class', "projectBtn");
  btn.setAttribute('data', projectName);
  btn.innerText = projectName;
  
  btn.addEventListener('click', function(e) {
    // console.log(e.target);
    changeProject(e);
    changeCurrentBtn(e.target)
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
  addNote(formValues, currentProject);
  e.target.reset();
})





