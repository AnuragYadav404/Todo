import clearDisplay from "./clearDisplay";
import displaycurrentProjectNotes from "./displayCurrentProjectNotes";
import getCurrentProjectNotes from "./getCurrentProjectNotes";

export default function addNote(noteObj, currentProject) {
    let projectNotesArray = getCurrentProjectNotes(currentProject);
    projectNotesArray.push(noteObj);
    localStorage.setItem(`${currentProject}`,  JSON.stringify(projectNotesArray));
    clearDisplay();
    displaycurrentProjectNotes(currentProject);
}