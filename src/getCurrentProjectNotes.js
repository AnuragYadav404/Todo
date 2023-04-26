
export default function getCurrentProjectNotes(currentProject) {
    let projectNotes = localStorage.getItem(currentProject);
    let projectNotesArray = JSON.parse(projectNotes);
    return projectNotesArray;
}