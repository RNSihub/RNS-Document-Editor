// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your pages
import Home from './pages/Landing';// Optional: for undefined routes
import Upload from './pages/Upload';
import Option from './pages/Option';
import Convert from './pages/Convert'; // Assuming you have a Convert page

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="DJ_Maker/" element={<Home />} />
        <Route path="DJ_Maker/upload" element={<Upload />} />
        <Route path="DJ_Maker/option" element={<Option />} />
        <Route path="DJ_Maker/convert" element={<Convert />} />
        {/* Add more routes as needed */}
        
      </Routes>
    </Router>
  );
};

export default App;
