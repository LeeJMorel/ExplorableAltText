import React from "react";

import "./index.css";

import Table from "./components/Table";
import { ColumnDef } from "@tanstack/table-core";
import { Person } from "./types";

function App() {
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
        id: "firstName",
        size: 150,
      },
      {
        accessorFn: (row) => row.lastName,
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
        id: "lastName",
        size: 150,
      },
      {
        accessorKey: "age",
        header: () => "Age",
        id: "age",
        size: 120,
      },
      {
        accessorKey: "visits",
        header: () => <span>Visits</span>,
        id: "visits",
        size: 120,
      },
      {
        accessorKey: "status",
        header: "Status",
        id: "status",
        size: 150,
      },
      {
        accessorKey: "progress",
        header: "Profile Progress",
        id: "progress",
        size: 180,
      },
    ],
    []
  );

  return <Table columns={columns} />;
}

export default App;
