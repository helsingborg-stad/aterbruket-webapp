import React, { FC, useState } from "react";
import QrReader from "react-qr-reader";

interface iTest {
  delay: number;
  result: string;
}

const OpenCamera: FC<iTest> = () => {
  const [test, setTest] = useState({ delay: 500, result: "No result" });

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
