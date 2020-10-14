import React, { FC, useState } from "react";
import OpenCamera from "../components/OpenCamera";

// interface Props {
//   test: {
//     delay: number;
//     result: string;
//   };
//   setTest: React.Dispatch<
//     React.SetStateAction<{
//       delay: number;
//       result: string;
//     }>
//   >;
// }

const Home: FC = () => {
  const [test, setTest] = useState({ delay: 500, result: "No result" });
  return (
    <main>
      Home
      <OpenCamera test={test} setTest={setTest} />
    </main>
  );
};

export default Home;
