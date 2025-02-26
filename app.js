// Handle search queries to fetch nutrition info via the serverless function

// Updated app.js to fetch from both Nutritionix and Edamam APIs
// JCOker 2/25/2025 Updated

// Handle search queries to fetch data from both APIs directly

async function handleSearch() {
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const nutritionUrl = `https://api.edamam.com/api/nutrition-data?app_id=91514fbb&app_key=c9a91400ab5848008891e9d343cafa8e&ingr=${encodeURIComponent(query)}`;
  const recipeUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=70a6ee50&app_key=187e5d6682376ce9ff06148fe538e51c`;
  const foodDatabaseUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${encodeURIComponent(query)}&app_id=642c1ed1&app_key=891c89de7dce7f48901d54feec5ad73c`;

  try {
    const [nutritionResponse, recipeResponse, foodDatabaseResponse] = await Promise.all([
      fetch(nutritionUrl),
      fetch(recipeUrl),
      fetch(foodDatabaseUrl)
    ]);

    if (!nutritionResponse.ok || !recipeResponse.ok || !foodDatabaseResponse.ok) {
      throw new Error("API request failed.");
    }

    const nutritionData = await nutritionResponse.json();
    const recipeData = await recipeResponse.json();
    const foodDatabaseData = await foodDatabaseResponse.json();

    displayResults(nutritionData, recipeData, foodDatabaseData);
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Failed to fetch data.");
  }
  
  function displayResults(nutritionData, recipeData, foodDatabaseData) {
    // Update nutrition section
    document.getElementById('edamam-table-body').innerHTML = `
      <tr>
        <td>${foodDatabaseData.parsed[0]?.food?.label || "N/A"}</td>
        <td>${nutritionData.calories || "N/A"}</td>
        <td>${nutritionData.totalNutrients?.PROCNT?.quantity.toFixed(2) || "N/A"} g</td>
        <td>${nutritionData.totalNutrients?.FAT?.quantity.toFixed(2) || "N/A"} g</td>
        <td>${nutritionData.totalNutrients?.CHOCDF?.quantity.toFixed(2) || "N/A"} g</td>
      </tr>`;
  
    // Update recipes section
    const recipeRows = recipeData.hits.map(recipe => `
      <tr>
        <td>${recipe.recipe.label}</td>
        <td>${Math.round(recipe.recipe.calories)}</td>
        <td>${recipe.recipe.mealType.join(", ")}</td>
        <td>${recipe.recipe.source}</td>
        <td><a href="${recipe.recipe.url}" target="_blank">View</a></td>
      </tr>
    `).join("");
  
    document.getElementById('edamam-table-body').innerHTML += recipeRows;
  }
  
}
