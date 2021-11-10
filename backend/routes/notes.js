var express = require('express')
var router = express.Router()
const Notes = require("../models/Notes");
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

//Route 1: Get all notes from database 
router.get('/getAllNotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.send(notes);
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ "msg": "Internal Server Error" })
    }
})

//Route 2: Add notes from user to database
router.post('/addNote', [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'Enter a valid description').isLength({ min: 5 }),
], fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        // Show errors for bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.send(savedNote);
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ "msg": "Internal Server Error" })
    }

})

//Route 3: Update notes from user to database
router.put('/updateNote/:id', fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;

        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };
        // res.send(newNote);

        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        return res.send(note);
    } catch {
        return res.send({ "msg": "Internal Server Error" })
    }
})

// Route 4: Delete notes from user to database
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        return res.send(note);
    } catch {
        return res.send({ "msg": "Internal Server Error" })
    }
})

module.exports = router