//  serverless function to query the Edamam Meal Planner API

export default async function handler(req, res) {
    const { mealType } = req.query;
    if (!mealType) {
      res.status(400).json({ error: 'Missing mealType parameter' });
      return;
    }
    
    try {
      // Construct the request URL using the provided API key
      const edamamResponse = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=70a6ee50&app_key=187e5d6682376ce9ff06148fe538e51c`);


      
      const edamamResponse = await fetch(url);
      const mealData = await edamamResponse.json();
      res.status(200).json(mealData);
    } catch (error) {
      console.error("Error in Edamam API call:", error);
      res.status(500).json({ error: 'Error fetching data from Edamam Meal Planner' });
    }
  }
  