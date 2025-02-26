// Handle search queries to fetch nutrition info via the serverless function

// Updated app.js to fetch from both Nutritionix and Edamam APIs
// JCOker 2/25/2025 Updated

// Handle search queries to fetch data from both APIs directly
async function handleSearch() {
  const query = document.getElementById('searchQuery').value;
  if (!query) return alert("Please enter a search term.");

  try {
    // Direct API call to Nutritionix
    const nutritionixResponse = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-app-id': '00b81cef',  // Replace with your actual Nutritionix App ID
        'x-app-key': '80416230649f21a0e529b38d18574c1c'  // Replace with your actual Nutritionix App Key
      },
      body: JSON.stringify({ query })
    });
    const nutritionData = await nutritionixResponse.json();

    // Direct API call to Edamam with user ID
    const edamamResponse = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=a0d62e98&app_key=bb67a30b4ec2d751721fdf6b8f59a2c2`, {
      headers: {
        'Edamam-Account-User': 'cokerj1@csp.edu'
      }
    });
    const edamamData = await edamamResponse.json();

    // Display results from both APIs
    displayResults(nutritionData, edamamData);
  } catch (error) {
    console.error("Error fetching data from APIs:", error);
  }
}

// Display the results in organized tables
function displayResults(nutritionData, edamamData) {
  const nutritionixTableBody = document.getElementById('nutritionix-table-body');
  nutritionixTableBody.innerHTML = ''; // Clear previous results

  // Populate Nutritionix Table
  if (nutritionData.foods && nutritionData.foods.length > 0) {
    nutritionData.foods.forEach(food => {
      const row = `
        <tr>
          <td>${food.food_name}</td>
          <td>${food.nf_calories}</td>
          <td>${food.nf_protein}</td>
          <td>${food.nf_total_fat}</td>
          <td>${food.nf_total_carbohydrate}</td>
        </tr>
      `;
      nutritionixTableBody.innerHTML += row;
    });
  } else {
    nutritionixTableBody.innerHTML = '<tr><td colspan="5">No results found.</td></tr>';
  }

  // Populate Edamam Table
  const edamamTableBody = document.getElementById('edamam-table-body');
  edamamTableBody.innerHTML = ''; // Clear previous results

  if (edamamData.hits && edamamData.hits.length > 0) {
    edamamData.hits.forEach(hit => {
      const recipe = hit.recipe;
      const row = `
        <tr>
          <td>${recipe.label}</td>
          <td>${Math.round(recipe.calories)}</td>
          <td>${recipe.mealType ? recipe.mealType[0] : 'N/A'}</td>
          <td>${recipe.source}</td>
          <td><a href="${recipe.url}" target="_blank">View Recipe</a></td>
        </tr>
      `;
      edamamTableBody.innerHTML += row;
    });
  } else {
    edamamTableBody.innerHTML = '<tr><td colspan="5">No results found or error fetching data.</td></tr>';
  }
}
