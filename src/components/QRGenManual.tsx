import React, { useEffect, useState } from 'react';
import QRCodeDownload from './QR/QRCodeDownload';


function QRGenManual() {

  useEffect(() => {
    document.title = "Test Page for QR Code Manual Generation";
  }, []);

  const [qrCodeValue, setQrCodeValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setQrCodeValue(event.target.value);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>QR Code: Manual Generator</h1>
      <textarea
        id='qr-code-manual'
        rows={10} cols={50}
        placeholder='Enter the QR Code value here'
        onChange={handleInputChange}
      />
      <QRCodeDownload qrCodeValue={qrCodeValue} />
    </div>
  );

}

export default QRGenManual;