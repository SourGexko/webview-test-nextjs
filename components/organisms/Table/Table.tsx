import React from "react";
import { Row, TableInstance } from "react-table";
import styled, { CSSProperties } from "styled-components";

interface TableComponentProps {
  tableInstance: TableInstance<any>;
  onClickRow?: (row: Row<any>) => void;
  onContextMenu?: (
    event: React.MouseEvent<HTMLTableRowElement>,
    row: Row<any>
  ) => void;
  style?: CSSProperties;
  selectedId?: string | number;
  currentSelectedId?: string | number;
  hasHeader?: boolean;
}

export function Table({
  tableInstance,
  onClickRow,
  onContextMenu,
  style,
  selectedId,
  currentSelectedId,
  hasHeader = true,
}: TableComponentProps) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div style={{ display: "flex", justifyContent: "center", ...style }}>
      <TableContainer {...getTableProps()}>
        {hasHeader && (
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <Th {...column.getHeaderProps()}>
                        {
                          // Render the header
                          column.render("Header")
                        }
                      </Th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
        )}
        {/* Apply the table body props */}
        <Tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <Tr
                  {...row.getRowProps()}
                  onClick={() => {
                    if (onClickRow !== undefined) {
                      onClickRow(row);
                    }
                  }}
                  onContextMenu={(e) => {
                    if (onContextMenu !== undefined) {
                      e.stopPropagation();
                      onContextMenu(e, row);
                    }
                  }}
                >
                  {
                    // Loop over the rows cells
                    row.cells.map((cell) => {
                      // Apply the cell props
                      return (
                        <Td
                          selected={
                            selectedId !== undefined &&
                            cell.row.original.code === selectedId
                          }
                          currentSelected={
                            currentSelectedId !== undefined &&
                            cell.row.original.code === currentSelectedId
                          }
                          {...cell.getCellProps()}
                        >
                          {
                            // Render the cell contents
                            cell.render("Cell")
                          }
                        </Td>
                      );
                    })
                  }
                </Tr>
              );
            })
          }
        </Tbody>
      </TableContainer>
    </div>
  );
}

const TableContainer = styled.table`
  width: 100%;
  border-spacing: 0 1rem;
  border-collapse: separate;
`;

const Tr = styled.tr`
  cursor: pointer;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px 0 ${({ theme }) => theme.colors.shadow.default};
  transition: 0.3s;
  &:hover {
    box-shadow: 0 8px 16px 0 ${({ theme }) => theme.colors.shadow[500]};
  }
  &:active {
    transform: scale(0.992);
  }
`;

const Th = styled.th`
  height: 0rem;
  font-weight: 300;
  overflow: hidden;
  white-space: nowrap;
`;

const Td = styled.td<{ selected?: boolean; currentSelected?: boolean }>`
  border: solid 1px ${({ theme }) => theme.colors.backgroundColor[500]};
  border-style: solid none;
  transition: 0.3s;
  color: ${({ theme, selected }) =>
    selected ? theme.colors.fontColor[300] : "inherit"};
  background-color: ${({ theme, selected, currentSelected }) =>
    currentSelected
      ? theme.colors.primary.default
      : selected
      ? theme.colors.secondary.default
      : theme.colors.backgroundColor[200]};
  padding: 0.5rem;
  overflow: hidden;
  white-space: nowrap;
  &:first-child {
    border-left-style: solid;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  &:last-child {
    border-right-style: solid;
    border-bottom-right-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }
`;

const Tbody = styled.tbody`
  padding: 1rem 0;
`;

// https://kiranworkspace.com/downloads/user-table-ui-design-html5/
