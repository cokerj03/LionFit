// Handle search queries to fetch nutrition info via the serverless function

// Updated app.js to fetch from both Nutritionix and Edamam APIs
// JCOker 2/25/2025 Updated

// Handle search queries to fetch data from both APIs
async function handleSearch() {
  const query = document.getElementById('searchQuery').value;
  if (!query) return alert("Please enter a search term.");

  try {
    // Call the Nutritionix serverless function
    const nutritionixResponse = await fetch(`/api/nutrition?query=${encodeURIComponent(query)}`);
    const nutritionData = await nutritionixResponse.json();

    // Call the Edamam serverless function
    const edamamResponse = await fetch(`/api/mealplanner?mealType=${encodeURIComponent(query)}`);
    const edamamData = await edamamResponse.json();

    // Display results from both APIs
    displayResults(nutritionData, edamamData);
  } catch (error) {
    console.error("Error fetching data from APIs:", error);
  }
}

// Display the results
function displayResults(nutritionData, edamamData) {
  const recommendationsSection = document.getElementById('recommendations');
  recommendationsSection.innerHTML = `
    <h3>Nutritionix Results:</h3>
    <pre>${JSON.stringify(nutritionData, null, 2)}</pre>

    <h3>Edamam Meal Planner Results:</h3>
    <pre>${JSON.stringify(edamamData, null, 2)}</pre>
  `;
}