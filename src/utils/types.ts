export interface QRReaderContainerProps {
  delay: number;
  result: string;
  scanning: boolean;
}

export interface QRCodeDownloadProps {
  qrCodeValue: string;
  userName?: string;
}