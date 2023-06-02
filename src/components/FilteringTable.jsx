import React, { useMemo } from "react";
import mockData from "../mockdata.json";
import { useTable, useGlobalFilter,useFilters } from "react-table";
import { COLUMNS } from "./Column";
import "./basicTable.css";
import { GlobalFilter } from "./GlobalFilter";
import { ColumnFilter } from "./ColumnFilter";
import { DebounceGlobalFilter } from "./DebounceGlobalFilter";

export const FilteringTable = () => {
  //usememo helps us in memoizing data of columns, so that we do not have to calculate the same data on each render
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockData, []);

  //using this we can remove the Filters applied inside each column object separately
  const defaultColumn = useMemo(()=>{
    return {
        Filter: ColumnFilter
    }
  },[])

  const {
    state,
    setGlobalFilter,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable({ columns, data, defaultColumn },useFilters, useGlobalFilter); //hooks are used here
  const { globalFilter } = state;

  return (
    <>
    {/* GlobalFilter component and DebounceGlobalFilter Component goes here */}
    <DebounceGlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      {/* <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} /> */}
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
