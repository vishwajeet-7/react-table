import React, { useMemo } from "react";
import mockData from "../mockdata.json";
import { useTable, useGlobalFilter,useFilters } from "react-table";
import { COLUMNS } from "./Column";
import "./basicTable.css";
import { GlobalFilter } from "./GlobalFilter";

export const FilteringTable = () => {
  //usememo helps us in memoizing data of columns, so that we do not have to calculate the same data on each render
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockData, []);

  const {
    state,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable({ columns, data },useFilters, useGlobalFilter);
  const { globalFilter } = state;

  return (
    <>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
                </th>
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
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((footerGroup) => (
            <tr {...footerGroup.getFooterGroupProps()}>
              {footerGroup.headers.map((column) => (
                <td {...column.getFooterProps()}>{column.render("Footer")}</td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </>
  );
};