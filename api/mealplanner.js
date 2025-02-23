// Example: Vercel serverless function to query the Edamam Meal Planner API
export default async function handler(req, res) {
    const { mealType } = req.query;
    if (!mealType) {
      res.status(400).json({ error: 'Missing mealType parameter' });
      return;
    }
    
    try {
      // Construct the request URL using the provided API key
      const url = `https://api.edamam.com/api/mealplanner/v2/recipes?type=public&q=${encodeURIComponent(mealType)}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`;

      
      const edamamResponse = await fetch(url);
      const mealData = await edamamResponse.json();
      res.status(200).json(mealData);
    } catch (error) {
      console.error("Error in Edamam API call:", error);
      res.status(500).json({ error: 'Error fetching data from Edamam Meal Planner' });
    }
  }
  