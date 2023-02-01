import { useState, useEffect } from "react";
import Split from "react-split";
import { nanoid } from "nanoid";
import Sidebar from "../components/Sidebar";
import Editor from "../components/Editor";
import "./App.css";

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || [] // <-- Lazy State Which renders only one time
  );

  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((oldNotes) => {
      const newNotesArray = [];
      for (let i = 0; i < oldNotes.length; i++) {
        const oldNote = oldNotes[i];
        if (oldNote.id === currentNoteId) {
          newNotesArray.unshift({ ...oldNote, body: text });
        } else {
          newNotesArray.push(oldNote);
        }
      }
      return newNotesArray;
    });
  }

  // declarative Way
  function deleteNote(event, noteId) {
    event.stopPropagation(); // <-- We Need event for stopPropagation()
    setNotes((oldNotes) => oldNotes.filter((oldNote) => oldNote.id !== noteId));
  }

  // Imperative Way
  // function deleteNote(event, noteId) {
  //   event.stopPropagation();
  //   console.log(event.target);
  //   console.log(noteId);
  //   setNotes((oldNotes) => {
  //     const newNotesArray = [];
  //     for (let i = 0; i < oldNotes.length; i++) {
  //       const oldNote = oldNotes[i];
  //       if (oldNote.id === noteId) {
  //         newNotesArray.unshift(oldNote);
  //       } else {
  //         newNotesArray.push(oldNote);
  //       }
  //     }
  //     newNotesArray.shift();
  //     return newNotesArray;
  //   });
  // }

  // localStorage.clear();

  function findCurrentNote() {
    return (
      notes.find((note) => {
        return note.id === currentNoteId;
      }) || notes[0]
    );
  }

  useEffect(() => {
    const newNotes = JSON.stringify(notes);
    localStorage.setItem("notes", newNotes);
  }, [notes]);

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[20, 80]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

export default App;
