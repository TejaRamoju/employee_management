import {
    Dialog, DialogTitle, DialogContent, TextField,
    Button, MenuItem, Switch, FormControlLabel, Grid
} from "@mui/material";
import { useState, useEffect } from "react";
import CalendarComponent from "./CalendarComponent";

const states = ["Telangana", "Karnataka", "Tamil Nadu", "Maharashtra"];

export default function EmployeeForm({ open, onClose, onSave, editData }) {

    const initialState = {
        id: 0,
        name: "",
        gender: "",
        dob: "",
        state: "",
        active: true,
        image: ""
    };
    const [data, setData] = useState(initialState);

    useEffect(() => {
        if (editData) setData(editData);
    }, [editData]);

    const handleImage = (e) => {
        const reader = new FileReader();
        reader.onload = () => setData({ ...data, image: reader.result });
        reader.readAsDataURL(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (!data.name || !data.gender || !data.dob || !data.state) return;
        onSave(data);
        console.log(data)
        setData(initialState);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogTitle variant="h5" sx={{ fontWeight: "550" }}>{editData ? "Edit" : "Add"} Employee</DialogTitle>
            <DialogContent>
                <TextField fullWidth size="small" label="Full Name" value={data.name}
                    onChange={e => setData({ ...data, name: e.target.value })} sx={{ mt: 2 }} />

                <TextField select fullWidth size="small" label="Gender" value={data.gender}
                    onChange={e => setData({ ...data, gender: e.target.value })} sx={{ mt: 2 }}>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                </TextField>
                <CalendarComponent
                    label="Date of Birth"
                    value={data.dob}
                    sx={{ mt: 2 }}
                    onChange={(value) =>
                        setData({ ...data, dob: value })
                    }
                />


                <TextField select fullWidth size="small" label="State" sx={{ mt: 2 }}
                    value={data.state} onChange={e => setData({ ...data, state: e.target.value })}>
                    {states.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
                </TextField>

                <Grid container mt={2}>
                    <Grid item>
                        <Button component="label">
                            Upload Image
                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                            />
                        </Button>

                    </Grid>
                    <Grid item>

                        {data.image && <img src={data.image} alt="" width={80} />}
                    </Grid>
                </Grid>




                <Grid mt={1}>


                    <FormControlLabel
                        control={<Switch checked={data.active}
                            onChange={e => setData({ ...data, active: e.target.checked })} />}
                        label="Active"
                    />
                </Grid>

                <Grid container mt={2}>
                    <Button onClick={onClose}>Cancel</Button>


                    <Button variant="contained" onClick={handleSubmit}>
                        Save
                    </Button>

                </Grid>
            </DialogContent>
        </Dialog>
    );
}
