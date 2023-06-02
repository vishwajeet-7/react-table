import React, { useMemo } from "react";
import mockData from "../mockdata.json";
import { useTable,useSortBy } from "react-table";
import { COLUMNS} from "./Column";
import './basicTable.css';
import {IoIosArrowDropupCircle,IoIosArrowDropdownCircle} from 'react-icons/io'

export const SortingTable = () => {
    //usememo helps us in memoizing data of columns, so that we do not have to calculate the same data on each render
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => mockData, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = useTable({ columns, data },useSortBy);

    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render("Header")}
                            <span>{column.isSorted ? (column.isSortedDesc ? <IoIosArrowDropdownCircle/> : <IoIosArrowDropupCircle/>) : ''}</span>
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
                                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
            <tfoot>
                {
                    footerGroups.map((footerGroup) => (
                        <tr {...footerGroup.getFooterGroupProps()}>
                            {
                                footerGroup.headers.map((column) => (
                                    <td {...column.getFooterProps()}>{column.render('Footer')}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </tfoot>
        </table>
    );
};

