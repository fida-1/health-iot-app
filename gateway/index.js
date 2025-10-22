const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// 🚨 BACKEND_URL doit correspondre au port Spring Boot
const BACKEND_URL = "http://localhost:8081/api/data"; 

app.post('/data', async (req, res) => {
    try {
        await axios.post(BACKEND_URL, req.body);
        console.log("Data forwarded:", req.body); // utile pour debug
        res.status(200).send('Data forwarded');
    } catch (err) {
        console.error("Error forwarding data:", err.message);
        res.status(500).send('Error forwarding data');
    }
});

app.listen(3000, () => console.log('Gateway running on port 3000'));
