import React from 'react';
import QRCodeCanvas from 'qrcode.react';

const QR_GEN_SIZE = 512;


function chunkSubstr(str, size) {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)
  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }
  return chunks
}


function QRCodeDownload(props) {

  const downloadQRCode = () => {

    // Get the existing canvas
    const existingCanvas = document.getElementById('gen-qr-code-base');
    if (!existingCanvas) throw new Error('Failed to get 2D context');
    const currentDate = new Date();

    // Create a new canvas with a larger size
    let newCanvas = document.createElement('canvas');
    newCanvas.style.display = 'none';
    newCanvas.id = 'gen-qr-code-new';
    newCanvas.width = 1.25 * QR_GEN_SIZE;
    newCanvas.height = 1.5 * QR_GEN_SIZE;

    // Draw the existing canvas onto the new canvas
    const context = newCanvas.getContext('2d');
    if (!context) throw new Error('Failed to get 2D context');
    context.fillStyle = '#cfecf7';
    context.fillRect(0, 0, newCanvas.width, newCanvas.height);
    context.drawImage(existingCanvas, QR_GEN_SIZE / 8, newCanvas.height - QR_GEN_SIZE * 9 / 8, QR_GEN_SIZE, QR_GEN_SIZE);

    // Add the title text
    context.font = '24px Arial';
    context.fillStyle = '#009000';
    const textTitle = 'Scan this QR Code in H365 App';
    const dimTitle = context.measureText(textTitle);
    context.fillText(textTitle, (newCanvas.width - dimTitle.width) / 2, QR_GEN_SIZE / 8 + dimTitle.fontBoundingBoxAscent);

    // Add the subtitle text, 2 variants depending on whether there is a user name
    var textSubtitle;
    if (props.userName !== undefined) {
      textSubtitle = [
        `Downloaded by ${props.userName}`,
        `[${currentDate.toDateString()} ${currentDate.toLocaleTimeString()}]`
      ];
      context.font = '16px monospace'
    } else {
      textSubtitle = chunkSubstr(props.qrCodeValue, 80);
      context.font = '12px monospace'
    }
    context.fillStyle = '#000000';
    for (let i = 0; i < textSubtitle.length; i++) {
      const dimSubtitle = context.measureText(textSubtitle[i]);
      const yPos = (QR_GEN_SIZE / 8) + (2.5 * dimTitle.fontBoundingBoxAscent) + (1.5 * i * dimSubtitle.fontBoundingBoxAscent);
      context.fillText(textSubtitle[i], (newCanvas.width - dimSubtitle.width) / 2, yPos);
    }

    // Convert the canvas to a PNG file and download it    
    const pngUrl = newCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = 'QRCode.png';
    downloadLink.click();

  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <QRCodeCanvas
        id='gen-qr-code-base'
        value={props.qrCodeValue}
        size={512}
        bgColor='#FFFFE0'
        fgColor='#000000'
        imageSettings={{
          src: './beeline-logo.png',
          height: 100,
          width: 100,
          excavate: true
        }}
        style={{ display: 'none' }}
      />
      <button onClick={downloadQRCode} style={{ margin: '1rem' }}>Download</button>
    </div>
  );
}

export default QRCodeDownload;