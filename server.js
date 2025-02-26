require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/api/nutrition', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ error: 'Missing query parameter' });
    }

    const url = `https://api.edamam.com/api/nutrition-data?app_id=${process.env.EDAMAM_NUTRITION_APP_ID}&app_key=${process.env.EDAMAM_NUTRITION_APP_KEY}&ingr=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
