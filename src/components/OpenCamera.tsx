import React, { FC, useState } from "react";
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
  console.log("VAD ÄR DU?    ", test);

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
      <button onClick={() => setTest({ delay: 500, result: "" })}>Click</button>
      <button onClick={() => setTest({ ...test, result: "New res" })}>
        Click
      </button>
      <button
        onClick={() =>
          setTest((prev) => {
            return { ...prev, result: "New res again" };
          })
        }
      >
        Click
      </button>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "50%" }}
      />
      <p>
        {test.result} and {test.delay}
      </p>
    </div>
  );
};

export default OpenCamera;
