/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useMemo } from "react";
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import configs from "examples/Charts/LineCharts/DefaultLineChart/configs";
// Material Dashboard 2 React examples
import DataTable from "examples/Tables/DataTable";
import colors from "assets/theme/base/colors";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import dayjs from "dayjs";
import axios from "axios";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useEffect } from "react";
// Data
import data from "./data/index";
import optionsChart from "./options/options";

import typography from "assets/theme/base/typography";

function LineChart() {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    scales: {
      y: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: false,
          borderDash: [5, 5],
          color: "#c1c4ce5c",
        },
        ticks: {
          display: true,
          padding: 10,
          color: "#b2b9bf",
          font: {
            size: 11,
            family: typography.fontFamily,
            style: "normal",
            lineHeight: 2,
          },
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: true,
          drawOnChartArea: true,
          drawTicks: true,
          borderDash: [5, 5],
          color: "#c1c4ce5c",
        },
        ticks: {
          display: true,
          color: "#b2b9bf",
          padding: 20,
          font: {
            size: 11,
            family: typography.fontFamily,
            style: "normal",
            lineHeight: 2,
          },
        },
      },
    },
  };
  const dataAtual = new Date();
  const dia = String(dataAtual.getDate()).padStart(2, "0");
  const mes = String(dataAtual.getMonth() + 1).padStart(2, "0");
  const ano = dataAtual.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [customizing, setCustomizing] = useState(false);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [initialValue, setValueInitial] = React.useState(dayjs(dataFormatada));
  const [finalValue, setValueFinal] = React.useState(dayjs(dataFormatada));

  const config = {
    headers: {
      authorization: sessionStorage.getItem("token"),
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `http://api.sof-town.tech/api/dashboard/vendas?mes=`;
        const response = await axios.get(`${url}${selectedMonth}`, config);
        setChartData(response.data.dataSets);
      } catch (error) {
        if (error) {
          if (error.response.status == 403) {
            sessionStorage.setItem("redirect", false);
            window.location.href = "/authentication/sign-in";
          }
        }
      }
    };

    fetchData();
  }, [selectedMonth]);

  const atualizaParaPeriodo = async () => {
    try {
      const url = `http://api.sof-town.tech/api/dashboard/vendas?mes=P&data_inicio=${initialValue.format(
        "YYYY-MM-DD"
      )}&data_final=${finalValue.format("YYYY-MM-DD")}`;
      const response = await axios.get(`${url}`, config);
      setChartData(response.data.dataSets);
    } catch (error) {
      if (error) {
        if (error.response.status == 403) {
          sessionStorage.setItem("redirect", false);
          window.location.href = "/authentication/sign-in";
        }
      }
    }
  };
  const handleEscolha = (meses) => {
    setSelectedMonth(meses);
    setCustomizing(false);
    setMenu(null);
  };

  const toggleCustomizing = () => {
    setCustomizing(!customizing);
    setMenu(null);
  };

  const dataa = {
    labels: chartData ? chartData.map((item) => item.label) : [],
    datasets: chartData
      ? [
          {
            label: "Geral, gastos mensais R$",
            data: chartData.map((item) => item.total_valor),
            tension: 0,
            pointRadius: 3,
            borderWidth: 2,
            backgroundColor: "transparent",
            fill: true,
            pointBackgroundColor: "dark",
            borderColor: "dark",
            maxBarThickness: 6,
          },
        ]
      : [],
  };

  // const dataa = {
  //   labels: ["Janeiro", "Fevereiro", "Março"],
  //   datasets: [
  //     {
  //       label: "Geral, gastos mensais R$",
  //       data: [100, 200, 150],
  //       tension: 0,
  //       pointRadius: 3,
  //       borderWidth: 2,
  //       backgroundColor: "transparent",
  //       fill: true,
  //       pointBackgroundColor: "dark",
  //       borderColor: "dark",
  //       maxBarThickness: 6,
  //     },
  //   ],
  // };

  const renderChart = chartData ? (
    <MDBox>
      <MDBox height={"300px"}>
        <Line data={dataa} options={options} />
      </MDBox>
    </MDBox>
  ) : (
    <MDBox>
      <MDBox height={"300px"}>Carregando</MDBox>
    </MDBox>
  );
  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={() => setMenu(null)}
    >
      <MenuItem onClick={() => handleEscolha(3)}>3 Meses</MenuItem>
      <MenuItem onClick={() => handleEscolha(6)}>6 Meses</MenuItem>
      <MenuItem onClick={toggleCustomizing}>Personalizar</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox py={2} pr={2}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <MDBox>
            <MDTypography variant="h6" gutterBottom>
              Resumo dos Gastos
            </MDTypography>
            <MDBox display="flex" alignItems="center" lineHeight={0}>
              <Icon
                sx={{
                  fontWeight: "bold",
                  color: ({ palette: { info } }) => info.main,
                  mt: -0.5,
                }}
              >
                done
              </Icon>
              <MDTypography variant="button" fontWeight="regular" color="text">
                Personalize seu gráfico
              </MDTypography>
            </MDBox>
          </MDBox>
          {customizing && (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Data Inicial"
                  format="D/M/YYYY"
                  defaultValue={dayjs(initialValue)}
                  onChange={(newValue) => {
                    setValueInitial(newValue);
                  }}
                />
                <DatePicker
                  label="Data Final"
                  format="D/M/YYYY"
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
            </LocalizationProvider>
          )}
          <MDBox color="text" px={2}>
            <Icon
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              fontSize="small"
              onClick={openMenu}
            >
              more_vert
            </Icon>
          </MDBox>
          {renderMenu}
        </MDBox>
        {renderChart}
        {/* <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        /> */}
      </MDBox>
    </Card>
  );
}

export default LineChart;
