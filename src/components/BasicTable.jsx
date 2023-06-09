import React, { useMemo } from "react";
import mockData from "../mockdata.json";
import { useTable } from "react-table";
import { COLUMNS,GROUPED_COLUMNS } from "./Column";
import './basicTable.css';

export const BasicTable = () => {
    //usememo helps us in memoizing data of columns, so that we do not have to calculate the same data on each render
    const columns = useMemo(() => GROUPED_COLUMNS, []);
    const data = useMemo(() => mockData, []);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = useTable({ columns, data });

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
