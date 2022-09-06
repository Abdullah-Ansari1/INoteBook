const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Note = require('../models/Note');
var fetchuser = require('../middleware/fetchuser');

//ROUTE:1 Get ALL THE NOTES USING: GET "/api/auth/fetchallnotes". login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE:2 ADD A NEW NOTE USING: POST "/api/auth/addnote". login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {


            const { title, description, tag } = req.body;
            //IF THERE ARE ERROR RETURN BAD REQUEST AND ERRORS
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })

//ROUTE:3 UPDATING AN EXSISTING  NOTE USING: PUT "/api/auth/updatenote". login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        //CREATE A NEW NOTE OBJECT
        const newNote = {};
        if (title) { newNote.title = title };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        //FIND THE NOTE TO BE UPDATED AND UPDATE IT
        // const note = Note.findByIdAndUpdate()
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
//ROUTE:4 DELETE AN EXSISTING  NOTE USING: DELETE "/api/auth/deletenote". login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        //FIND THE NOTE TO BE DELETED AND DELETE IT
        let note = await Note.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") }

        //ALLOW DELETION ONLY IF USER OWNS THIS NOTE
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router