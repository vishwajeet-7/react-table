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
    gotoPage, // to move to a particular page
    pageCount,
    setPageSize, //to manipulate the number of results shown per page
    prepareRow,
  } = useTable({ columns, data, initialState:{pageIndex : 0} }, usePagination); //usePagination hook goes here

  const { pageIndex,pageSize } = state; //to get the page we are on & set the page size

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
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        {/* Function to jump to a specified page number */}
        <span>
            | Go to page: {' '}
            <input type="number" defaultValue={pageIndex+1} onChange={(e)=>{
                const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(pageNumber)
            }} style={{width:'50px'}}/>
        </span>
        <select value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
            {
                [10,25,50].map((pageSize)=> (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))
            }
        </select>
      </div>
      {/* added two button to prev and next & added an event listener which will invoke PreviousPage and NextPage on click of the button */}
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Prev
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>
      </div>
    </>
  );
};
