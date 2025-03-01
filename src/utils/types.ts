export interface QRReaderContainerProps {
  delay: number;
  result: string;
  scanning: boolean;
  videoDevices: MediaDeviceInfo[];
  selectedDeviceId: string;
}

export interface QRReaderResponseProps {
  canvas: HTMLCanvasElement;
  format: number;
  numBits: number;
  rawBytes: Uint8Array;
  resultMetadata: Map<any, any>,
  text: string;
  timestamp: number;
}

export interface QRCodeDownloadProps {
  qrCodeValue: string;
  userName?: string;
}