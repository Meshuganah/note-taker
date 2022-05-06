const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const { notes } = require('../../db/db.json');

function createNote(body, notes) {
    const newNote = body;
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return newNote;
};

router.get('/notes', (req, res) => {
    let results = notes;

    res.json(results);
});

router.post('/notes', (req, res) => {
    req.body.id = uuidv4().toString();

    const note = createNote(req.body, notes);
    res.json(note);
});




module.exports = router;