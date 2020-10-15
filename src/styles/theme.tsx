interface DefaultTheme {
  minHeight: number;
  minWidth: number;
  width: number;
  padding: number[];
  boxSizing: string;
  primaryColor: string;
}

const theme: DefaultTheme = {
  minHeight: 100,
  minWidth: 375,
  width: 100,
  padding: [0, 0, 1, 0],
  boxSizing: "border-box",
  primaryColor: "#FFAA9B",
};

export default theme;
