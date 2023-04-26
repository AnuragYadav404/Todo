import getCurrentProjectNotes from "./getCurrentProjectNotes";
import createNote from "./createNote";

export default function displaycurrentProjectNotes(currentProject) {
    let projectNotesArray = getCurrentProjectNotes(currentProject);
    if(projectNotesArray !== null) {
        projectNotesArray.map((obj)=>{
        const childEle = createNote(obj, currentProject);
        display.appendChild(childEle);
        })
    } 
}
  
