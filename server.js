const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Rota para a raiz do servidor
app.get('/', (req, res) => {
    res.send('Bem-vindo ao meu servidor!');
});

// Rota para obter dados da API
app.get('/api/data', async (req, res) => {
    try {
        const response = await axios.get('https://raw.githubusercontent.com/juliawlett/APIWeeke/main/API.json', {
            headers: { 'Authorization': `token ${process.env.GITHUB_TOKEN}` }
        });
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao obter dados da API');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
