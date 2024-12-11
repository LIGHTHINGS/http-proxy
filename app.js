// const { createProxyMiddleware } = require('http-proxy-middleware');
// const express = require('express');
// const axios = require('axios')

// const app = express();
// app.use(express.json())

// // const proxy = createProxyMiddleware({
// //     // target: 'http://stagingapi.vampfi.com/api'
// //     target: 'http://localhost:4000/app:v1/user',
// //     changeOrigin: true,
// //     onProxyReq: (proxyReq, req, res) => {
// //         proxyReq.setHeader('Origin', 'http://darex-realty.vampfi.com');
// //         if (req.body) {
// //             const bodyData = JSON.stringify(req.body);
// //             proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData));
// //             proxyReq.write(bodyData);
// //             console.log(bodyData);

// //             console.log(res)
// //         }
// //     },
// // });


// app.use('/test', (req, res, next) =>{
//     console.log(req.body)
    
// });

// app.listen(3001, () => {
//     console.log('Proxy running on http://localhost:3001');
// });


const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json()); // For parsing JSON request bodies

// Proxy route
app.all('/api*', async (req, res) => {
    const proxyOrigin = 'http://darex-realty.vampfi.com'
    try {
        const subroute = req.path.split('api')[1];
        const backendResponse =  await axios.post(`http://stagingapi.vampfi.com/api${subroute}`, req.body, {
            headers: { 'Content-Type': 'application/json', 'Origin': 'http://darex-realty.vampfi.com' },
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
