const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/consulta', async (req, res) => {
  const dni = req.body.dni;

  if (!dni || dni.length !== 8) {
    return res.status(400).json({ error: 'DNI inválido' });
  }

  try {
    const response = await fetch('https://licencias.mtc.gob.pe/api/puntos/consultaConsolidado', {
      method: 'POST',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Android 15; Mobile; rv:140.0) Gecko/140.0 Firefox/140.0',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Content-Type': 'application/json',
        'Accept-Language': 'es-US',
        'Authorization': 'Bearer TU_TOKEN_AQUI',
        'Origin': 'https://licencias.mtc.gob.pe',
        'Referer': 'https://licencias.mtc.gob.pe/',
        'Cookie': 'cookiesession1=TU_COOKIE_AQUI'
      },
      body: JSON.stringify({
        "TipoBusqueda": 0,
        "TipoDocumento": 2,
        "NumDocumento": dni,
        "NumLicencia": "",
        "ApePaterno": "",
        "ApeMaterno": "",
        "Nombre": ""
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Error al conectar con el MTC', detalle: error.toString() });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});