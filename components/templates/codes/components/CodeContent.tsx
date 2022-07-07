import { useEffect, useMemo, useState } from "react";
import { Column, Row, useTable } from "react-table";
import { useRecoilState } from "recoil";
import HStack from "../../../atoms/HStack/HStack";
import { Section } from "../../../atoms/Section/Section";
import SectionBody from "../../../atoms/SectionBody/SectionBody";
import TableCell from "../../../atoms/TableCell/TableCell";
import CodeSectionDivider from "../../../molecules/CodeSectionDivider/CodeSectionDivider";
import CodeSectionHeader from "../../../molecules/CodeSectionHeader/CodeSectionHeader";
import MainContainer from "../../../molecules/MainContainer/MainContainer";
import MainContent from "../../../molecules/MainContent/MainContent";
import { AppBar } from "../../../organisms";
import { Table } from "../../../organisms/Table";
import { CodeDepth1, CodeDepth2, CodeDepth3 } from "../../../../data/api";
import { useContextMenu } from "../../../../hooks/useContextMenu";
import { CodeContentPropsWithData } from "../core/interfaces";
import { CodeManageModal } from "./modals/CodeManageModal";
import InfoSection from "./sections/InfoSection";
import ManualSectionWrapper from "./sections/ManualSection";
import {
  Code,
  currentSelectedCodeState,
  ParentCode,
  selectedCodeDepth1State,
  selectedCodeDepth2State,
  selectedCodeDepth3State,
} from "../core/states";
import { useRouter } from "next/router";
import ContextMenu from "./sections/ContextMenu";
import ContextMenuItem from "./sections/ContextMenuItem";
import { FiScissors, FiTrash } from "react-icons/fi";
import { ModalMode } from "../../../../core/types";

export function CodeContent({
  appBarTitle,
  code,
  nameCodeDepth1,
  nameCodeDepth2,
  nameCodeDepth3,
  disableToEditCodeDepth1 = false,
  disableToEditCodeDepth2 = false,
  disableToEditCodeDepth3 = false,
}: CodeContentPropsWithData) {
  const router = useRouter();
  const [selectedCodeDepth1, setSelectedCodeDepth1] = useRecoilState(
    selectedCodeDepth1State
  );
  const [selectedCodeDepth2, setSelectedCodeDepth2] = useRecoilState(
    selectedCodeDepth2State
  );
  const [selectedCodeDepth3, setSelectedCodeDepth3] = useRecoilState(
    selectedCodeDepth3State
  );
  const [currentSelectedCode, setCurrentSelectedCode] = useRecoilState(
    currentSelectedCodeState
  );

  const tableDataDepth1 = useMemo<CodeDepth1[]>(
    () => (code ? code.children : []),
    [code]
  );
  const tableDataDepth2 = useMemo<CodeDepth2[]>(
    () => (selectedCodeDepth1 ? selectedCodeDepth1.children : []),
    [selectedCodeDepth1]
  );
  const tableDataDepth3 = useMemo<CodeDepth3[]>(
    () => (selectedCodeDepth2 ? selectedCodeDepth2.children : []),
    [selectedCodeDepth2]
  );

  const codeColumns: Column<Code>[] = useMemo(
    () => [
      {
        Header: "정보",
        accessor: "description",
        Cell: ({ value }) => <TableCell align="center">{value}</TableCell>,
      },
      {
        Header: "코드",
        accessor: "code",
        Cell: ({ value }) => <TableCell align="center">{value}</TableCell>,
      },
    ],
    []
  );

  const tableInstanceDepth1 = useTable({
    columns: codeColumns as Column<CodeDepth1>[],
    data: tableDataDepth1,
  });
  const tableInstanceDepth2 = useTable({
    columns: codeColumns as Column<CodeDepth2>[],
    data: tableDataDepth2,
  });
  const tableInstanceDepth3 = useTable({
    columns: codeColumns as Column<CodeDepth3>[],
    data: tableDataDepth3,
  });

  const onClickRowDepth1 = (row: Row<Code>) => {
    setCurrentSelectedCode({ depth: 1, code: row.original });
    setSelectedCodeDepth1(row.original);
    setSelectedCodeDepth2(undefined);
    setSelectedCodeDepth3(undefined);
  };

  const onClickRowDepth2 = (row: Row<Code>) => {
    setCurrentSelectedCode({ depth: 2, code: row.original });
    setSelectedCodeDepth2(row.original);
    setSelectedCodeDepth3(undefined);
  };

  const onClickRowDepth3 = (row: Row<Code>) => {
    setCurrentSelectedCode({ depth: 3, code: row.original });
    setSelectedCodeDepth3(row.original);
  };

  // code manage modal props
  const [modalMode, setModalMode] = useState<ModalMode>("create");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChildDepth, setSelectedChildDepth] = useState(0);
  const [selectedParentCode, setSelectedParentCode] = useState<ParentCode>();

  // contextMenu hooks
  const {
    isContextMenuOpen,
    position,
    onContextMenu,
    onHideContextMenu,
    selectedContext,
  } = useContextMenu<Code>();

  const onClickContextMenuItem = () => {
    setIsModalOpen(true);
    setModalMode("update");
  };

  // initialize when route change
  useEffect(() => {
    return () => {
      setSelectedCodeDepth1(undefined);
      setSelectedCodeDepth2(undefined);
      setSelectedCodeDepth3(undefined);
      setCurrentSelectedCode(undefined);
    };
  }, [router]);

  // update child codes when mutate for recoil state
  useEffect(() => {
    const newCode = code?.children.find(
      (code) => code.code === selectedCodeDepth1?.code
    );
    setSelectedCodeDepth1(newCode);
  }, [code, selectedCodeDepth1?.code, selectedCodeDepth1]);

  useEffect(() => {
    const currentSelectedCodeDepth1 = code?.children.find(
      (code) => code.code === selectedCodeDepth1?.code
    );
    const newCode = currentSelectedCodeDepth1?.children.find(
      (code) => code.code === selectedCodeDepth2?.code
    );
    setSelectedCodeDepth2(newCode);
  }, [
    code,
    selectedCodeDepth1?.code,
    selectedCodeDepth2?.code,
    setSelectedCodeDepth2,
  ]);

  return (
    <MainContainer onClick={onHideContextMenu}>
      <AppBar title={appBarTitle}></AppBar>
      <MainContent hasRightSection={false}>
        <HStack
          style={{
            height: "40%",
            minHeight: "40%",
          }}
        >
          <Section>
            <CodeSectionHeader
              subject={nameCodeDepth1}
              subtitle="대분류"
              disabled={disableToEditCodeDepth1}
              onClickButton={() => {
                setSelectedParentCode(code);
                setSelectedChildDepth(1);
                setModalMode("create");
                setIsModalOpen(true);
              }}
            />
            <SectionBody>
              <Table
                hasHeader={false}
                selectedId={selectedCodeDepth1?.code}
                currentSelectedId={currentSelectedCode?.code.code}
                tableInstance={tableInstanceDepth1}
                style={{ padding: "0 1rem" }}
                onClickRow={onClickRowDepth1}
                onContextMenu={onContextMenu}
              />
            </SectionBody>
          </Section>
          <CodeSectionDivider />
          <Section>
            <CodeSectionHeader
              subject={nameCodeDepth2}
              subtitle="중분류"
              disabled={disableToEditCodeDepth2 || !selectedCodeDepth1}
              onClickButton={() => {
                setSelectedParentCode(selectedCodeDepth1);
                setSelectedChildDepth(2);
                setModalMode("create");
                setIsModalOpen(true);
              }}
            />
            <SectionBody>
              <Table
                hasHeader={false}
                selectedId={selectedCodeDepth2?.code}
                currentSelectedId={currentSelectedCode?.code.code}
                tableInstance={tableInstanceDepth2}
                style={{ padding: "0 1rem" }}
                onClickRow={onClickRowDepth2}
              />
            </SectionBody>
          </Section>
          <CodeSectionDivider />
          <Section>
            <CodeSectionHeader
              subject={nameCodeDepth3}
              subtitle="소분류"
              disabled={disableToEditCodeDepth3 || !selectedCodeDepth2}
              onClickButton={() => {
                setSelectedParentCode(selectedCodeDepth2);
                setSelectedChildDepth(3);
                setModalMode("create");
                setIsModalOpen(true);
              }}
            />
            <SectionBody>
              <Table
                hasHeader={false}
                selectedId={selectedCodeDepth3?.code}
                currentSelectedId={currentSelectedCode?.code.code}
                tableInstance={tableInstanceDepth3}
                style={{ padding: "0 1rem" }}
                onClickRow={onClickRowDepth3}
              />
            </SectionBody>
          </Section>
        </HStack>
        <HStack style={{ height: "60%" }}>
          <InfoSection />
          <ManualSectionWrapper />
        </HStack>
      </MainContent>
      <ContextMenu isOpen={isContextMenuOpen} position={position}>
        <ContextMenuItem
          label="수정"
          icon={<FiScissors />}
          onClick={onClickContextMenuItem}
        />
        <ContextMenuItem label="삭제" icon={<FiTrash />} />
      </ContextMenu>
      <CodeManageModal
        mode={modalMode}
        updateTargetCode={selectedContext}
        parentCode={selectedParentCode}
        depth={selectedChildDepth}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </MainContainer>
  );
}
