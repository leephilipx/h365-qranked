import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './components/Main';
import GeneratePage from './components/GeneratePage';
import ScannerPage from './components/ScannerPage';

function App() {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/generate" element={<GeneratePage />} />
            <Route path="/scanner" element={<ScannerPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;