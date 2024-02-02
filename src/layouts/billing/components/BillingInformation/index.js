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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import axios from "axios";
import React, { useState, useEffect } from "react";
import token from "../../../authentication/access/auth";

function BillingInformation() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true); // Adiciona um estado de carregamento

  useEffect(() => {
    const config = {
      headers: {
        authorization: sessionStorage.getItem("token"),
      },
    };

    axios
      .get("http://api.sof-town.tech/api/vendas", config)
      .then((response) => {
        setInvoices(response.data);
        setLoading(false); // Marca que os dados foram carregados com sucesso
      })
      .catch((error) => console.error("Erro ao buscar dados das faturas:", error));
  }, []);

  function getMonthName(monthIndex) {
    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    if (monthIndex >= 0 && monthIndex < months.length) {
      return months[monthIndex + 1];
    } else {
      return "Mês Inválido";
    }
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  const date = new Date();
  const currentMonth = getMonthName(date.getMonth());
  console.log(date.getMonth());

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          {"À pagar em - " + currentMonth}
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {invoices.map((invoice) => (
            <Bill
              key={invoice.descricao}
              name={invoice.descricao}
              company={invoice.banco}
              email={invoice.data}
              vat={invoice.valor}
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
