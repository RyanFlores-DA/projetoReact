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

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

// Material Dashboard 2 React example components
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import assinaturasTableData from "layouts/tables/data/assinaturasTableData";

import axios from "axios";
import React, { useState, useEffect } from "react";

import CadVendas from "./cadastros/cadVendas";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: assinaturasColunas, rows: assinaturasLinhas } = assinaturasTableData();
  const [resumo, setResumo] = useState([]);
  const [loading, setLoading] = useState(true);
  const { columns: pColumns, rows: pRows } = projectsTableData();
  let conversorMoeda = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  const config = {
    headers: {
      authorization: sessionStorage.getItem("token"),
    },
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/api/resumo/cartoes`, config)
      .then((response) => {
        setResumo(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Erro ao buscar dados dos resumos:", error));
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {!loading &&
                resumo.map((resumo) => (
                  <ComplexStatisticsCard
                    key={resumo.valoratualfinancas}
                    color="dark"
                    icon="weekend"
                    title="Compras"
                    count={resumo.valoratualfinancas}
                    percentage={{
                      color: "success",
                      amount: ``,
                      label: `Valor mês passado R$ ${resumo.diferencafinancas}`,
                    }}
                  />
                ))}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {!loading &&
                resumo.map((resumo) => (
                  <ComplexStatisticsCard
                    key={resumo.porcentagemdiferencacaixa}
                    icon="leaderboard"
                    title="Caixa"
                    count={resumo.valoratualcaixa}
                    // percentage={{
                    //   color: "error",
                    //   amount: `${resumo.porcentagemdiferencacaixa}%`,
                    //   label: "que o mês passado",
                    // }}
                  />
                ))}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {!loading &&
                resumo.map((resumo) => (
                  <ComplexStatisticsCard
                    key={resumo.valoratualassinaturas}
                    color="success"
                    icon="store"
                    title="Assinaturas"
                    count={resumo.valoratualassinaturas}
                  />
                ))}
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              {!loading &&
                resumo.map((resumo) => (
                  <ComplexStatisticsCard
                    key={resumo.valoratualdespesas}
                    color="primary"
                    icon="person_add"
                    title="Contas"
                    count={resumo.valoratualdespesas}
                  />
                ))}
            </MDBox>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <MDTypography variant="h6" color="white">
                      Compras
                    </MDTypography>
                  </Grid>
                  <Grid item>
                    <CadVendas></CadVendas>
                  </Grid>
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <MDTypography variant="h6" color="white">
                      Metas
                    </MDTypography>
                  </Grid>
                  {/* <Grid item>
                    <CadVendas></CadVendas>
                  </Grid> */}
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="dark"
                borderRadius="lg"
                coloredShadow="dark"
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item>
                    <MDTypography variant="h6" color="white">
                      Assinaturas
                    </MDTypography>
                  </Grid>
                  {/* <Grid item>
                    <CadVendas></CadVendas>
                  </Grid> */}
                </Grid>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: assinaturasColunas, rows: assinaturasLinhas }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
