import React, { useContext } from 'react';
import { useState } from 'react/cjs/react.development';
import noteContext from '../context/notes/NoteContext'

const AddNote = () => {

    let context = useContext(noteContext);
    const { addNotes } = context;

    const [note, setnote] = useState({ title: "", description: "", tag: "" })

    const onInputChange = (event) => {
        setnote({ ...note, [event.target.name]: event.target.value })
    }

    const submitClicked = (event) => {
        event.preventDefault()
        addNotes(note.title, note.description, note.tag)
        setnote({ title: "", description: "", tag: "" })
    }

    return (
        <>
            <div className="container">
                <h1>Add Notes</h1>
                <form>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Enter Title</label>
                        <input type="text" className="form-control" onChange={onInputChange} id="title" value={note.title} name="title" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <input type="text" className="form-control" onChange={onInputChange} id="description" value={note.description} name="description" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label">Tag</label>
                        <input type="text" className="form-control" onChange={onInputChange} value={note.tag} id="tag" name="tag" />
                    </div>
                    <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={submitClicked}>Submit</button>
                </form>
            </div>
        </>
    )
}

export default AddNote
