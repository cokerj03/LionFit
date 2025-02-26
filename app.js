// Handle search queries using only Edamam APIs

async function searchNutrition() {
  const query = document.getElementById('nutritionQuery').value.trim();
  if (!query) {
      alert("Please enter a food item.");
      return;
  }

  const apiUrl = `https://api.edamam.com/api/nutrition-data?app_id=91514fbb&app_key=c9a91400ab5848008891e9d343cafa8e&ingr=${encodeURIComponent(query)}`;

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      displayNutritionResults(query, data);
  } catch (error) {
      console.error("Error fetching nutrition data:", error);
      alert("Failed to fetch nutrition data.");
  }
}

function displayNutritionResults(food, data) {
  const tableBody = document.getElementById('nutrition-table-body');
  tableBody.innerHTML = `
      <tr>
          <td>${food}</td>
          <td>${Math.round(data.calories)}</td>
          <td>${data.totalNutrients.PROCNT ? Math.round(data.totalNutrients.PROCNT.quantity) : 0}</td>
          <td>${data.totalNutrients.FAT ? Math.round(data.totalNutrients.FAT.quantity) : 0}</td>
          <td>${data.totalNutrients.CHOCDF ? Math.round(data.totalNutrients.CHOCDF.quantity) : 0}</td>
      </tr>
  `;
}

async function searchFoodDatabase() {
  const query = document.getElementById('foodQuery').value.trim();
  if (!query) {
      alert("Please enter a food item.");
      return;
  }

  const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?app_id=642c1ed1&app_key=891c89de7dce7f48901d54feec5ad73c&ingr=${encodeURIComponent(query)}`;

  try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      displayFoodDatabaseResults(data);
  } catch (error) {
      console.error("Error fetching food database data:", error);
      alert("Failed to fetch food database data.");
  }
}

function displayFoodDatabaseResults(data) {
  const tableBody = document.getElementById('food-table-body');
  tableBody.innerHTML = "";

  data.hints.forEach(hint => {
      const food = hint.food;
      const row = `<tr>
          <td>${food.label}</td>
          <td>${food.category}</td>
          <td>${food.nutrients.ENERC_KCAL ? Math.round(food.nutrients.ENERC_KCAL) : 'N/A'}</td>
          <td><a href="https://www.edamam.com/food/${food.foodId}" target="_blank">More Info</a></td>
      </tr>`;
      tableBody.innerHTML += row;
  });
}
