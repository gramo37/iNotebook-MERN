import React, { useEffect } from 'react';
// import noteContext from '../context/notes/NoteContext';
// import { useEffect } from 'react/cjs/react.development'
import AddNote from './AddNote'
import Note from './Note'

const Home = (props) => {

    useEffect(() => {

        props.alertShow("Welcome to iNoteBook - Now you can save your notes on cloud", "success", 3000);
        // eslint-disable-next-line
    }, [])

    return (


        <>
            <div style={{ marginTop: "60px" }}>
                <AddNote />
                <div className="container my-3">
                    <Note />
                </div>
            </div>


        </>
    )
}

export default Home
