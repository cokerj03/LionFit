//  serverless function to query the Edamam Meal Planner API

export default async function handler(req, res) {
  const { mealType } = req.query;
  if (!mealType) {
    res.status(400).json({ error: 'Missing mealType parameter' });
    return;
  }

  const mealPlannerUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(mealType)}&app_id=70a6ee50&app_key=187e5d6682376ce9ff06148fe538e51c`;

  try {
    const response = await fetch(mealPlannerUrl);
    const mealData = await response.json();
    res.status(200).json(mealData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: 'Error fetching meal planner data' });
  }
}

  