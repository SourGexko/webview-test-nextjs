import { IpcRenderer } from "electron";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize,
  FiMinus,
  FiMoon,
  FiRefreshCcw,
  FiRefreshCw,
  FiRotateCw,
  FiSun,
  FiX,
} from "react-icons/fi";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { themeState } from "../../../states/themeState";
import { ActionButton } from "../../molecules/ActionButton";

export function TitleBar() {
  const [themeMode, setThemeMode] = useRecoilState(themeState);
  const toggleThemeMode = useCallback(() => {
    setThemeMode((currentMode) => (currentMode === "light" ? "dark" : "light"));
  }, [setThemeMode]);
  const [ipcRenderer, setIpcRenderer] = useState<IpcRenderer>();

  useEffect(() => {
    if (typeof window !== undefined) {
      setIpcRenderer(window.require("electron").ipcRenderer);
    }
  }, []);

  const router = useRouter();
  const goBack = () => router.back();
  const refresh = () => router.reload();
  return (
    <Container>
      <ActionButtonGroup>
        <ActionButton onClick={goBack} icon={<FiChevronLeft />} />
        <ActionButton onClick={refresh} icon={<FiRotateCw />} />
        <ActionButton
          onClick={toggleThemeMode}
          icon={themeMode === "light" ? <FiSun /> : <FiMoon />}
        />
      </ActionButtonGroup>
      <ActionButtonGroup>
        <ActionButton
          onClick={() => ipcRenderer!.postMessage("WINDOW_ACTIONS", "MINIMIZE")}
          icon={<FiMinus />}
        />
        <ActionButton
          onClick={() => ipcRenderer!.postMessage("WINDOW_ACTIONS", "MAXIMIZE")}
          icon={<FiMaximize />}
        />
        <ActionButton
          onClick={() => ipcRenderer!.postMessage("WINDOW_ACTIONS", "QUIT")}
          icon={<FiX />}
        />
      </ActionButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: ${({ theme }) => theme.size.titleBarHeight};
  background-color: ${({ theme }) => theme.colors.backgroundColor[200]};
  user-select: none;
  -webkit-user-select: none;
  -webkit-app-region: drag;
  position: fixed;
  width: 100%;
  z-index: 99;
  border-bottom: 1px solid ${({ theme }) => theme.colors.fontColor[200]};
`;

const ActionButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;
