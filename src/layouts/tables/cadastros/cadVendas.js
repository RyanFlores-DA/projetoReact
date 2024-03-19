import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import * as React from "react";
import MediaCard from "./mediaCard";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Container from "@mui/material/Container";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import MDTypography from "components/MDTypography";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import MDButton from "components/MDButton";
import dayjs from "dayjs";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  // const dataAtual = new Date();
  // const dia = String(dataAtual.getDate()).padStart(2, "0");
  // const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  // const ano = dataAtual.getFullYear();
  // const dataFormatada = `${dia}/${mes}/${ano}`;
  // const [initialValue, setValueInitial] = React.useState(dayjs(dataFormatada));
  // const [finalValue, setValueFinal] = React.useState(dayjs(dataFormatada));

  return (
    <div>
      <Button onClick={handleOpen} variant="outlined" startIcon={<AddIcon />}>
        Inserir
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <MediaCard handleClose={handleClose}></MediaCard>
      </Modal>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
        <DemoContainer components={["DatePicker", "DatePicker"]}>
          <DatePicker
            label="Data Inicial"
            format="M/D/YYYY"
            defaultValue={dayjs(initialValue)}
            onChange={(newValue) => {
              setValueInitial(newValue);
            }}
          />
          <DatePicker
            label="Data Final"
            format="M/D/YYYY"
            defaultValue={dayjs(finalValue)}
            onChange={(newValue) => {
              setValueFinal(newValue);
            }}
          />
        </DemoContainer>
        <MDButton
          variant="outlined"
          color="info"
          size="small"
          onClick={() => atualizaParaPeriodo()}
        >
          Pesquisar
        </MDButton>
      </LocalizationProvider> */}
    </div>
  );
}
