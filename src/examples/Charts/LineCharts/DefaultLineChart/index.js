/**
=========================================================
* Material Dashboard 2  React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo } from "react";

// porp-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-chartjs-2 components
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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Iconn from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// DefaultLineChart configurations
import configs from "examples/Charts/LineCharts/DefaultLineChart/configs";

// Material Dashboard 2 React base styles
import colors from "assets/theme/base/colors";

import dashboard from "assets/images/painel-de-controle.png";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React, { useState, useEffect } from "react";
import Datepicker from "react-tailwindcss-datepicker";

import MDInput from "components/MDInput";

import dayjs from "dayjs";
import axios from "axios";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import env from "dotenv-config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function DefaultLineChart({ icon, title, description, height, chart, backgroundImage }) {
  console.log("Recarrega dashboard");
  const [menu, setMenu] = useState(null);
  const [customizing, setCustomizing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState();
  const [initialValue, setValueInitial] = React.useState(dayjs("2022-04-17"));
  const [finalValue, setValueFinal] = React.useState(dayjs("2022-04-17"));

  const config = {
    headers: {
      authorization: sessionStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios
      .get(`${process.env.URL}/api/dashboard/vendas?mes=6`, config)
      .then((response) => {
        console.log("Status da resposta".response.status);
        const resultados = response.data.dataSets || [];
        const labels = resultados.map((resultado) => resultado.label);
        const totalValores = resultados.map((resultado) => parseFloat(resultado.total_valor));

        setDados({
          labels: labels,
          totalValores: totalValores,
        });
        setLoading(false);
      })
      .catch((error) => {
        if (!error && error.response.status == 403) {
          sessionStorage.setItem("redirect", false);
          window.location.href = "/authentication/sign-in";
        }
        setLoading(false);
      });
  }, []);

  const handleEscolha = (opcao) => {
    axios
      .get(`${process.env.URL}/api/dashboard/vendas?mes=${opcao}`, config)
      .then((response) => {
        const resultados = response.data.dataSets || [];
        const labels = resultados.map((resultado) => resultado.label);
        const totalValores = resultados.map((resultado) => parseFloat(resultado.total_valor));

        setDados({
          labels: labels,
          totalValores: totalValores,
        });
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar datasets:", error);
        setLoading(false);
      });
    closeMenu(); // Feche o menu após a escolha ser feita
  };

  const toggleCustomizing = () => {
    // handleEscolha("P");
    setCustomizing(!customizing);
    closeMenu(); // Feche o menu ao personalizar
  };

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => {
    setMenu(null);
  };

  let chartData = {
    labels: [],
    datasets: [
      {
        label: "Dados Indisponíveis",
        data: [0],
        color: "dark",
      },
    ],
  };

  if (!loading && dados && dados.labels && dados.totalValores) {
    chartData = {
      labels: dados.labels,
      datasets: [
        {
          label: "Geral, gastos mensais R$",
          data: dados.totalValores,
          color: "dark",
        },
      ],
    };
  } else if (dados && dados.labels && dados.totalValores) {
    chartData = {
      labels: dados.labels,
      datasets: [
        {
          label: "Geral, gastos mensais R$",
          data: dados.totalValores,
          color: "dark",
        },
      ],
    };
  }

  const chartDatasets = chartData.datasets.map((dataset) => ({
    ...dataset,
    tension: 0,
    pointRadius: 3,
    borderWidth: 4,
    backgroundColor: "transparent",
    fill: true,
    pointBackgroundColor: colors[dataset.color]
      ? colors[dataset.color || "dark"].main
      : colors.dark.main,
    borderColor: colors[dataset.color] ? colors[dataset.color || "dark"].main : colors.dark.main,
    maxBarThickness: 6,
  }));

  const labels = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho"];
  const { data, options } = configs(chartData.labels || [], chartDatasets);
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
      onClose={closeMenu}
    >
      <MenuItem onClick={() => handleEscolha(3)}>3 Meses</MenuItem>
      <MenuItem onClick={() => handleEscolha(6)}>6 Meses</MenuItem>
      <MenuItem onClick={() => handleEscolha(3)}>Ano atual</MenuItem>
      <MenuItem onClick={toggleCustomizing}>Personalizar</MenuItem>
    </Menu>
  );

  const renderChart = useMemo(
    () => (
      <MDBox py={2} pr={2} pl={icon.component ? 1 : 2}>
        <MDBox display="flex" justifyContent="space-between" alignItems="center" p={1}>
          <MDBox>
            {(title || description) && (
              <MDBox display="flex" px={description ? 1 : 0} pt={description ? 1 : 0}>
                {icon.component && (
                  <MDBox
                    width="4rem"
                    height="4rem"
                    bgColor={icon.color || "dark"}
                    variant="gradient"
                    coloredShadow={icon.color || "dark"}
                    borderRadius="xl"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    color="white"
                    mt={-5}
                    mr={2}
                  >
                    <Icon fontSize="medium">{icon.component}</Icon>
                  </MDBox>
                )}
                <MDBox mt={icon.component ? -2 : 0}>
                  {title && <MDTypography variant="h6">{title}</MDTypography>}
                  <MDBox mb={2}>
                    <MDTypography component="div" variant="button" color="text">
                      {description}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>
            )}
          </MDBox>
          {customizing && (
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt">
              <DemoContainer components={["DatePicker", "DatePicker"]}>
                <DatePicker
                  label="Data Inicial"
                  format="D/M/YYYY"
                  defaultValue={dayjs("2024-01-19")}
                  onChange={(newValue) => setValueInitial(newValue)}
                />
                <DatePicker
                  label="Data Final"
                  format="D/M/YYYY"
                  defaultValue={dayjs("2024-01-19")}
                  onChange={(newValue) => setValueFinal(newValue)}
                />
              </DemoContainer>
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
        <MDBox height={height}>
          {backgroundImage && (
            <img
              src={dashboard}
              alt="Background"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover", // Ou ajuste conforme necessário
              }}
            />
          )}
          <Line data={data} options={options} redraw />
        </MDBox>
      </MDBox>
    ),
    [
      chartData,
      height,
      backgroundImage,
      customizing,
      icon.component,
      icon.color,
      title,
      description,
    ]
  );

  return title || description ? <Card>{renderChart}</Card> : renderChart;
}

DefaultLineChart.defaultProps = {
  icon: { color: "info", component: "" },
  title: "",
  description: "",
  height: "19.125rem",
};

DefaultLineChart.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
    ]),
    component: PropTypes.node,
  }),
  title: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  chart: PropTypes.objectOf(PropTypes.array),
  backgroundImage: PropTypes.string,
};

export default DefaultLineChart;
