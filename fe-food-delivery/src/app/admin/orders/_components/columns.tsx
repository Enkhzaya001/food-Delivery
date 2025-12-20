"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export type OrderType = {
  id: string;
  number: number;
  customer: string;
  food: string;
  date: string;
  total: number;
  status: "pending" | "delivered" | "cancelled";
  address: string;
};

export const customColums = (selectHandler: any): ColumnDef<OrderType>[] => {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => () => {
            table.toggleAllPageRowsSelected(!!value);
          }}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => {
            selectHandler(row.original.id, value);
            row.toggleSelected(!!value);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "number",
      header: "№",
    },
    {
      accessorKey: "customer",
      header: "顧客",
    },
    {
      accessorKey: "food",
      header: "料理",
    },
    {
      accessorKey: "date",
      header: "日付",
    },
    {
      accessorKey: "total",
      header: "合計",
    },
    {
      accessorKey: "status",
      header: "配達状況",
    },

    {
      accessorKey: "address",
      header: "配達先住所",
    },
  ];
};

export const columns: ColumnDef<OrderType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "number",
    header: "№",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "food",
    header: "Food",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "status",
    header: "Delivery state",
  },

  {
    accessorKey: "address",
    header: "Delivery address",
  },
];
