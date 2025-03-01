import { Component } from 'react';
import { QRReaderContainerProps, QRReaderResponseProps } from '../../utils/types';

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
      videoDevices: [],
      selectedDeviceId: '',
    };
    this.handleScan = this.handleScan.bind(this);
    this.handleDeviceChange = this.handleDeviceChange.bind(this);
  }

  componentDidMount() {
    this.getVideoDevices();
  }

  // Get list of available video devices
  getVideoDevices() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        this.setState({
          videoDevices: videoDevices,  // Use the last device in the list as the default
          selectedDeviceId: videoDevices.length > 0 ? videoDevices[videoDevices.length-1].deviceId : '',
        });
      })
      .catch(err => console.error(err));
  }

  // Handle video device selection change
  handleDeviceChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState({ selectedDeviceId: event.target.value });
  }

  // Handle QR code scan
  handleScan(data: QRReaderResponseProps | null) {
    if (this.state.scanning && data !== null) {
      console.log(data);
      if (data.text.startsWith('h365://')) {
        const vid = document.getElementById('qr-code-scanner') as HTMLVideoElement;
        vid.pause();
        vid.remove();
        this.setState({
          result: data.text,
          scanning: false,
        });
      }
    }
  }

  // Handle QR code scan error
  handleError(err: Error): void {
    console.error(err);
  }

  render() {
    const mainStyle: React.CSSProperties = {
      maxWidth: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    };

    const previewStyle: React.CSSProperties = {
      width: '60%',
      display: 'flex',
      justifyContent: 'center',
    };

    const textStyle: React.CSSProperties = {
      fontSize: 14,
      textAlign: 'center',
      overflowWrap: 'anywhere'
    };

    return (
      <div style={mainStyle}>
        {/* Dropdown to select video device */}
        <select
          value={this.state.selectedDeviceId}
          onChange={this.handleDeviceChange}
          style={{ marginBottom: '10px', padding: '5px' }}
        >
          {this.state.videoDevices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Device ${device.deviceId}`}
            </option>
          ))}
        </select>
        <QrReader
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          id={'qr-code-scanner'}
          constraints={this.state.selectedDeviceId && ({ audio: false, video: { deviceId: this.state.selectedDeviceId } })}
        />
        <p style={textStyle}>{this.state.result}</p>
        {/* add a button to refresh the site after result is displayed */}
        <button style={{ display: this.state.scanning ? 'none' : 'block' }}
          onClick={() => window.location.reload()}>Refresh Page</button>
      </div>
    )
  }

}

export default QRReaderContainer;