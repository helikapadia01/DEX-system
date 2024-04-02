import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; 
import TokenDashboard from './components/TokenDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard/:walletAddress" element={<TokenDashboard />} /> {/* Define route parameter */}
      </Routes>
    </Router>
  );
}

export default App;
