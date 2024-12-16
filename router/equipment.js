

// import axios from "axios";
const extractToken = require("../middleware/auth")
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()

const router = require("express").Router();

// const router = express.Router();

router.post("/api/equipments/categories", extractToken, async (req, res) => {
    try {
        const token = req.headers.token; // The token is now attached to the headers by the middleware
        const proxyOrigin = process.env.Origin;
        const subRoute = req.path.split('api')[1]; // Replace with your sub-route

        console.log("all the code..", token, proxyOrigin, subRoute, req.path)

        const backendResponse = await axios.post(
            `http://stagingapi.vampfi.com/api${subRoute}`,
            req.body,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Origin": proxyOrigin,
                    Authorization: `Bearer ${token}` // Use the extracted token here
                },
                timeout: 10000,
            }
        );

        console.log("response..", backendResponse)

        return res.status(200).json(backendResponse.data);
    } catch (error) {
        // console.error("Error making backend request:", error);

        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        return res.status(500).json({ error: "An unexpected error occurred" });
    }
});

router.get("/api/equipments/categories", extractToken, async (req, res) => {
    try {
        const token = req.headers.token; // The token is now attached to the headers by the middleware
        const proxyOrigin = process.env.Origin;
        const subRoute = req.path.split('api')[1]; // Replace with your sub-route

        console.log("all the code..", token, proxyOrigin, subRoute, req.path)

        const backendResponse = await axios.get(
            `http://stagingapi.vampfi.com/api${subRoute}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "Origin": proxyOrigin,
                    Authorization: `Bearer ${token}` // Use the extracted token here
                },
                timeout: 10000,
            }
        );

        console.log("response..", backendResponse)

        return res.status(200).json(backendResponse.data);
    } catch (error) {
        // console.error("Error making backend request:", error);

        if (axios.isAxiosError(error) && error.response) {
            return res.status(error.response.status).json(error.response.data);
        }

        return res.status(500).json({ error: "An unexpected error occurred" });
    }
});

module.exports = router
