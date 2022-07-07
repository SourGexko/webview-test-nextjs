import { CodeContentPropsLookupTable } from "./interfaces";

export const codeContentPropsLookupTable: CodeContentPropsLookupTable = {
  store: {
    appBarTitle: "가맹점코드",
    nameCodeDepth1: "대분류",
    nameCodeDepth2: "중분류",
    nameCodeDepth3: "소분류",
    disableToEditCodeDepth1: true,
  },
  machine: {
    appBarTitle: "기기코드",
    nameCodeDepth1: "기기종류",
    nameCodeDepth2: "제조사",
    nameCodeDepth3: "기기모델",
  },
  submachine: {
    appBarTitle: "부품코드",
    nameCodeDepth1: "부품종류",
    nameCodeDepth2: "제조사",
    nameCodeDepth3: "부품모델",
  },
  program: {
    appBarTitle: "프로그램코드",
    nameCodeDepth1: "프로그램종류",
    nameCodeDepth2: "프로그램명",
    nameCodeDepth3: "버전",
  },
} as const;
