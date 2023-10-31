import Card from "@mui/material/Card";

import React, { useState, useEffect } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import Invoice from "layouts/billing/components/Invoice";
import axios from "axios";

function Invoices() {
  const [assinaturas, setAssinaturas] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6InRlc3QiLCJkYm5hbWUiOiIxNDEwNTgiLCJpYXQiOjE2OTc4MzIzNjksImV4cCI6MTY5NzgzNTk2OX0.57s-mAqP6l8aX7F_cCG5GyE7zclGInx2hph6bxFbF4A",
      },
    };

    axios
      .get("http://localhost:3003/assinaturas", config)
      .then((response) => setAssinaturas(response.data))
      .catch((error) => console.error("Erro ao buscar dados das faturas:", error));
  }, []);

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h6" fontWeight="medium">
          Assinaturas
        </MDTypography>
        <MDButton variant="outlined" color="info" size="small">
          Ver Todas
        </MDButton>
      </MDBox>
      <MDBox p={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {assinaturas.map((assinatura) => (
            <Invoice
              key={assinatura.descricao}
              date={assinatura.descricao}
              id={assinatura.banco}
              price={"R$ " + assinatura.valor}
            />
          ))}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default Invoices;
