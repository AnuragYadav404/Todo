import './style.css';
import getCurrentProjectNotes from './getCurrentProjectNotes';

function deleteFromtodoNotesArray(ele, currentProject) {
    let notes = getCurrentProjectNotes(currentProject);
    notes.splice(ele.data, 1);
    localStorage.setItem(`${currentProject}`,  JSON.stringify(notes));
}
  

export default function createNote(obj, currentProject) {
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
    //   let currentProjectArray = JSON.parse(localStorage.getItem(`${currentProject}`));
    deleteBtn.setAttribute('data', currentProject.length);
    deleteBtn.addEventListener('click', function(e) {
        deleteFromtodoNotesArray(e.target, currentProject)
        e.target.parentElement.remove();
    });
    ele.append(title, date, deleteBtn);
    return ele;
}