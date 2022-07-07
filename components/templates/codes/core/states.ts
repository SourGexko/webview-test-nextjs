import { atom } from "recoil";
import {
  CodeDepth0,
  CodeDepth1,
  CodeDepth2,
  CodeDepth3,
} from "../../../../data/api";

export type Code = CodeDepth0 & CodeDepth1 & CodeDepth2 & CodeDepth3;

export type ParentCode = CodeDepth0 | CodeDepth1 | CodeDepth2;

export type ChildCode = CodeDepth1 | CodeDepth2 | CodeDepth3;

export interface CodeState {
  code: Code;
  depth: number;
}

export const initialCodeDepth0State = atom<CodeDepth0 | undefined>({
  key: "initialCodeDepth0State",
  default: undefined,
});

export const selectedCodeDepth1State = atom<CodeDepth1 | undefined>({
  key: "selectedCodeDepth1State",
  default: undefined,
});

export const selectedCodeDepth2State = atom<CodeDepth2 | undefined>({
  key: "selectedCodeDepth2State",
  default: undefined,
});

export const selectedCodeDepth3State = atom<CodeDepth3 | undefined>({
  key: "selectedCodeDepth3State",
  default: undefined,
});

export const currentSelectedCodeState = atom<CodeState | undefined>({
  key: "currentSelectedCodeState",
  default: undefined,
});
