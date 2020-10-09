import React, { FC } from "react";

import styled from "styled-components";

const Box = styled.div`
  /* background-color: ${(props) => props.theme.secondaryColor};
  /* width: ${(props) => `${props.theme.width}px`}; */
  /* height: ${(props) => `${props.theme.height}px`}; */
  /* min-width: ${(props) => `${props.theme.minWidth}px`}; */
  /* max-width: ${(props) => `${props.theme.maxWidth}px`}; */

  /* box-sizing: ${(props) => props.theme.boxSizing}; */
  /* padding: 10px; */
  background-color: yellow;
  max-width: 90%;
`;

const Home: FC = () => {
  return <Box>Home</Box>;
};

export default Home;
