import React from 'react';
import QRContainer from './QR/QRContainer';

function ScannerPage() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>QR Code Scanner</h1>
      <QRContainer/>
    </div>
  );
}

export default ScannerPage;