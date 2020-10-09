import React, { FC } from "react";

import styled from "styled-components";

const Box = styled.div`
  background-color: ${(props) => props.theme.secondaryColor};
  width: ${(props) => `${props.theme.width}px`};
`;

const Home: FC = () => {
  return <Box>Home</Box>;
};

export default Home;
