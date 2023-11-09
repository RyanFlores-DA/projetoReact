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

import "../../personalizar/cursor.css";

function Billing() {
  const [cards, setCards] = useState([]);
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    };
    console.log(sessionStorage.getItem("token"));
    axios
      .get("http://localhost:3003/card", config)
      .then((response) => setCards(response.data))
      .catch((error) => console.error("Erro ao buscar dados das faturas:", error));
    axios
      .get("http://localhost:3003/metas", config)
      .then((response) => setMetas(response.data))
      .catch((error) => console.error("Erro ao buscar dados das metas:", error));
  }, []);
  return (
    <DashboardLayout>
      <Header>
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
      </Header>
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
                      expires={card.data_exp}
                    />
                  ))}
                </Grid>
                <Grid item xs={12} md={6} xl={3}>
                  <DefaultInfoCard
                    icon="account_balance"
                    title="salary"
                    description="Belong Interactive"
                    value="+$2000"
                  />
                </Grid>
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} lg={4}>
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
