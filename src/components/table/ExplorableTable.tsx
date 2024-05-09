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

interface IExplorableTableProps {
  csvData: any[];
  typeDefinition: string;
}

function useSkipper() {
  const shouldSkipRef = useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
}

function ExplorableTable({ csvData, typeDefinition }: IExplorableTableProps) {
  const [data, setData] = useState<any[]>([]);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const rerender = useReducer(() => ({}), {})[1];
  console.log("Data:", data);

  const columns = useMemo(() => {
    if (!typeDefinition || !csvData || csvData.length === 0) return []; // Handle empty or missing type definition or CSV data

    const columnKeys = csvData[0];

    return columnKeys.map((header: string) => ({
      accessorKey: header,
      header: () => header,
    }));
  }, [csvData, typeDefinition]);

  // Give our default column cell renderer editing superpowers!
  const defaultColumn: Partial<ColumnDef<any>> = {
    cell: ({ getValue, row: { index }, column: { id } }) => {
      return (
        <EditableInputCell
          getValue={getValue}
          columnId={id}
          rowIndex={index}
          setData={setData}
        />
      );
    },
  };

  useEffect(() => {
    if (csvData && csvData.length > 1) {
      // Exclude the header row
      const headerRow = csvData[0];
      const rows = csvData.slice(1);

      // Transform each row into an object with column headers as keys
      const transformedData = rows.map((row) => {
        const rowData: any = {};
        headerRow.forEach((header: string | number, index: string | number) => {
          rowData[header] = row[index];
        });
        return rowData;
      });

      setData(transformedData); // Set the transformed data as the state
    } else {
      setData([]); // If no data or only header row, set data state to empty array
    }
  }, [csvData]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex: number, columnId: string, value: unknown) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        setData((old: any[]) =>
          old.map((row: any, index: number) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: true,
  });

  return (
    <div className="p-2">
      <div className="h-2" />
      <table className={styles.table}>
        <thead className={styles.header}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    className={styles.cell}
                    key={header.id}
                    colSpan={header.colSpan}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getCanFilter() ? (
                          <div>
                            <TableFilter column={header.column} table={table} />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td className={styles.cell} key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
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
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.csvButtonsDiv}>
          <div>
            <button onClick={() => rerender()}>Force Rerender</button>
          </div>
          <div>
            <JsonToCSV jsonData={data} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExplorableTable;
