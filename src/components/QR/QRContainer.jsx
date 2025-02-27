import React, { Component } from 'react';
import QrReader from 'react-qr-scanner';

// https://medium.com/@johndoan42/how-to-implement-a-qr-code-reader-into-your-react-application-3638e466dc79

class QRContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delay: 250,
            result: 'Hold QR Code steady and clear to scan',
            scanning: true,
        };
        this.handleScan = this.handleScan.bind(this);
    }

    handleScan(data) {

        if (this.state.scanning && data !== null) {
            if (data.text.startsWith('h365://')) {
                const vid = document.getElementById('qr-code-scanner');
                console.log(data.text)
                vid.pause();
                vid.remove();
                this.setState({
                    result: data !== null ? data.text : 'Hold QR Code steady and clear to scan',
                    scanning: false,
                });
            }
        }
    }

    handleError(err) {
        console.error(err);
    }

    render() {
        const previewStyle = {
            height: 1080/4,
            width: 1920/4,
            display: 'flex',
            justifyContent: 'center',
        };

        const camStyle = {
            display: 'flex',
            justifyContent: 'center',
        };

        const textStyle = {
            fontSize: '14px',
            textAlign: 'center',
        };

        return (
            <React.Fragment>
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
            </React.Fragment>
        )
    }
}

export default QRContainer;