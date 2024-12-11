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
    try {
        // Modify headers, including the Origin header
        const modifiedHeaders = {
            ...req.headers,
            Origin: 'http://darex-realty.vampfi.com', // Set your desired origin
        };
        // const uri  =`http://stagingapi.vampfi.com/api${req.path.replace('/api', '/auth/create-password')}` // Adjust the backend URL
        // const uri = 'http://localhost:4000/app:v1/user/login'
        // console.log(uri)
        // Forward the request using Axios
        // const backendResponse = await axios({
        //     method: req.method,
        //     url: uri, // Adjust the backend URL
        //     // headers: modifiedHeaders,
        //     headers: {'Content-Type': 'application/json'},
        //     body: req.body, // Include request body
        //     timeout: 10000
        //     // params: req.query, // Include query parameters
        // });
        console.log(req.body)
        const backendResponse =  await axios.post('http://stagingapi.vampfi.com/api/auth/create-password/', req.body, {
            headers: { 'Content-Type': 'application/json', 'Origin': 'http://darex-realty.vampfi.com' },
        });
        // Send the backend's response to the client
        console.log(backendResponse.data)
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
