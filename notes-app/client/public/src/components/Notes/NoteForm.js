import React, { useState } from 'react';
import axios from 'axios';

const NoteForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        tags: '',
        color: '#ffffff'
    });

    const { title, content, tags, color } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/notes', {
                title,
                content,
                tags: tags.split(',').map(tag => tag.trim()),
                color
            });
            console.log(res.data); // New note response
            // Optionally redirect or update state to show new note
        } catch (err) {
            console.error(err.response.data);
        }
    };

    return (
        <div>
            <h2>Create New Note</h2>
            <form onSubmit={e => onSubmit(e)}>
                <input
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={e => onChange(e)}
                    required
                />
                <textarea
                    placeholder="Content"
                    name="content"
                    value={content}
                    onChange={e => onChange(e)}
                    required
                />
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    name="tags"
                    value={tags}
                    onChange={e => onChange(e)}
                />
                <input
                    type="color"
                    name="color"
                    value={color}
                    onChange={e => onChange(e)}
                />
                <button type="submit">Save Note</button>
            </form>
        </div>
    );
};

export default NoteForm;
