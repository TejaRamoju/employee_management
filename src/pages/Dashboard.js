import {
    Button,
    Typography,
    Box,
    Card,
    Grid
} from "@mui/material";
import { useState, useEffect } from "react";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeTable from "../components/EmployeeTable";
import { getEmployees, saveEmployees } from "../services/employeeService";
import Header from "../components/Header";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ConfirmDeleteDialog from "../components/ConfirmDeleteDialog";

export default function Dashboard() {
    const [employees, setEmployees] = useState([]);
    const [open, setOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteRow, setDeleteRow] = useState(null);

    useEffect(() => {
        setEmployees(getEmployees());
    }, []);

    const handleDeleteClick = (row) => {
        console.log(row,"row")
        setDeleteRow(row);
        setDeleteOpen(true);
    };

    const handleDeleteConfirm = () => {
        const updated = employees.filter(
            (emp) => emp.id !== deleteRow.id
        );
        console.log(updated,"updated")
        localStorage.setItem("employees", JSON.stringify(updated));
        setEmployees(updated);
        saveEmployees(updated);

        setDeleteOpen(false);
        setDeleteRow(null);
    };

    const handleDeleteCancel = () => {
        setDeleteOpen(false);
        setDeleteRow(null);
    };

    const save = (emp) => {
        console.log(emp,"emp")
        let updated;
        if (editData) {
            updated = employees.map((e) =>
                e.id === editData.id ? { ...emp, id: e.id } : e
            );
        } else {
            const newEmp = {
                ...emp,
                id: employees.length + 1
            };
            updated = [...employees, newEmp];
        }
        setEmployees(updated);
        saveEmployees(updated);
        setEditData(null);
    };

    return (
        <>
            <Header />

            <Box px={3} py={2}>
                <Grid container alignItems="center" justifyContent="space-between" mb={2}>
                    <Grid item>
                        <Typography variant="h6">Employee Dashboard</Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                            Total Employees: {employees.length}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            sx={{ background: "#172B4D", textTransform: "none" }}
                            variant="contained"
                            startIcon={<AddCircleOutlineIcon />}
                            onClick={() => setOpen(true)}
                        >
                            Add Employee
                        </Button>
                    </Grid>
                </Grid>

                <EmployeeTable
                    employeeData={employees}
                    onEdit={(row) => {
                        setEditData(row);
                        setOpen(true);
                    }}
                    onDelete={handleDeleteClick}
                />

                <ConfirmDeleteDialog
                    open={deleteOpen}
                    title="Delete Employee"
                    message={`Are you sure you want to delete ${deleteRow?.name}?`}
                    onCancel={handleDeleteCancel}
                    onConfirm={handleDeleteConfirm}
                />

                <Card sx={{ mt: 2 }}>
                    <EmployeeForm
                        open={open}
                        onClose={() => setOpen(false)}
                        onSave={save}
                        editData={editData}
                    />
                </Card>
            </Box>
        </>
    );
}
