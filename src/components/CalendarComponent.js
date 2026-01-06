import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

export default function CalendarComponent({
  label = "Date",
  value,
  onChange,
  sx
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={(newValue) => {
          onChange?.(newValue ? newValue.format("YYYY-MM-DD") : "");
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            size: "small",
            sx
          }
        }}
      />
    </LocalizationProvider>
  );
}
