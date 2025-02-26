// Serverless function to securely query Edamam Nutrition API
export default async function handler(req, res) {
  const { query } = req.query;
  if (!query) {
    res.status(400).json({ error: 'Missing query parameter' });
    return;
  }
  
  try {
    const url = `https://api.edamam.com/api/nutrition-data?app_id=91514fbb&app_key=c9a91400ab5848008891e9d343cafa8e&ingr=${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    const nutritionData = await response.json();
    res.status(200).json(nutritionData);
  } catch (error) {
    console.error("Error in Edamam API call:", error);
    res.status(500).json({ error: 'Error fetching data from Edamam Nutrition Analysis' });
  }
}
