import React, { useState } from 'react';
import axios from 'axios';
import { BlockReason } from '@google/generative-ai';

const UploadDream = () => {
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/dreams/upload', { content, author });
            setContent('');
            setAuthor('');
            alert('Dream uploaded!');
        } catch (error) {
            console.error('Error uploading dream:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px', textAlign: 'center' }}>
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                required
                style={{
                    padding: '10px',
                    margin: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '80%',
                }}
            />
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your dream"
                required
                style={{
                    padding: '10px',
                    margin: '5px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '80%',
                    minHeight: '100px',
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    display:'BlockReason',
                    cursor: 'pointer',
                }}
            >
                Upload Dream
            </button>
        </form>
    );
};

export default UploadDream;
