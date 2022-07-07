import React, { useState } from "react";
import { Column, Row, useTable } from "react-table";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { Section } from "../../../../atoms/Section/Section";
import CodeSectionHeader from "../../../../molecules/CodeSectionHeader/CodeSectionHeader";
import SectionBody from "../../../../atoms/SectionBody/SectionBody";
import { Code, CodeState, currentSelectedCodeState } from "../../core/states";
import { Manual } from "../../../../../data/api";
import TableCell from "../../../../atoms/TableCell/TableCell";
import { Table } from "../../../../organisms/Table";

function ManualSectionWrapper() {
  const currentSelectedCodeInstance = useRecoilValue(currentSelectedCodeState)!;
  const router = useRouter();
  return (
    <Section>
      <CodeSectionHeader
        subject="메뉴얼"
        onClickButton={() => {
          if (currentSelectedCodeInstance) {
            const {
              depth,
              code: { code, description },
            } = currentSelectedCodeInstance;
            router.replace(
              `/manuals/${depth}/${code}/create?description=${description}`
            );
          }
        }}
        disabled={!currentSelectedCodeInstance}
      ></CodeSectionHeader>
      <SectionBody style={{ padding: "1rem" }}>
        {currentSelectedCodeInstance && (
          <ManualSection code={currentSelectedCodeInstance.code} />
        )}
      </SectionBody>
    </Section>
  );
}

interface ManualSectionProps {
  code: Code;
}

function ManualSection({ code }: ManualSectionProps) {
  const router = useRouter();

  const onClickRow = (row: Row<Manual>) => {
    router.replace(`/manuals/${code.depth}/${code.code}/${row.original.id}`);
  };

  const manualData = React.useMemo<Manual[]>(() => code.manuals, [code]);

  const manualColumns: Column<Manual>[] = React.useMemo(
    () => [
      {
        Header: "제목",
        accessor: "subject",
        Cell: ({ value }) => <TableCell align="center">{value}</TableCell>,
      },
      {
        Header: "작성자",
        accessor: "writtenBy",
        Cell: ({ value }) => <TableCell align="center">{value.id}</TableCell>,
      },
    ],
    []
  );
  const manualTable = useTable({ columns: manualColumns, data: manualData });

  return (
    <Table
      hasHeader={false}
      style={{ marginTop: "-1rem" }}
      tableInstance={manualTable}
      onClickRow={(row) => onClickRow(row)}
    />
  );
}

export default ManualSectionWrapper;
