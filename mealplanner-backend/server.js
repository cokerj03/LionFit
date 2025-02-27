require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();

// ✅ Allow frontend to call the backend
app.use(cors({
    origin: ["https://lion-fit-iiry.vercel.app"], // ✅ Add your frontend URL
    methods: ["GET"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());


const CLIENT_ID = process.env.FATSECRET_CLIENT_ID;
const CLIENT_SECRET = process.env.FATSECRET_CLIENT_SECRET;
let accessToken = "";
let tokenExpiresAt = 0; // Track token expiration

// Step 1: Get OAuth Token (FatSecret requires authentication)
async function getAccessToken() {
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
            throw new Error(`OAuth Error: ${response.status}`);
        }

        const data = await response.json();
        accessToken = data.access_token;
        tokenExpiresAt = Date.now() + (data.expires_in * 1000); // Convert expiration time

        console.log("✅ FatSecret Access Token Retrieved:", accessToken);
    } catch (error) {
        console.error("❌ Failed to retrieve FatSecret token:", error);
    }
}

// Step 2: Ensure Token is Valid Before Making API Calls
async function ensureValidToken() {
    if (!accessToken || Date.now() >= tokenExpiresAt) {
        console.log("🔄 Refreshing FatSecret Access Token...");
        await getAccessToken();
    }
}

// Step 3: API Route for Nutrition Search
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
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("❌ Error fetching nutrition data:", error);
        res.status(500).json({ error: "Failed to fetch nutrition data" });
    }
});

// Step 4: API Route for Recipe Search
app.get('/api/recipes', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: "Missing recipe query" });
    }

    await ensureValidToken();

    const apiUrl = `https://platform.fatsecret.com/rest/server.api?method=recipes.search&search_expression=${encodeURIComponent(query)}&format=json`;

    try {
        const response = await fetch(apiUrl, {
            headers: { "Authorization": `Bearer ${accessToken}` }
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("❌ Error fetching recipes:", error);
        res.status(500).json({ error: "Failed to fetch recipes" });
    }
});

// Step 5: Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
