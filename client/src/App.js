import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // State for uploading a new dream
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // State for storing dreams when viewing all dreams
  const [dreams, setDreams] = useState([]);

  // State to toggle between viewing upload form and all dreams
  const [viewAll, setViewAll] = useState(false);

  // Function to handle dream upload
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/dreams/upload', { content, author });
      setContent('');
      setAuthor('');
      alert('Dream uploaded!');
      fetchDreams();  // Refresh the list of dreams
    } catch (error) {
      console.error('Error uploading dream:', error);
    }
  };

  // Function to fetch all dreams
  const fetchDreams = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/dreams/all');
      setDreams(response.data);
    } catch (error) {
      console.error('Error fetching dreams:', error);
    }
  };

  useEffect(() => {
    fetchDreams();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif', backgroundColor: 'rgb(52 157 181)',height:'680px' }}>
      <h1 style={{ color: '#333' }}>Dream Sharing Platform</h1>

      {/* Toggle between views */}
      <button
        onClick={() => setViewAll(false)}
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '10px' }}
      >
        want to upload
      </button>
      <button
        onClick={() => setViewAll(true)}
        style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '10px' }}
      >
        View All Dreams
      </button>

      {/* Conditionally render views based on state */}
      {!viewAll ? (
        // Upload Dream Form
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
              display:'block',
              padding: '10px 20px',
              textAlign:'center',
              marginLeft:'48%',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Upload Dream
          </button>
        </form>
      ) : (
        // Display All Dreams
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h2 style={{ color: '#333' }}>All Dreams</h2>
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
      )}
    </div>
  );
};

export default App;
