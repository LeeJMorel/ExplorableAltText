/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column, Table } from "@tanstack/react-table";

function TableFilter<T>({
  column,
  table,
}: {
  column: Column<T, any>;
  table: Table<T>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  if (typeof firstValue === "number") {
    // Handle number range filter
    return (
      <div className="flex space-x-2">
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: [number, number]) => [
              e.target.value,
              old?.[1],
            ])
          }
          placeholder="Min"
          className="w-24 border shadow rounded"
        />
        <input
          type="number"
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(e) =>
            column.setFilterValue((old: [number, number]) => [
              old?.[0],
              e.target.value,
            ])
          }
          placeholder="Max"
          className="w-24 border shadow rounded"
        />
      </div>
    );
  } else if (typeof firstValue === "string") {
    // Handle text search filter
    return (
      <input
        type="text"
        value={(columnFilterValue ?? "") as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
      />
    );
  } else {
    // Fallback or additional cases
    return null;
  }
}

export default TableFilter;
