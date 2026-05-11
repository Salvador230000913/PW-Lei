import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Permitir CORS para qualquer origem
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Endpoint principal
app.get("/api/flights", async (req, res) => {
  try {
    const response = await fetch(
      "https://opensky-network.org/api/states/all"
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Erro ao obter dados da OpenSky",
      details: error.message
    });
  }
});

// Endpoint de teste
app.get("/", (req, res) => {
  res.send("OpenSky Proxy está a funcionar!");
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});