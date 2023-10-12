import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { useMutation } from "react-query";
import { authenticate } from "../apiCalls";
import { useContext } from "react";
import { AppContext } from "../App";

export default function Login() {
  const { setLoggedIn } = useContext(AppContext);
  const mutation = useMutation({
    mutationFn: authenticate,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form_data = new FormData(event.currentTarget);
    const authData = {
      email: form_data.get("email"),
      password: form_data.get("password"),
    };

    try {
      const { data } = await mutation.mutateAsync(authData);
      localStorage.setItem("accessToken", data.access_token);
      localStorage.setItem("refreshToken", data.refresh_token);
      setLoggedIn(true);
    } catch {}
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
        {mutation.isError && (
          <span style={{ color: "red" }}>Invalid Username or Password</span>
        )}
        {mutation.isLoading && <CircularProgress />}
      </Box>
    </Container>
  );
}
