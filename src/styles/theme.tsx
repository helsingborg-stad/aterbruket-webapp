import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primaryColor: string;
    secondaryColor: string;
    width: number;
  }
}

export const lightTheme: DefaultTheme = {
  primaryColor: "#333",
  secondaryColor: "#666",
  width: 350
};
