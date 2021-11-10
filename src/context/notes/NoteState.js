import noteContext from './NoteContext';
import { useState } from 'react';

const NoteState = (props) => {

  // var token = localStorage.getItem("auth-token");

  const host = "http://localhost:5000"

  let notesInitial = []

  const [notes, setNotes] = useState(notesInitial);

  const getNotes = async () => {

    let url = `${host}/api/notes/getAllNotes`
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")

      },
    });
    const json = await response.json()
    setNotes(json)
  }

  const addNotes = async (title, description, tag) => {

    let url = `${host}/api/notes/addNote`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")

      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json()
    setNotes(notes.concat(json))
  }

  const deleteNote = async (id) => {

    let url = `${host}/api/notes/deleteNote/${id}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")

      },
    });

    const json = await response.json()
    console.log(json)
    let newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }

  const editNote = async (id, title, description, tag) => {
    // API Call
    let url = `${host}/api/notes/updateNote/${id}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem("auth-token")

      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json)

    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <noteContext.Provider value={{ notes, setNotes, addNotes, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )
}

export default NoteState;