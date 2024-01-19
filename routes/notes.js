const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const notesDB = require('../db/db.json');
const { v4: uuidv4 } = require('uuid');

// GET /notes should return all saved notes as JSON.
router.get('/notes', (req, res) => {
    res.json(notesDB);
});

// POST /notes should receive a new note, add it to db.json, and return the new note.
router.post('/notes', (req, res) => {
    const newNote = req.body;
    console.log('Received new note:', newNote);
    newNote.id = uuidv4();
    notesDB.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesDB, null, 2)
    );
    res.json(newNote);
});

// DELETE /notes/:id should receive an id parameter and delete the corresponding note.
router.delete('/notes/:id', (req, res) => {
    const id = req.params.id;
    const index = notesDB.findIndex((note) => note.id === id);
    notesDB.splice(index, 1);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesDB, null, 2)
    );
    res.json(notesDB);
});

module.exports = router;
