const express = require('express');
const axios = require('axios');
const cors = require('cors');


const app = express();
app.use(express.json());// For parsing JSON request bodies
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*'
}))
// app.use()
// Proxy route
app.all('/api*', async (req, res) => {
    const proxyOrigin = 'http://darex-realty.vampfi.com';
    try {
        const subRoute = req.path.split('api')[1];
        const backendResponse =  await axios.post(`http://stagingapi.vampfi.com/api${subRoute}`, req.body, {
            headers: { 'Content-Type': 'application/json', 'Origin': proxyOrigin },
            timeout: 10000
        });
        // Send the backend's response to the client
        res.status(backendResponse.status).send(backendResponse.data);
    } catch (error) {
        // Handle errors from the backend
        console.error('Error forwarding request:', error.message);
        res.status(error.response?.status || 500).send(error.response?.data || { error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
