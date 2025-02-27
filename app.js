const API_BASE = "https://your-backend.vercel.app";

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
