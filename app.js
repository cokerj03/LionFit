const API_BASE = "lion-fit-iiry.vercel.app"; 

async function searchNutrition() {
    const query = document.getElementById('nutritionQuery').value.trim();
    if (!query) {
        alert("Please enter a food item.");
        return;
    }

    const apiUrl = `${API_BASE}/api/nutrition?q=${encodeURIComponent(query)}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`API Error ${response.status}`);
        }

        const data = await response.json();
        displayNutritionResults(data);
    } catch (error) {
        console.error("Error fetching nutrition data:", error);
        alert("Failed to fetch nutrition data.");
    }
}


function displayNutritionResults(data) {
    const tableBody = document.getElementById('nutrition-table-body');
    tableBody.innerHTML = "";

    const food = data.foods.food[0];
    const name = food.food_name;
    const details = food.food_description.split("|");
    
    const calories = parseFloat(details[0].replace("Calories: ", "")) || 0;
    const protein = parseFloat(details[1].replace("Protein: ", "")) || 0;
    const fat = parseFloat(details[2].replace("Fat: ", "")) || 0;
    const carbs = parseFloat(details[3].replace("Carbs: ", "")) || 0;

    // Update table
    const row = `<tr>
        <td>${name}</td>
        <td>${calories}</td>
        <td>${protein}</td>
        <td>${fat}</td>
        <td>${carbs}</td>
    </tr>`;
    tableBody.innerHTML += row;

    // Update Chart
    updateChart(name, calories, protein, fat, carbs);
}

function updateChart(name, calories, protein, fat, carbs) {
    const ctx = document.getElementById('nutritionChart').getContext('2d');

    if (nutritionChart) {
        nutritionChart.destroy(); // Remove old chart before updating
    }

    nutritionChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ["Calories", "Protein (g)", "Fat (g)", "Carbs (g)"],
            datasets: [{
                label: `Nutritional Values for ${name}`,
                data: [calories, protein, fat, carbs],
                backgroundColor: ['#FF5733', '#33FF57', '#337AFF', '#F7C600']
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
