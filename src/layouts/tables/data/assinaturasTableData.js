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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";

// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Icon from "@mui/material/Icon";

export default function data() {
  const [assinaturas, setAssinaturas] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true); // Adiciona um estado de carregamento
  const [menu, setMenu] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  let conversorMoeda = new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  });
  // const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  // const closeMenu = () => {
  //   setMenu(null);
  // };
  const config = {
    headers: {
      authorization: sessionStorage.getItem("token"),
    },
  };
  console.log(`${process.env.REACT_APP_URL}/api/assinaturas`);
  useEffect(() => {
    console.log("entrou");
    axios
      .get(`${process.env.REACT_APP_URL}/api/assinaturas`, config)
      .then((response) => {
        setAssinaturas(response.data);
        console.log(`${response} resposta`);
        setLoading(false); // Marca que os dados foram carregados com sucesso
      })
      .catch((error) => console.error("Erro ao buscar dados das assinaturas:", error));
  }, []);

  const openMenu = (index) => {
    setMenuIndex(index); // Abrir o menu da linha específica
  };

  const closeMenu = () => {
    setMenuIndex(null); // Fechar todos os menus
  };

  const handleOptionClick = (option, id) => {
    let status = "";
    switch (option) {
      case "Cancelar":
        status = 3;
        break;
      case "Pausar":
        status = 7;
        break;
      default:
        break;
    }
    console.log(option, id);
    try {
      axios
        .put(
          `${process.env.REACT_APP_URL}/api/atualizar/assinaturas`,
          {
            id_venda: id,
            status_venda: status,
          },
          config
        )
        .then((response) => {
          window.location.reload();
        })
        .catch((error) => console.error("Erro ao buscar dados das assinaturas:", error));
    } catch (error) {}
    closeMenu();
  };

  const renderMenu = (index, event) => (
    <Menu
      id={`menu-${index}`}
      anchorEl={menuIndex === index ? index : null}
      anchorOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={menuIndex === index}
      onClose={closeMenu}
    >
      <MenuItem onClick={() => handleOptionClick("Cancelar", assinaturas[index].ass_id)}>
        Cancelar
      </MenuItem>
      <MenuItem onClick={() => handleOptionClick("Pausar", assinaturas[index].ass_id)}>
        Pausar
      </MenuItem>
    </Menu>
  );

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {/* <MDAvatar src={image} name={name} size="sm" /> */}
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  const rows =
    assinaturas && assinaturas.length > 0
      ? assinaturas.map((key, index) => ({
          author: <Author image={team4} name={key.descricao} />,
          function: <Job title={key.banco} />,
          budget: (
            <MDTypography component="a" href="#" variant="button" color="text" fontWeight="medium">
              {conversorMoeda.format(key.valor)}
            </MDTypography>
          ),
          employed: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {key.data}
            </MDTypography>
          ),
          action: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              <MDBox color="text" px={2}>
                <Icon
                  sx={{ cursor: "pointer", fontWeight: "bold" }}
                  fontSize="small"
                  onClick={(event) => openMenu(index, event)}
                >
                  more_vert
                </Icon>
                {renderMenu(index)}
              </MDBox>
            </MDTypography>
          ),
        }))
      : [];
  return {
    columns: [
      { Header: "Assinatura", accessor: "author", width: "45%", align: "left" },
      { Header: "banco", accessor: "function", align: "left" },
      { Header: "Data de Inicio", accessor: "employed", align: "center" },
      { Header: "Valor", accessor: "budget", align: "left" },
      { Header: "editar", accessor: "action", align: "center" },
    ],

    rows: rows,
  };
}
// component="a" href="#"
