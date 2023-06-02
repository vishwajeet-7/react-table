import React, { useMemo } from "react";
import mockData from "../mockdata.json";
import { useTable, usePagination } from "react-table";
import { COLUMNS } from "./Column";
import "./basicTable.css";

export const PaginationTable = () => {
  //usememo helps us in memoizing data of columns, so that we do not have to calculate the same data on each render
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => mockData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, //Page instead of row
    nextPage, // to use next page button
    previousPage, // to use prev page button
    canNextPage, //returns a bool value, if possible or not
    canPreviousPage,
    pageOptions, // to view which page we are on
    state,
    prepareRow,
  } = useTable({ columns, data }, usePagination); //usePagination hook goes here

  const {pageIndex} = state; //to get the page we are on

  return (
    <>
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
          {page.map((row) => {
            //page instead of row here as well
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
      </table>
      <div>
          <span>
            Page{' '}
            <strong>
                {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
      </div>
      {/* added two button to prev and next & added an event listener which will invoke PreviousPage and NextPage on click of the button */}
      <div>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>Prev</button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
      </div>
    </>
  );
};
