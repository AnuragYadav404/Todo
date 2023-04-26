export default function clearDisplay() {
    const notes = display.querySelectorAll('.note');
    notes.forEach(note => {
        note.remove();
    });
}