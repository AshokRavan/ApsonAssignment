import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NoteList = () => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get('/api/notes');
                setNotes(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchNotes();
    }, []);

    const handleArchive = async id => {
        try {
            await axios.put(`/api/notes/archive/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async id => {
        try {
            await axios.delete(`/api/notes/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>My Notes</h2>
            {notes.map(note => (
                <div key={note._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                    <h3>{note.title}</h3>
                    <p>{note.content}</p>
                    <p>Tags: {note.tags.join(', ')}</p>
                    <p>Color: {note.color}</p>
                    <button onClick={() => handleArchive(note._id)}>Archive</button>
                    <button onClick={() => handleDelete(note._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
};

export default NoteList;
