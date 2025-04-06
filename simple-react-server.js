import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001; // Using a different port to avoid conflicts

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// API route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Serve a simple React app for testing
app.get('/', (req, res) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DataPulse React Test</title>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f0f4f8;
      margin: 0;
      padding: 0;
    }
    #root {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      padding: 2rem;
      max-width: 600px;
      width: 100%;
    }
    h1 {
      color: #2563eb;
      margin-top: 0;
    }
    .card {
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 1rem;
      margin-top: 1.5rem;
    }
    .button {
      background-color: #2563eb;
      color: white;
      border: none;
      border-radius: 4px;
      padding: 0.5rem 1rem;
      font-weight: bold;
      cursor: pointer;
      margin-top: 1rem;
    }
    .button:hover {
      background-color: #1d4ed8;
    }
  </style>
</head>
<body>
  <div id="root"></div>
  
  <script type="text/babel">
    // Simple React component
    function App() {
      const [time, setTime] = React.useState(new Date().toLocaleTimeString());
      const [apiResponse, setApiResponse] = React.useState(null);
      const [loading, setLoading] = React.useState(false);
      
      // Update time every second
      React.useEffect(() => {
        const timer = setInterval(() => {
          setTime(new Date().toLocaleTimeString());
        }, 1000);
        
        console.log('React app mounted successfully!');
        
        return () => clearInterval(timer);
      }, []);
      
      // Test API connection
      const testApiConnection = async () => {
        setLoading(true);
        try {
          const response = await fetch('/api/test');
          const data = await response.json();
          setApiResponse(data);
        } catch (error) {
          setApiResponse({ error: error.message });
        } finally {
          setLoading(false);
        }
      };
      
      return (
        <div className="container">
          <h1>DataPulse React Test</h1>
          <p>This is a simple React application to verify that React is working correctly.</p>
          
          <div className="card">
            <h2>React Status</h2>
            <p>React is running and rendering components.</p>
            <p>Current time: {time}</p>
          </div>
          
          <div className="card">
            <h2>API Connection Test</h2>
            <p>Click the button below to test the API connection:</p>
            <button 
              className="button" 
              onClick={testApiConnection}
              disabled={loading}
            >
              {loading ? 'Testing...' : 'Test API Connection'}
            </button>
            
            {apiResponse && (
              <div style={{ marginTop: '1rem' }}>
                <h3>Response:</h3>
                <pre style={{ 
                  backgroundColor: '#f0f4f8', 
                  padding: '0.5rem', 
                  borderRadius: '4px',
                  overflow: 'auto'
                }}>
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }
    
    // Render the React application
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<App />);
  </script>
</body>
</html>
  `;
  
  res.send(htmlContent);
});

// Start server
app.listen(port, () => {
  console.log(`Simple React test server running at http://localhost:${port}`);
});
