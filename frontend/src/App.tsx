import { HashRouter, Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import QRGenAuto from './components/QRGenAuto';
import QRGenManual from './components/QRGenManual';
import QRScanPage from './components/QRScanPage';

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/generate-auto" element={<QRGenAuto />} />
          <Route path="/generate-manual" element={<QRGenManual />} />
          <Route path="/scanner" element={<QRScanPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;