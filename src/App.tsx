import React, { FC } from "react";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { UserProvider } from "./contexts/UserContext";
import RootRouter from "./routes/RootRouter";
import theme from "./styles/theme";

const App: FC = () => {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <RootRouter />
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
