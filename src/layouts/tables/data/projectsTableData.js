/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDProgress from "components/MDProgress";

// Images
import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import logoGithub from "assets/images/small-logos/github.svg";
import logoAtlassian from "assets/images/small-logos/logo-atlassian.svg";
import logoSlack from "assets/images/small-logos/logo-slack.svg";
import logoSpotify from "assets/images/small-logos/logo-spotify.svg";
import logoInvesion from "assets/images/small-logos/logo-invision.svg";

import React, { useState, useEffect } from "react";

import axios from "axios";
import token from "../../authentication/access/auth";

export default function data() {
  const [metas, setMetas] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        authorization: token,
      },
    };

    axios
      .get("http://localhost:3003/metas", config)
      .then((response) => setMetas(response.data))
      .catch((error) => console.error("Erro ao buscar dados das metas:", error));
  }, []);

  const Project = ({ name }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" variant="rounded" /> */}
      <MDTypography display="block" variant="button" fontWeight="medium" ml={1} lineHeight={1}>
        {name}
      </MDTypography>
    </MDBox>
  );

  const Progress = ({ color, value }) => (
    <MDBox display="flex" alignItems="center">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color={color} value={value} />
      </MDBox>
    </MDBox>
  );

  const rows = metas.map((key) => ({
    project: <Project name={key.titulo} />,
    budget: (
      <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
        R$ {key.valor}
      </MDTypography>
    ),
    status: (
      <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
        R$ {key.meta}
      </MDTypography>
    ),
    completion: <Progress color="info" value={key.percentual} />,
    action: (
      <MDTypography component="a" href="#" color="text">
        <Icon>more_vert</Icon>
      </MDTypography>
    ),
  }));

  return {
    columns: [
      { Header: "Titulo", accessor: "project", width: "20%", align: "left" },
      { Header: "Valor", accessor: "budget", align: "left" },
      { Header: "Meta", accessor: "status", align: "center" },
      { Header: "Margem", accessor: "completion", align: "center" },
    ],
    rows: rows,
  };
}
