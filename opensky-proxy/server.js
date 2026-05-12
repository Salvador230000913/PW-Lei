import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

const OPENSKY_USER = process.env.OPENSKY_USER;
const OPENSKY_PASS = process.env.OPENSKY_PASS;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/api/flights", async (req, res) => {
  try {
    const headers = {};

    // Só adiciona autenticação se as variáveis existirem
    if (OPENSKY_USER && OPENSKY_PASS) {
      headers.Authorization =
        "Basic " +
        Buffer.from(
          `${OPENSKY_USER}:${OPENSKY_PASS}`
        ).toString("base64");
    }

    const response = await fetch(
      "https://opensky-network.org/api/states/all",
      { headers }
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erro da OpenSky",
        status: response.status
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao obter dados da OpenSky",
      details: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});