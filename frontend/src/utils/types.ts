// Main interfaces

export interface LoginProps {
  visible: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
}

export interface UserProps {
  username: string;
  password?: string;
  userAlias: string;
  codeCountRedeemedTOT?: number;
  codeCountSubmittedNG?: number;
  codeCountSubmittedTOT?: number;
}

export interface LeaderboardEntryProps {
  userAlias: string;
  codeCountRedeemedTOT: number;
}

export interface LeaderboardProps {
  leaderboard: LeaderboardEntryProps[];
}

export interface TableDataProps {
  id: number;
  player: string;
  code: string;
  claimed: boolean;
}

// QR Code interfaces

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
  username?: string;
}