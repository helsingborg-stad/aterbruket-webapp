interface DefaultTheme {
  minHeight: number;
  minWidth: number;
  width: number;
  padding: number[];
  boxSizing: string;
  primaryColor: string;
  secondaryColor: string;
}

const theme: DefaultTheme = {
  minHeight: 100,
  minWidth: 375,
  width: 100,
  padding: [1, 0.2],
  boxSizing: "border-box",
  primaryColor: "#333",
  secondaryColor: "lightgray"
};

export default theme;
