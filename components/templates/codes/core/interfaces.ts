import { CodeDepth0 } from "../../../../data/api";

export interface CodeContentProps {
  appBarTitle: string;
  nameCodeDepth1: string;
  nameCodeDepth2: string;
  nameCodeDepth3: string;
  disableToEditCodeDepth1?: boolean;
  disableToEditCodeDepth2?: boolean;
  disableToEditCodeDepth3?: boolean;
}

export interface CodeContentPropsLookupTable {
  [index: string]: CodeContentProps;
}

export interface CodeContentPropsWithData extends CodeContentProps {
  code: CodeDepth0;
}
