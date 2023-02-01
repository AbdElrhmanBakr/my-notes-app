import NoteSection from "./NoteSection";

export default function Sidebar({
  notes,
  currentNote,
  setCurrentNoteId,
  newNote,
  deleteNote,
}) {
  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={newNote}>
          +
        </button>
      </div>
      <NoteSection
        notes={notes}
        currentNote={currentNote}
        setCurrentNoteId={setCurrentNoteId}
        deleteNote={deleteNote}
      />
    </section>
  );
}
