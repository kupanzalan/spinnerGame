"use client";

import React from 'react';
import { useTable } from 'react-table';


const Table = ({ data }) => {

  data.sort((user1, user2) => user2.money - user1.money);
  const tableData = React.useMemo(() => data, []);
  const cols = React.useMemo(() => [
    // {
    //   Header: "ID", 
    //   accessor: "id"
    // }, 
    {
      Header: "Name", 
      accessor: "name"
    }, 
    {
      Header: "Money", 
      accessor: "money"
    }
  ], []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns: cols, data: tableData });

  return (
    <section className="mt-10 flex justify-center">
      <div className="min-w-full">
        <div className="flex justify-center overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500" {...getTableProps()}>
            <thead className="text-base text-gray-900 bg-blue-600">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th className="px-6 py-3 text-center text-xl font-extrabold" {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr className="bg-violet-300 border-b" {...row.getRowProps()}>
                    {row.cells.map((cell) => (
                      <td className="px-6 py-5 font-bold text-gray-700 text-center text-lg whitespace-nowrap" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default Table
