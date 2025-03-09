import { Component } from 'react';
import QRCodeDownload from './QRCodeDownload';
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
  
  // Check camera permission status and request permission if needed
  componentDidMount() {
    navigator.permissions.query({ name: "camera" as PermissionName }).then((permissionStatus) => {
      if (permissionStatus.state === "granted") {
        this.getVideoDevices(); // Update device list immediately if already granted
      } else if (permissionStatus.state === "prompt") {
        navigator.mediaDevices.getUserMedia({ video: true })
          .then(() => this.getVideoDevices()) // Update devices after permission is granted
          .catch(err => console.error("Camera access denied:", err));
      }
      permissionStatus.onchange = () => {
        if (permissionStatus.state === "granted") {
          this.getVideoDevices();
        }
      };
    });
  }

  // Get list of available video devices, with previously selected device if available
  getVideoDevices() {
    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        const videoDevices = devices.filter(device => device.kind === "videoinput");
        const savedDeviceId = localStorage.getItem("selectedCamera");  // Retrieve previously selected device from localStorage
        const selectedDeviceId = (savedDeviceId && videoDevices.find(device => device.deviceId === savedDeviceId)) ?
          savedDeviceId : videoDevices[0]?.deviceId || '';
        this.setState({ videoDevices: videoDevices, selectedDeviceId: selectedDeviceId });
      })
      .catch(err => console.error(err));
  }

  // Handle video device selection change and store selected device
  handleDeviceChange(event: React.ChangeEvent<HTMLSelectElement>) {
    localStorage.setItem("selectedCamera", event.target.value);
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
        {/* after result is displayed, add download and refresh button */}
        {this.state.scanning ? null :
          <>
            <QRCodeDownload qrCodeValue={this.state.result} userName={'scanner'}></QRCodeDownload>
            <button onClick={() => window.location.reload()}>Refresh Page</button>
          </>}
      </div>
    )
  }

}

export default QRReaderContainer;