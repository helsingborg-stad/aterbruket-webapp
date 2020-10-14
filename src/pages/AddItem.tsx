import React, { FC, useState } from "react";
import OpenCamera from "../components/OpenCamera";

type Props = {
  alreadyAQRCode: boolean;
};

const AddItem: FC<Props> = ({ alreadyAQRCode }) => {
  const [test, setTest] = useState({ delay: 500, result: "No result" });
  console.log("Do i change? ", alreadyAQRCode);

  return (
    <main>
      Add Item
      {!alreadyAQRCode ? (
        "Empty form"
      ) : (
        <OpenCamera test={test} setTest={setTest} />
      )}
      {/* <OpenCamera test={test} setTest={setTest} /> */}
    </main>
  );
};

export default AddItem;
