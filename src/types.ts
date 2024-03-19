import { ColumnDef, TableMeta } from "@tanstack/table-core";

export interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  defaultColumn?: Partial<ColumnDef<T>>;
  autoResetPageIndex?: boolean;
  meta?: TableMeta<T>;
  debugTable?: boolean;
}

export type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: "relationship" | "complicated" | "single";
  subRows?: Person[];
};
