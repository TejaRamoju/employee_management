import { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Paper,
  Avatar,
  Stack,
  Chip,
  IconButton,
  Tooltip
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";

export default function EmployeeTable({
  employeeData,
  onEdit,
  onDelete
}) {

  const [isPrinting, setIsPrinting] = useState(false);
  if (!employeeData) return null;

  const rows = employeeData.map((item, index) => ({
    id: index + 1,
    ...item
  }));

  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      renderCell: (params) => (
        <Stack direction="row" alignItems="center" spacing={1}>
          <Avatar
            sx={{ width: 28, height: 28, fontSize: "0.75rem" }}
            src={params.row.image || undefined}
          >
            {!params.row.image &&
              params.value
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
          </Avatar>
          <span
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis"
            }}
          >
            {params.value}
          </span>
        </Stack>
      )
    },
    {
      field: "gender",
      headerName: "Gender",
      flex: 1,
      align: "center",
      headerAlign: "center"
    },
    {
      field: "dob",
      headerName: "Date of Birth",
      flex: 1
    },
    {
      field: "state",
      headerName: "State",
      flex: 1
    },
    {
      field: "active",
      headerName: "Status",
      flex: 1,
      renderCell: (params) =>
        params.value ? (
          <Chip label="Active" color="success" size="small" />
        ) : (
          <Chip label="Inactive" color="error" size="small" />
        )
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      hideOnPrint: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={0.5}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit?.(params.row)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete?.(params.row)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Print">
            <IconButton
              size="small"
              onClick={handlePrint}
            >
              <PrintIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      )
    }
  ];

  const printableColumns = isPrinting
    ? columns.filter(col => !col.hideOnPrint)
    : columns;

  const handlePrint = () => {
    setIsPrinting(true);

    setTimeout(() => {
      window.print();
      setIsPrinting(false);
    }, 300);
  };

  return (
    <Paper
      id="print-table"
      sx={{ height: 450, width: "100%" }}
    >
      <DataGrid
        rows={rows}
        columns={printableColumns}
        pageSizeOptions={[5, 10]}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 }
          }
        }}
        disableRowSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
