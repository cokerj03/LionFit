// Handle search queries to fetch nutrition info via the serverless function
async function handleSearch() {
  const query = document.getElementById('searchQuery').value;
  if (!query) return alert("Please enter a search term.");

  try {
    // Call the Nutritionix serverless function
    const response = await fetch('https://api.nutritionix.com/v2/search');


    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
  }
}

// Display the results (for now, simply outputting JSON)
function displayResults(data) {
  const recommendationsSection = document.getElementById('recommendations');
  recommendationsSection.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
}
