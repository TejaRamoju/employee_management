import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{background:"#172B4D"}}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
          Employee Management
        </Typography>

        <Button color="inherit" onClick={handleLogout}>
          <LogoutIcon/>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
