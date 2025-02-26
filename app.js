// Handle search queries using only Edamam APIs


async function searchNutrition() {
  const query = document.getElementById('nutritionQuery').value.trim();
  if (!query) {
      alert("Please enter a food item.");
      return;
  }

  const apiUrl = `/api/nutrition?q=${encodeURIComponent(query)}`;

  try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      displayNutritionResults(query, data);
  } catch (error) {
      console.error("Error fetching nutrition data:", error);
      alert("Failed to fetch nutrition data.");
  }
}
