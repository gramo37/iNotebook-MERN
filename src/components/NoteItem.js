import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'

export const NoteItem = (props) => {

    let context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;

    const deleteClicked = () => {
        deleteNote(note._id)
    }

    return (
        <>
            <div className="col-md-3 my-3">

                <div className="card" >

                    <div className="card-body">
                        <h5 className="card-title">{props.note.title}</h5>
                        <p className="card-text">{props.note.description}</p>
                    </div>
                    <div>
                        <button className="btn-sm btn-danger m-2" onClick={deleteClicked}>Delete</button>
                        <button className="btn-sm btn-primary m-2" onClick={() => { updateNote(note) }}>Edit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
