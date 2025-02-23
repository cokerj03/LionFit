// Example: Vercel serverless function to securely query the Nutritionix API
export default async function handler(req, res) {
    const { query } = req.query;
    if (!query) {
      res.status(400).json({ error: 'Missing query parameter' });
      return;
    }
    
    try {
      // Make a secure request to Nutritionix API
      const nutritionixResponse = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': process.env.NUTRITIONIX_APP_ID,
          'x-app-key': process.env.NUTRITIONIX_APP_KEY
        },
        body: JSON.stringify({ query })
      });
      
      const nutritionData = await nutritionixResponse.json();
      res.status(200).json(nutritionData);
    } catch (error) {
      console.error("Error in Nutritionix API call:", error);
      res.status(500).json({ error: 'Error fetching data from Nutritionix' });
    }
  }
  