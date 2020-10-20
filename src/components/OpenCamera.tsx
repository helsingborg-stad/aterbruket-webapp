import React, { FC } from "react";
import QrReader from "react-qr-reader";
import styled from "styled-components";

const CameraContainer = styled.section`
  text-align: center;
  @media only screen and (max-width: 600px) {
    width: 100%;
    height: 100%;
    margin: 11% 0;
  }

  @media only screen and (min-width: 601px) {
    width: 50%;
    height: 50%;
    margin: 2% 0;
  }
`;

interface IQrCamera {
  delay: number;
  result: string;
}

interface Props {
  qrCamera: IQrCamera;
  setQrCamera: React.Dispatch<
    React.SetStateAction<{
      delay: number;
      result: string;
    }>
  >;
}

const OpenCamera: FC<Props> = ({ qrCamera, setQrCamera }) => {
  const handleScan = (result: any): any => {
    console.log(result);
    if (result) {
      console.log(result);
      setQrCamera({ ...qrCamera, result: result });
    }
  };

  const handleError = (err: any): any => {
    console.error(err);
  };

  return (
    <CameraContainer>
      <QrReader
        delay={qrCamera.delay}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
        showViewFinder={false}
      />
      <p>{qrCamera.result}</p>
    </CameraContainer>
  );
};

export default OpenCamera;
