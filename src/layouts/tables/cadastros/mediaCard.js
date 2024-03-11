import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
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

import Compras from "../../../assets/images/compras.jpg";

export default function MediaCard() {
  const [tipo, setTipo] = React.useState("");
  const [titulo, setTitulo] = React.useState("");
  const [natureza, setNatureza] = React.useState("");
  const [banco, setBanco] = React.useState("");
  const [parcelas, setParcelas] = React.useState("");
  let [data, setData] = React.useState("");
  const [meuBanco, setMeuBanco] = React.useState("");
  const [customizing, setCustomizing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [botaoHabilitado, setBotaoHabilitado] = useState(false);

  const handleClick = () => {
    setBotaoHabilitado(true);
  };

  const handleChangeTipo = (event) => {
    setTipo(event.target.value);
  };
  const handleChangeNatureza = (event) => {
    console.log("Chamou");
    if (event.target.value) {
      event.target.value == 2 ? setCustomizing(true) : setCustomizing(false);
    }
    setNatureza(event.target.value);
  };
  const handleChangeBanco = (event) => {
    setBanco(event.target.value);
  };
  const handleChangeParcelas = (event) => {
    setParcelas(event.target.value);
  };
  const config = {
    headers: {
      authorization: sessionStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/meusbancos`, config)
      .then((response) => {
        setMeuBanco(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar dados meus bancos:", error));
  }, []);

  const handlechangeTitle = (event) => {
    if ((event.current = "")) {
      setBotaoHabilitado(false);
    } else {
      console.log(event.target.value);
      setBotaoHabilitado(true);
    }
    setTitulo(event.target.value);
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

  const handleEnviar = () => {
    console.log(titulo);
    console.log(natureza);
    console.log(banco);
    console.log(parcelas);
    console.log((data = false ? data.format("YYYY-MM-DD") : "2024-01-01"));
    console.log(tipo);
  };
  return (
    <Card sx={style}>
      <CardMedia component="img" height="140" image={Compras} alt="Compras" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          O que eu comprei?
        </Typography>
        <TextField
          fullWidth
          id="outlined-basic"
          label="Título"
          variant="outlined"
          onChange={(event) => handlechangeTitle(event)}
          sx={{ marginBottom: 2 }}
        />
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="demo-simple-select-label" sx={{ marginBottom: "-2px" }}>
            Tipo
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tipo}
            label="Tipo"
            sx={{ paddingY: "12px" }}
            onChange={handleChangeTipo}
          >
            <MenuItem value="">Selecione</MenuItem>
            <MenuItem value={1}>Casa</MenuItem>
            <MenuItem value={2}>Assinatura</MenuItem>
            <MenuItem value={3}>Lazer</MenuItem>
            <MenuItem value={4}>Emergência</MenuItem>
            <MenuItem value={5}>Saúde</MenuItem>
            <MenuItem value={6}>Viagem</MenuItem>
            <MenuItem value={7}>Investimentos</MenuItem>
            <MenuItem value={8}>Trabalho</MenuItem>
            <MenuItem value={9}>Escola</MenuItem>
            <MenuItem value={10}>Roupas</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <DatePicker
              label="Data Compra"
              format="D/M/YYYY"
              onChange={(novaData) => {
                setData(novaData);
              }}
            />
          </FormControl>
        </LocalizationProvider>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="demo-simple-select-label" sx={{ marginBottom: "8px" }}>
            Natureza
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={natureza}
            sx={{ paddingY: "12px" }}
            label="Natureza"
            onChange={handleChangeNatureza}
          >
            <MenuItem value={99}>Selecione</MenuItem>
            <MenuItem value={1}>Débito</MenuItem>
            <MenuItem value={2}>Crédito</MenuItem>
            <MenuItem value={3}>Boleto</MenuItem>
            <MenuItem value={4}>Pix</MenuItem>
          </Select>
        </FormControl>
        {!loading && (
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="demo-simple-select-label">Banco</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={banco}
              sx={{ paddingY: "12px" }}
              label="Banco"
              onChange={handleChangeBanco}
            >
              <MenuItem value="">Selecione</MenuItem>
              {meuBanco.map((key) => (
                <MenuItem value={key.id} key={key.id}>
                  {key.descricao}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {customizing && (
          <FormControl fullWidth sx={{ marginBottom: 2, type: "hidden" }}>
            <InputLabel id="demo-simple-select-label">Parcelas</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={parcelas}
              sx={{ paddingY: "12px" }}
              label="Parcelas"
              onChange={handleChangeParcelas}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={6}>6</MenuItem>
              <MenuItem value={7}>7</MenuItem>
              <MenuItem value={8}>8</MenuItem>
              <MenuItem value={9}>9</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={11}>11</MenuItem>
              <MenuItem value={12}>12</MenuItem>
              <MenuItem value={13}>13</MenuItem>
              <MenuItem value={14}>14</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={16}>16</MenuItem>
              <MenuItem value={17}>17</MenuItem>
              <MenuItem value={18}>18</MenuItem>
              <MenuItem value={19}>19</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={21}>21</MenuItem>
              <MenuItem value={22}>22</MenuItem>
              <MenuItem value={23}>23</MenuItem>
              <MenuItem value={24}>24</MenuItem>
            </Select>
          </FormControl>
        )}
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleEnviar} disabled={!botaoHabilitado}>
          Inserir
        </Button>
        <Button size="small" onClick={handleClick}>
          Cancelar
        </Button>
      </CardActions>
    </Card>
  );
}
