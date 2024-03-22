import { ColumnDef, TableMeta } from "@tanstack/table-core";

export interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];
  defaultColumn?: Partial<ColumnDef<T>>;
  autoResetPageIndex?: boolean;
  meta?: TableMeta<T>;
  debugTable?: boolean;
}

export type CSVRow = {
  [key: string]: string | undefined;
};

export interface ICard {
  id: number;
  title: string;
  description: string;
}
