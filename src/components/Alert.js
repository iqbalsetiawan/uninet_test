// components/Alert.js
import MuiAlert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Snackbar from "@mui/material/Snackbar";

export default function Alert(props) {
  return (
    <Snackbar
      open={props.openSnackbar}
      autoHideDuration={6000}
      onClose={() => props.setOpenSnackbar(false)}
    >
      <MuiAlert
        onClose={() => props.setOpenSnackbar(false)}
        severity={props.severity || "error"}
      >
        <AlertTitle>{props.title || "Notification"}</AlertTitle>
        {props.snackbarMessage}
      </MuiAlert>
    </Snackbar>
  );
}
