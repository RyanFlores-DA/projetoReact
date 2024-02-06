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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import axios from "axios";

// Images
// import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import bgImageBlack from "assets/images/Fin.mp4";
// import bgImageBlack from "assets/images/back_login.jpeg";

function Basic() {
  sessionStorage.setItem("redirect", false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  const handleSignIn = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/login`, config, {
        login,
        password,
      });

      const { usuario, token } = response.data;

      // Armazene o nome de usuário e o token na sessão ou no estado da aplicação, conforme necessário.
      // Exemplo de armazenamento na sessão:
      sessionStorage.setItem("user", response.data.user);
      sessionStorage.setItem("token", response.data.token);
      // Redirecione o usuário para outra página após o login, se necessário.
      window.location.href = "/billing";
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <BasicLayout image={bgImageBlack}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="dark"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Entrar
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              {/* <MDTypography
                component={MuiLink}
                href="https://github.com/RyanFlores-DA"
                variant="body1"
                color="white"
              >
                <GitHubIcon color="inherit" />
              </MDTypography> */}
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Usuario"
                fullWidth
                onChange={(e) => setLogin(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Senha"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="dark" fullWidth onClick={handleSignIn}>
                Entrar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Não tem uma conta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Cadastrar-se
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
