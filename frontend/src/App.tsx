import { HashRouter, Route, Routes } from 'react-router-dom';

import Main from './components/Main';
import QRGenAuto from './components/TestPages/QRGenAuto';
import QRGenManual from './components/TestPages/QRGenManual';
import QRScanPage from './components/TestPages/QRScanPage';
import H365Main from './components/RankingCompetition';

function App() {
  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/generate-auto" element={<QRGenAuto />} />
          <Route path="/generate-manual" element={<QRGenManual />} />
          <Route path="/scanner" element={<QRScanPage />} />
          <Route path="/alpha" element={<H365Main />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;