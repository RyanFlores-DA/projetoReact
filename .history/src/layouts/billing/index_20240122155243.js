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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

import IconButton from "@mui/material/IconButton";

// Billing page components
import PaymentMethod from "layouts/billing/components/PaymentMethod";
import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import axios from "axios";
import React, { useState, useEffect } from "react";
import token from "../authentication/access/auth";

import Header from "layouts/profile/components/Header";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import budge from "assets/images/budget.png";
import dashboard from "assets/images/painel-de-controle.png";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";

function Billing() {
  const [cards, setCards] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const [caixa, setCaixa] = useState([]);
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [metas, setMetas] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    };
    console.log(!sessionStorage.getItem("redirect"));
    console.log(sessionStorage.getItem("redirect"));
    if (sessionStorage.getItem("redirect") === null) {
    }

    if (!sessionStorage.getItem("token")) {
      sessionStorage.setItem("redirect", true);
      if (
        sessionStorage.getItem("redirect") == "true" ||
        sessionStorage.getItem("redirect") === null
      ) {
        sessionStorage.setItem("redirect", false);
        window.location.href = "/authentication/sign-in";
      }
    } else {
    }
    axios
      .get("http://localhost:3003/api/cards?primario=S", config)
      .then((response) => setCards(response.data))
      .catch((error) => console.error("Erro ao buscar cartoes:", error));
    axios
      .get("http://localhost:3003/api/despesas", config)
      .then((response) => setDespesas(response.data))
      .catch((error) => console.error("Erro ao buscar dados das despesas:", error));
    axios
      .get("http://localhost:3003/api/totalCaixa", config)
      .then((response) => setCaixa(response.data))
      .catch((error) => console.error("Erro ao buscar dados do caixa:", error));
    axios
      .get(`http://localhost:3003/api/dashboard/vendas?mes=3`, config)
      .then((response) => setDados(response.data))
      .catch((error) => console.error("Erro ao buscar datasets:", error));
    // axios
    //   .get("http://localhost:3003/api/metas", config)
    //   .then((response) => setMetas(response.data))
    //   .catch((error) => console.error("Erro ao buscar dados das metas:", error));
  }, []);
  return (
    <DashboardLayout>
      {/* <Header>
        <MDBox p={2}>
          <Grid container spacing={6}>
            {metas.map((metas) => (
              <Grid key={metas.meta} item xs={12} md={6} xl={3}>
                <DefaultProjectCard
                  image={homeDecor1}
                  label={metas.tipo}
                  title={metas.titulo}
                  description={metas.descricao}
                  action={{
                    type: "internal",
                    route: "/pages/profile/profile-overview",
                    color: "info",
                    label: "Ver Meta",
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Header> */}
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  {cards.map((card) => (
                    <MasterCard
                      key={card.numero}
                      number={card.numero}
                      holder={card.nome}
                      expires={card.data}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  {despesas.map((despesas) => (
                    <DefaultInfoCard
                      key={despesas.valor_despesas}
                      color="dark"
                      icon="account_balance"
                      title="Despesas Fixas"
                      description="Despesas rotineiras fixas"
                      value={`R$ ${despesas.valor_despesas}`}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  {caixa.map((caixa) => (
                    <DefaultInfoCard
                      key={caixa.valor}
                      color="dark"
                      icon="money_ammount"
                      title="Entradas Acumuladas"
                      description="Entradas fixas acumuladas"
                      value={`R$ ${caixa.valor}`}
                    />
                  ))}
                </Grid>
                <Grid item xs={12}>
                  {dados && dados.label && (
                    <>
                      {console.log("Dados carregados:", dados)}
                      <DefaultLineChart
                        icon={{ color: "dark", component: "icon_name" }}
                        title="Resumo de gastos"
                        description="Mais detalhes na Aba Dashboard"
                        height="300px"
                        chart={{
                          labels: dados.label,
                          datasets: [
                            {
                              label: "Geral, gastos mensais",
                              data: [65, 59, 80],
                              color: "dark",
                            },
                          ],
                        }}
                      />
                    </>
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={10} lg={4}>
              <Invoices />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={10} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
