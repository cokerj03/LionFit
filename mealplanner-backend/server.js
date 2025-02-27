require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const CLIENT_ID = process.env.FATSECRET_CLIENT_ID;
const CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET;
let accessToken = "";
let tokenExpiresAt = 0;

// ✅ Step 1: Fetch OAuth Token
async function getAccessToken() {
    console.log("🔄 Fetching new FatSecret access token...");
    const tokenUrl = "https://oauth.fatsecret.com/connect/token";
    const credentials = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

    try {
        const response = await fetch(tokenUrl, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: "grant_type=client_credentials&scope=basic"
        });

        if (!response.ok) {
            const errorMsg = await response.text();
            throw new Error(`OAuth Error ${response.status}: ${errorMsg}`);
        }

        const data = await response.json();
        accessToken = data.access_token;
        tokenExpiresAt = Date.now() + (data.expires_in * 1000);
        console.log("✅ FatSecret Access Token Retrieved!");
    } catch (error) {
        console.error("❌ Failed to retrieve FatSecret token:", error);
    }
}

// ✅ Step 2: Ensure Token is Valid Before API Calls
async function ensureValidToken() {
    if (!accessToken || Date.now() >= tokenExpiresAt) {
        await getAccessToken();
    }
}

// ✅ Step 3: API Route for Nutrition Search
app.get('/api/nutrition', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Missing food query" });
    }

    await ensureValidToken();

    const apiUrl = `https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${encodeURIComponent(query)}&format=json`;

    try {
        const response = await fetch(apiUrl, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });

        if (!response.ok) {
            throw new Error(`API Error ${response.status}: ${await response.text()}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("❌ Error fetching nutrition data:", error);
        res.status(500).json({ error: "Failed to fetch nutrition data" });
    }
});

// ✅ Step 4: Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
