import React from 'react';
import QRCodeDownload from './QR/QRCodeDownload';

const qrCode = 'h365://pos1/lBVoWikzJImeSLF8OhHDEQJPet1J0BDBSMBgg2TR8zYNNMnAI0HNTWVuBcU+xqGvT0i1JDeTv0rjptwFg6aipRjx44pRzycrhogf4ln8zVP9ImixqwNDvTbuXxqebIpQXN+1Uu4jzH7AfK2jmPeMoARc30aY+pvPpBLINyLZlFE=';

function Main() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1>QR Code: Auto Generator</h1>
      <QRCodeDownload qrCodeValue={qrCode} userName={'Philip'}></QRCodeDownload>
    </div>
  );
}

export default Main;