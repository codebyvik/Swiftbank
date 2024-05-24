import { enqueueSnackbar } from "notistack";

export default function AlertUser(message, variant) {
  enqueueSnackbar(`${message}`, { variant });
}
