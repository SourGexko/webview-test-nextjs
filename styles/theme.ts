import { DefaultTheme } from "styled-components";

export const TITLE_BAR_HEIGHT = "2rem";

const size = {
  titleBarHeight: "2rem",
  sideBarWidth: "16rem",
};

export const darkTheme: DefaultTheme = {
  size,
  colors: {
    primary: {
      default: "#7c78ff",
    },
    secondary: {
      default: "#85C88A",
    },
    error: {
      default: "#EE5007",
    },
    warning: {
      default: "#F8CB2E",
    },
    shadow: {
      default: "#00000044",
      500: "#00000055",
    },
    backgroundColor: {
      default: "#2C2C2C",
      100: "#373737",
      200: "#363635",
      300: "#323232",
      400: "#2D2D2D",
      500: "#2C2C2C",
      600: "#272727",
      700: "#232323",
      800: "#222222",
      900: "#1D1D1D",
    },
    fontColor: {
      default: "#f8f9fa",
      100: "#212529",
      200: "#343a40",
      300: "#495057",
      400: "#6c757d",
      500: "#adb5bd",
      600: "#ced4da",
      700: "#dee2e6",
      800: "#e9ecef",
      900: "#f8f9fa",
    },
  },
};

export const lightTheme: DefaultTheme = {
  size,
  colors: {
    primary: {
      default: "#3f4cdc",
    },
    secondary: {
      default: "#85C88A",
    },
    error: {
      default: "#EE5007",
    },
    warning: {
      default: "#F8CB2E",
    },
    shadow: {
      default: "#00000022",
      500: "#00000033",
    },
    backgroundColor: {
      default: "#FFF9F9",
      900: "#F1F1F1",
      800: "#d1d1d1",
      700: "#d6d6d6",
      600: "#dbdbdb",
      500: "#e0e0e0",
      400: "#e6e6e6",
      300: "#ebebeb",
      200: "#f5f5f5",
      100: "#f0f0f0",
    },
    fontColor: {
      default: "#212529",
      100: "#f8f9fa",
      200: "#e9ecef",
      300: "#dee2e6",
      400: "#ced4da",
      500: "#adb5bd",
      600: "#6c757d",
      700: "#495057",
      800: "#343a40",
      900: "#212529",
    },
  },
};
