const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// @route   GET /api/notes
// @desc    Get all notes for authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id, isDeleted: false }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET /api/notes/:tag
// @desc    Get notes by tag for authenticated user
// @access  Private
router.get('/:tag', auth, async (req, res) => {
    try {
        const tag = req.params.tag;
        const notes = await Note.find({ user: req.user.id, tags: tag, isDeleted: false }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/notes/archive/:id
// @desc    Archive a note
// @access  Private
router.put('/archive/:id', auth, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        // Check note ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Archive note
        note.isArchived = true;
        note = await note.save();
        res.json({ msg: 'Note archived' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   PUT /api/notes/unarchive/:id
// @desc    Unarchive a note
// @access  Private
router.put('/unarchive/:id', auth, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        // Check note ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Unarchive note
        note.isArchived = false;
        note = await note.save();
        res.json({ msg: 'Note unarchived' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE /api/notes/:id
// @desc    Delete a note permanently
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ msg: 'Note not found' });
        }

        // Check note ownership
        if (note.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        // Permanently delete note
        await note.remove();
        res.json({ msg: 'Note deleted permanently' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
