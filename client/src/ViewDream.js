import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewDreams = () => {
    const [dreams, setDreams] = useState([]);

    useEffect(() => {
        const fetchDreams = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/dreams/all');
                setDreams(response.data);
            } catch (error) {
                console.error('Error fetching dreams:', error);
            }
        };
        fetchDreams();
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <h2 style={{ color: '#333' }}>Dreams</h2>
            {dreams.map((dream) => (
                <div
                    key={dream._id}
                    style={{
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                        padding: '15px',
                        margin: '10px auto',
                        maxWidth: '600px',
                        backgroundColor: '#f9f9f9',
                    }}
                >
                    <h4 style={{ color: '#007bff' }}>{dream.author}</h4>
                    <p style={{ fontSize: '1rem', color: '#555' }}>{dream.content}</p>
                    <small style={{ color: '#999' }}>
                        {new Date(dream.createdAt).toLocaleString()}
                    </small>
                </div>
            ))}
        </div>
    );
};

export default ViewDreams;
