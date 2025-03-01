import { Component } from 'react';
import { QRReaderContainerProps } from '../../utils/types';

// import QrReader from 'react-qr-scanner';
const QrReader = require('react-qr-scanner');

// https://medium.com/@johndoan42/how-to-implement-a-qr-code-reader-into-your-react-application-3638e466dc79


class QRReaderContainer extends Component<{}, QRReaderContainerProps> {

  constructor(props: {}) {
    super(props);
    this.state = {
      delay: 250,
      result: 'Hold QR Code steady and clear to scan',
      scanning: true,
    };
    this.handleScan = this.handleScan.bind(this);
  }

  handleScan(data: { text: string } | null) {  // not the full details of the data object
    if (this.state.scanning && data !== null) {
      if (data.text.startsWith('h365://')) {
        const vid = document.getElementById('qr-code-scanner') as HTMLVideoElement;
        console.log(data.text)
        vid.pause();
        vid.remove();
        this.setState({
          result: data !== null ? data.text : 'Hold QR Code steady and clear to scan',  // handle dynamic text
          scanning: false,
        });
      }
    }
  }

  handleError(err: Error): void {
    console.error(err);
  }

  render() {
    const previewStyle: React.CSSProperties = {
      height: 1080 / 4,
      width: 1920 / 4,
      display: 'flex',
      justifyContent: 'center',
    };

    const camStyle: React.CSSProperties = {
      display: 'flex',
      justifyContent: 'center',
    };

    const textStyle: React.CSSProperties = {
      fontSize: 14,
      textAlign: 'center',
    };

    return (
      <>
        <div style={camStyle}>
          <QrReader
            delay={this.state.delay}
            style={previewStyle}
            onError={this.handleError}
            onScan={this.handleScan}
            id={'qr-code-scanner'}
          />
        </div>
        <p style={textStyle}>{this.state.result}</p>
      </>
    )
  }

}

export default QRReaderContainer;