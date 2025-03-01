import { useEffect } from 'react';
import QRCodeDownload from './QR/QRCodeDownload';

import { TEST_QR_CODE_VAL } from '../utils/constants';


function QRGenAuto() {

    useEffect(() => {
      document.title = "Test Page for QR Code Auto Generation";
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1>QR Code: Auto Generator</h1>
          <QRCodeDownload qrCodeValue={TEST_QR_CODE_VAL} userName={'Philip'}></QRCodeDownload>
        </div>
    );

}

export default QRGenAuto;