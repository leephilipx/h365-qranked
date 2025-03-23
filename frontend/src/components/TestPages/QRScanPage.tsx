import { useEffect } from 'react';
import QRReaderContainer from './QR/QRReaderContainer';


export default function QRScanPage() {

  useEffect(() => {
    document.title = "Test Page for QR Code Scanning";
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>QR Code Scanner</h1>
      <QRReaderContainer />
    </div>
  );
}