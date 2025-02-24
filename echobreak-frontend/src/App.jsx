import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostFeed from './components/PostFeed'; // Assuming you have this component
// import PostPage from './components/PostPage'; // Placeholder for post details

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div style={{ width: '200px', backgroundColor: '#f0f0f0' }}>
          <h3>Communities</h3>
          <ul>
            <li>Tech</li>
            {/* Add more communities later */}
          </ul>
        </div>
        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<PostFeed />} />
            {/* <Route path="/posts/:id" element={<PostPage />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;