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

interface ITest {
  delay: number;
  result: string;
}

interface Props {
  test: ITest;
  setTest: React.Dispatch<
    React.SetStateAction<{
      delay: number;
      result: string;
    }>
  >;
}

const OpenCamera: FC<Props> = ({ test, setTest }) => {
  const handleScan = (result: any): any => {
    if (result) {
      console.log(result);
      setTest(result);
    }
  };

  const handleError = (err: any): any => {
    console.error(err);
  };

  return (
    <CameraContainer>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{test.result}</p>
    </CameraContainer>
  );
};

export default OpenCamera;
