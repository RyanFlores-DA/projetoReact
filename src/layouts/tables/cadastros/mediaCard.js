import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";

import Select from "@mui/material/Select";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import Compras from "./compras.jpg";

export default function MediaCard() {
  const [tipo, setTipo] = React.useState("");
  const [natureza, setNatureza] = React.useState("");

  const handleChangeTipo = (event) => {
    setTipo(event.target.value);
  };
  const handleChangeNatureza = (event) => {
    setNatureza(event.target.value);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 1,
  };
  const selectStyle = {
    height: 45,
    width: 160,
    bgcolor: "background.paper",
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  const [valor, setValor] = useState("");

  const handleChange = (event) => {
    setValor(event.target.value);
  };

  return (
    <Card sx={style}>
      <CardMedia sx={{ height: 140 }} image={Compras} title="Compras" />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            {/* <Item>xs=8</Item> */}
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "30ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField id="outlined-basic" label="Título" variant="outlined" />
            </Box>
          </Grid>
          <Grid item xs={4}>
            {/* <Item>xs=4</Item> */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Tipo</InputLabel>
              <Select
                sx={selectStyle}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={tipo}
                label="Tipo"
                onChange={handleChangeTipo}
              >
                <MenuItem value={10}>Casa</MenuItem>
                <MenuItem value={20}>Assinatura</MenuItem>
                <MenuItem value={30}>Lazer</MenuItem>
                <MenuItem value={40}>Emergência</MenuItem>
                <MenuItem value={50}>Saúde</MenuItem>
                <MenuItem value={60}>Viagem</MenuItem>
                <MenuItem value={70}>Investimentos</MenuItem>
                <MenuItem value={80}>Trabalho</MenuItem>
                <MenuItem value={90}>Escola</MenuItem>
                <MenuItem value={330}>Roupas</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            {/* <Item>xs=4</Item> */}
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-helper-label">Natureza</InputLabel>
              <Select
                sx={selectStyle}
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={natureza}
                label="Natureza"
                onChange={handleChangeNatureza}
              >
                <MenuItem value={10}>Débito</MenuItem>
                <MenuItem value={20}>Crédito</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={4}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel htmlFor="outlined-adornment-amount">Valor</InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                label="Amount"
              />
            </FormControl>
          </Grid> */}
          <Grid item xs={4}>
            <FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DatePicker", "TimePicker", "DateTimePicker", "DateRangePicker"]}
                >
                  <DatePicker label="Data Inicial" format="D/M/YYYY" />
                </DemoContainer>
              </LocalizationProvider>
            </FormControl>
          </Grid>
        </Grid>
        {/* <Grid container spacing={2}>
          <Grid item xs={8}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DatePicker", "TimePicker", "DateTimePicker", "DateRangePicker"]}
              >
                <DatePicker />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            aqui
          </Grid>
        </Grid> */}
      </CardContent>
      <CardActions>
        <Button size="small">Inserir</Button>
        <Button size="small">Cancelar</Button>
      </CardActions>
    </Card>
  );
}
