// Serverless function to query Edamam Meal Planner API

export default async function handler(req, res) {
  const { mealType } = req.query;
  if (!mealType) {
    res.status(400).json({ error: 'Missing mealType parameter' });
    return;
  }
  
  try {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(mealType)}&app_id=a0d62e98&app_key=bb67a30b4ec2d751721fdf6b8f59a2c2`;
    
    const response = await fetch(url);
    const mealData = await response.json();
    res.status(200).json(mealData);
  } catch (error) {
    console.error("Error in Edamam API call:", error);
    res.status(500).json({ error: 'Error fetching data from Edamam Meal Planner' });
  }
}
