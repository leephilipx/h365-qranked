import React, { useState } from 'react';
import QRCodeDownload from './QR/QRCodeDownload';

function GeneratePage() {

  const [qrCodeValue, setQrCodeValue] = useState('');
  const handleInputChange = (event) => { setQrCodeValue(event.target.value); };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>QR Code: Manual Generator</h1>
      <textarea
        id='qr-code-manual'
        rows='10' cols='50'
        placeholder='Enter the QR Code value here'
        onChange={handleInputChange}
      />
      <QRCodeDownload qrCodeValue={qrCodeValue} />
    </div>
  );
}

export default GeneratePage;