interface DefaultTheme {
  primaryColor: string;
  secondaryColor: string;
  width: number;
  height: number;
  boxSizing: string;
  minWidth: number;
  maxWidth: number;
}

export const lightTheme: DefaultTheme = {
  primaryColor: "#333",
  secondaryColor: "red",
  width: 375,
  height: 667,
  boxSizing: "border-box",
  minWidth: 375,
  maxWidth: 375
};
