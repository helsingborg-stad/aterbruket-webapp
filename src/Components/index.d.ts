import * as React from "react";


  interface IQrReader {
    onScan: (data: string | null) => void;
    onError: (err: any) => void;
    onLoad?: () => void;
    onImageLoad?: (event: React.SyntheticEvent<HTMLImageElement>) => void;
    delay?: number | false;
    facingMode?: 'user' | 'environment';
    legacyMode?: boolean;
    resolution?: number;
    showViewFinder?: boolean;
    style?: any;
    className?: string;
  }

export as namespace QrReader;

declare class QrReader extends React.Component<IQrReader> {
    openImageDialog: () => void;
}

export = QrReader;