import "./Obras.scss";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { FormCloseButton } from "../../Widgets/Buttons/Buttons.jsx";
import Table from "../../Widgets/Tabelas/TabelaObras.jsx";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Header from "../../Widgets/Header/Header.jsx";
import TextField from "@mui/material/TextField";
import { Box, Button, Input, MenuItem } from "@mui/material";
import api from "../../Api/axios.jsx";

const Obras = () => {
  const [nomeObra, setNomeObra] = useState("");
  const [selectedEncarregadoId, setSelectedEncarregadoId] = useState("");

  const [encarregados, setEncarregados] = useState([]);

  const [nomeArquivo, setNomeArquivo] = useState("Selecione o arquivo");
  const [obras, setObras] = useState([]);
  const [itens, setItens] = useState([]);
  const [obrasTabela, setObrasTabela] = useState([]);

  const [tab, setTab] = useState(0);

  const handleChangeTab = (event, newTab) => {
    setTab(newTab);

    if (newTab === 0) setObrasTabela(obras);
    else if (newTab === 1)
      setObrasTabela(obras.filter((obra) => obra.status === "NAO_CONCLUIDO"));
    else if (newTab === 2)
      setObrasTabela(obras.filter((obra) => obra.status === "CONCLUIDO"));
  };

  //get encarregados
  const fetchEncarregados = async () => {
    try {
      const response = await api.get("/encarregados");

      setEncarregados(response.data);
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      }
    }
  };

  useEffect(() => {
    fetchEncarregados();
  }, []);

  //get obras
  const fecthObras = async () => {
    try {
      const response = await api.get("/obras");

      const obrasResponse = response.data;
      setObras(obrasResponse);
      setObrasTabela(obrasResponse);
    } catch (e) {
      if (e.response) {
        console.log(e.response.data);
        console.log(e.response.status);
        console.log(e.response.headers);
      }
    }
  };

  useEffect(() => {
    fecthObras();
  }, []);

  //post obra
  const handleSubmit = async () => {
    const obra = {
      nome: nomeObra,
      encarregado_id: selectedEncarregadoId,
      itens: itens,
    };

    api
      .post("/register-obra", obra)
      .then(function (response) {
        fecthObras();
      })
      .catch(function (error) {
        console.log(error);
      });

    setItens([]);
    setNomeObra("");
    setSelectedEncarregadoId("");
    setNomeArquivo("Selecione o arquivo");

    console.log(obra);
    closeFormRegisterObra();
  };

  const handleFileUpload = (e) => {
    e.preventDefault();
    setItens([]);

    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        blankrows: false,
      });

      setNomeArquivo(file.name);

      //array de itens a partir dos dados parseados
      for (let i = 1; i < parsedData.length; i++) {
        const row = parsedData[i];
        const item = {
          numero: row[0],
          local_de_aplicacao: row[1],
          nome: row[2],
          sistemas: row[3],
          tipo: row[4],
          quantidade: row[5],
          area_total: row[6],
          valor: row[7],
          valor_etapa: row[8],
          preparacao_tipo: row[9],
          preparacao_area_total: row[10],
          preparacao_valor: row[11],
          preparacao_valor_etapa: row[12],
          protecao_tipo: row[13],
          protecao_area_total: row[14],
          protecao_valor: row[15],
          protecao_valor_etapa: row[16],
        };
        itens.push(item);
      }
    };

    console.log(itens);
  };

  const showFormRegisterObra = () => {
    const form = document.getElementById("form-register-obra");
    const obras = document.getElementById("obras-conteudo");
    form.style.display = "block";
    obras.classList.add("blurred");
  };

  const closeFormRegisterObra = () => {
    setItens([]);
    setNomeObra("");
    setSelectedEncarregadoId("");
    setNomeArquivo("Selecione o arquivo");
    const form = document.getElementById("form-register-obra");
    const obras = document.getElementById("obras-conteudo");
    form.style.display = "none";
    obras.classList.remove("blurred");
  };

  return (
    <section className="obras">
      <div className="obras-conteudo" id="obras-conteudo">
        <div className="tabela-header">
          <h1 className="tabela-titulo">Obras</h1>
          <Header BotaoAdicionar={showFormRegisterObra} />
        </div>

        <Tabs value={tab} onChange={handleChangeTab}>
          <Tab label="Todas" disableRipple />
          <Tab label="Não concluídas" disableRipple />
          <Tab label="Concluídas" disableRipple />
        </Tabs>

        <Table obras={obrasTabela} />
      </div>

      <Box
        component="form"
        onSubmit={handleSubmit}
        className="form-register-obra"
        id="form-register-obra"
      >
        <h3 className="form-titulo">Registrar nova obra</h3>
        <FormCloseButton onClick={closeFormRegisterObra} />
        <div className="form-input-area">
          <TextField
            variant="outlined"
            label="Nome da obra"
            required
            value={nomeObra}
            size="small"
            onChange={(e) => setNomeObra(e.target.value)}
          />

          <TextField
            variant="outlined"
            select
            label="Selecione o encarregado"
            size="small"
            value={selectedEncarregadoId}
            onChange={(e) => setSelectedEncarregadoId(e.target.value)}
            required
            fullWidth
          >
            {encarregados.map((encarregado) => (
              <MenuItem
                key={encarregado.encarregado_id}
                value={encarregado.encarregado_id}
              >
                {encarregado.encarregado_nome}
              </MenuItem>
            ))}
          </TextField>

          <div className="input-file">
            <Button
              variant="outlined"
              color="secondary"
              component="label"
              disableRipple
            >
              Selecione o arquivo
              <Input
                type="file"
                inputProps={{ accept: ".csv, .xlsx, .xls" }}
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
            </Button>

            <span>{nomeArquivo}</span>
          </div>

          <Button variant="contained" disableRipple type="submit">
            Registrar obra
          </Button>
        </div>
      </Box>
    </section>
  );
};

export default Obras;
