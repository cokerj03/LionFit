// Handle search queries using only Edamam APIs

async function handleSearch() {
  const query = document.getElementById('searchQuery').value.trim();
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${encodeURIComponent(query)}&app_id=70a6ee50&app_key=187e5d6682376ce9ff06148fe538e51c`;

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
    console.error("Error fetching data:", error);
    alert(error.message);
  }
}

function displayResults(data) {
  const tableBody = document.getElementById('edamam-table-body');
  tableBody.innerHTML = "";

  data.hits.forEach(hit => {
    const recipe = hit.recipe;
    const row = `<tr>
      <td>${recipe.label}</td>
      <td>${Math.round(recipe.calories)}</td>
      <td>${recipe.mealType}</td>
      <td>${recipe.source}</td>
      <td><a href="${recipe.url}" target="_blank">View</a></td>
    </tr>`;
    tableBody.innerHTML += row;
  });
}
