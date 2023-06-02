import React, { useMemo } from "react";
import mockData from "../mockdata.json";
import { useTable } from "react-table";
import { COLUMNS } from "./Column";
import './basicTable.css';

export const BasicTable = () => {
  //usememo helps us in memoizing data of columns, so that we do not have to calculate the same data on each render
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockData, []);

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
