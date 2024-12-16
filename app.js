const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()
const extractToken = require("./middleware/auth")

const equipmentRoutes = require("./router/equipment")

const app = express();
app.use(express.json());// For parsing JSON request bodies
app.use(cors({
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: '*'
}))


// app.use()
// Proxy route




app.use("/", equipmentRoutes);

app.all('/api*', async (req, res) => {
    const proxyOrigin = process.env.Origin;
    // const token  = req.headers['Authorization'].split('')[1]
    try {
        const subRoute = req.path.split('api')[1];

        console.log("reques...", subRoute, "card..", req.path)

        
        const backendResponse =  await axios.post(`http://stagingapi.vampfi.com/api${subRoute}`, req.body, {
            headers: { 
                'Content-Type': 'application/json',
                'Origin': proxyOrigin,
                // Authorization: `Bearer ${token}`
            },
            timeout: 10000
        });


        res.status(backendResponse.status).send(backendResponse.data);
    } catch (error) {
        // Handle errors from the backend
        console.error('Error forwarding request:', error.message);
        res.status(error.response?.status || 500).send(error || { error: 'Internal Server Error' });
    }
});

// Start the server
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
