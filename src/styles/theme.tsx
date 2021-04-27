interface DefaultTheme {
  appTheme: {
    minHeight: number;
    minWidth: number;
    width: number;
    padding: number[];
    boxSizing: string;
    primaryColor: string;
    fontFamily: string;
  };
  headerTheme: {
    width: number;
    height: number;
    display: string;
    flexDirection: string;
    alignItems: string;
    justifyContent: string;
    position: string;
    padding: number[];
    backgroundColor: string;
    fontStyle: string;
    fontWeight: number;
    fontSize: number;
    lineHeight: number;
  };
  cardTheme: {
    backgroundColor: string;
    titleColor: string;
    amountColor: string;
    descColor: string;
  };
  formTheme: {
    // backgroundColor: string;
    // titleColor: string;
    // descColor: string;
    backgroundColor: string;
  };
  colors: {
    primary: string;
    primaryLight: string;
    primaryLighter: string;
    primaryDark: string;
    opacityPrimaryLight: string;
    secondaryDark: string;
    lightGray: string;
    offWhite: string;
    white: string;
    darkest: string;
    dark: string;
    darker: string;
    illustration: string;
  };
}

const theme: DefaultTheme = {
  appTheme: {
    minHeight: 100, // vh
    minWidth: 375, // px
    width: 100, // vw
    padding: [0, 0, 1, 0], // rem
    boxSizing: "border-box",
    primaryColor: "#FCFCFC",
    fontFamily: '"Roboto", sans-serif',
  },
  headerTheme: {
    width: 100, // %
    height: 25, // vh
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    position: "absolute",
    padding: [12, 0, 0, 24], // px
    backgroundColor: "#F8F8F8",
    fontStyle: "normal",
    fontWeight: 900,
    fontSize: 36, // px
    lineHeight: 124, // %
  },
  cardTheme: {
    backgroundColor: "#ffffff",
    titleColor: " #3D3D3D",
    amountColor: "#6F9725",
    descColor: "#3d3d3d",
  },
  formTheme: {
    // backgroundColor: "#ffffff",
    // titleColor: "#7a524a",
    // descColor: "#3d3d3d",
    backgroundColor: "#F5F5F5",
  },
  colors: {
    primary: "#50811B",
    primaryLight: "#80B14A",
    primaryLighter: "#E1E9DB",
    primaryDark: "#205400",
    opacityPrimaryLight: "#7fb04a1a", // This color dos not exist in figma
    secondaryDark: "#6F9725",
    lightGray: "#f5f5f5",
    offWhite: "#F8F8F8",
    white: "#ffffff",
    dark: "#707070",
    darker: "#565656",
    darkest: "#3D3D3D",
    illustration: "#C9D6C2",
  },
};

export default theme;
