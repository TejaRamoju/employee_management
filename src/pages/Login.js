import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Grid,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { login } from "../utils/auth";
import loginBg from "../assets/images/background.jpg";
import Avatar from "@mui/material/Avatar";

export default function Login() {
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = e.target;

    const isValid = login(username.value, password.value);

    if (isValid) {
      navigate("/dashboard");
    } else {
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage: `url(${loginBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={4}>
            <Card
              elevation={8}
              sx={{
                width:"22vw",
                p: 3,
                borderRadius: 3,
                backdropFilter: "blur(6px)",
                backgroundColor: "rgba(255,255,255,0.92)",
              }}
            >
              <Grid container justifyContent="center" mb={1.5}>
                <Avatar />
              </Grid>

              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  fontWeight: 700,
                  mb: 3
                }}
              >
                Employee Login
              </Typography>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={3} flexDirection="column">
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      size="small"
                      required
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type="password"
                      size="small"
                      required
                    />
                  </Grid>
                </Grid>

                <Grid container mt={3} justifyContent={"center"}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    sx={{ fontWeight: 600 }}
                  >
                    Login
                  </Button>
                </Grid>
              </form>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>Login Failed</DialogTitle>
        <DialogContent>
          <Typography>
            Invalid username or password. Please try again.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
