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

  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=a0d62e98&app_key=bb67a30b4ec2d751721fdf6b8f59a2c2`;

  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error("Unauthorized: Check your Edamam API credentials.");
      } else {
        throw new Error(`Server Error: ${response.status}`);
      }
    }

    const data = await response.json();
    displayResults(data);
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    alert(error.message);
  }
}
