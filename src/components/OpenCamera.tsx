import React, { FC } from "react";
import QrReader from "react-qr-reader";

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
    <div>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "100%" }}
      />
      <p>{test.result}</p>
    </div>
  );
};

export default OpenCamera;
