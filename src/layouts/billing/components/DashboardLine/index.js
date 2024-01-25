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

function LineDashboard() {
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
        <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
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
  </MDBox>;
}

export default DefaultLineChart;
