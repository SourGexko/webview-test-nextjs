import "styled-components";

interface ColorVariants {
  default: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
}

declare module "styled-components" {
  export interface DefaultTheme {
    size: {
      titleBarHeight: number | string;
      sideBarWidth: number | string;
    };
    colors: {
      primary: ColorVariants;
      secondary: ColorVariants;
      error: ColorVariants;
      warning: ColorVariants;
      backgroundColor: ColorVariants;
      fontColor: ColorVariants;
      shadow: ColorVariants;
    };
  }
}
