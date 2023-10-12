import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";

export default function WaitingLoader({ text }) {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ width: 1, height: "100vh" }}
      minWidth={240}
      maxHeight={240}
    >
      <span>{text}</span>
      <CircularProgress />
    </Stack>
  );
}
