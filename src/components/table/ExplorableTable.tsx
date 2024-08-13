/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";
import EditableInputCell from "./EditableInputCell";
import TableFilter from "./TableFilter";
import JsonToCSV from "../fileUpload/JsonToCSV";

import styles from "./Table.module.scss";
import useStore from "../../store/useStore";

interface IExplorableTableProps {
  csvData: any[];
  typeDefinition: string;
}

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  }, []);

  return [shouldSkip, skip] as const;
}

const ExplorableTable: React.FC<IExplorableTableProps> = ({
  csvData,
  typeDefinition,
}) => {
  const [data, setData] = useState<any[]>([]);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const rerender = useReducer(() => ({}), {})[1];
  const { setItems } = useStore(); // Extract setItems from the store

  const columns = useMemo(() => {
    if (!typeDefinition || !csvData.length) return [];

    const headers = csvData[0];

    return headers.map((header: string) => ({
      accessorKey: header,
      header: () => header,
    }));
  }, [csvData, typeDefinition]);

  const defaultColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id } }) => (
      <EditableInputCell
        getValue={getValue}
        columnId={id}
        rowIndex={index}
        setData={setData}
      />
    ),
  };

  useEffect(() => {
    if (csvData.length > 1) {
      const headers = csvData[0];
      const rows = csvData.slice(1);

      const transformedData = rows.map((row) =>
        headers.reduce((acc: any, header: string, index: number) => {
          acc[header] = row[index];
          return acc;
        }, {})
      );

      setData(transformedData);

      // Generate draggable items and set them in the store
      const draggableItems = headers.map(
        (header: any, colIndex: string | number) => ({
          id: `header-${colIndex}`,
          title: header,
          children: rows.map((row, rowIndex) => ({
            id: `row-${colIndex}-${rowIndex}`,
            title: row[colIndex],
          })),
        })
      );

      setItems(draggableItems);
    } else {
      setData([]);
    }
  }, [csvData, setItems]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        skipAutoResetPageIndex();
        setData((old) =>
          old.map((row, index) =>
            index === rowIndex ? { ...row, [columnId]: value } : row
          )
        );
      },
    },
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead className={styles.header}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className={styles.cell}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {!header.isPlaceholder && (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() && (
                          <TableFilter column={header.column} table={table} />
                        )}
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className={styles.cell} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.tableNav}>
        <div className={styles.buttonDiv}>
          <button
            className={styles.button}
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            className={styles.button}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <span className="flex items-center gap-1">
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </span>
          <button
            className={styles.button}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            className={styles.button}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>
        <div className={styles.buttonDiv}>
          <div className={styles.tableInfo}>
            {table.getRowModel().rows.length} Rows
          </div>
          <span className="flex items-center gap-1">
            Go to page:
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.csvButtonsDiv}>
          <button onClick={() => rerender()}>Force Rerender</button>
          <JsonToCSV jsonData={data} />
        </div>
      </div>
    </div>
  );
};

export default ExplorableTable;
