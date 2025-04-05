import React from 'react';

function App() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      backgroundColor: '#f0f4f8' 
    }}>
      <div style={{ 
        padding: '2rem', 
        backgroundColor: 'white', 
        borderRadius: '0.5rem', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          DataPulse Dashboard
        </h1>
        <p style={{ marginBottom: '1rem' }}>
          Welcome to your dashboard!
        </p>
        <p>
          Current time: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
}

export default App;