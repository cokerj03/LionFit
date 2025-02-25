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

    // Direct API call to Edamam
    const edamamResponse = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=70a6ee50&app_key=187e5d6682376ce9ff06148fe538e51c`);
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
