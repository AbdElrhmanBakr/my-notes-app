const NoteSection = ({ notes, currentNote, setCurrentNoteId, deleteNote }) => {
  return (
    <div>
      {notes.map((note) => (
        <div key={note.id}>
          <div
            className={`title ${
              note.id === currentNote.id ? "selected-note" : ""
            }`}
            onClick={() => setCurrentNoteId(note.id)}
          >
            <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
            <button
              className="delete-btn"
              onClick={(event) => deleteNote(event, note.id)} // <-- We Need event for stopPropagation()
            >
              <i className="gg-trash trash-icon"></i>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteSection;
