import React, { FC } from "react";

import styled from "styled-components";

const Box = styled.div`
  background: red;
  @media (max-width: 600px) {
    background: yellow;
  }
`;

const Home: FC = () => {
  return <Box>Home</Box>;
};

export default Home;
