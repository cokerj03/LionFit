# 🦁 LionFit - Health & Nutrition Web App

LionFit is a **modern health & fitness** web application designed to provide users with **personalized nutrition insights, meal planning tools, and fitness resources**. It integrates the **FatSecret API** for real-time nutrition data.

---

## 📌 Features
- ✅ **Meal Planner** – Search for food items and get nutrition breakdowns.
- ✅ **Interactive Nutrition Charts** – View calories, protein, fat, and carb breakdowns using **Chart.js**.
- ✅ **FatSecret API Integration** – Fetch food data directly from **FatSecret**.
- ✅ **Workout & Merch Pages** – Future fitness programs and store (Coming Soon).
- ✅ **Health & Nutrition Blog** – Read fitness and meal-planning guides.
- ✅ **Contact Form** – Get in touch with the LionFit team.

---

## 🛠️ Technology Stack
- **Frontend:** HTML, CSS, JavaScript (Hosted on **GitHub Pages**)
- **Backend:** Node.js, Express.js (Deployed on **Vercel**)
- **API:** FatSecret API for real-time nutrition data
- **Charting Library:** Chart.js for visualizing nutrition data

---

## 📂 Project Structure
```
📎 lionfit
👉     index.html        # Homepage
    👉 mealplanner.html  # Meal Planner with FatSecret API
    👉 blog.html         # Nutrition & Fitness Blog
    👉 workouts.html     # Workouts (Coming Soon)
    👉 contact.html      # Contact Page
    👉 style.css         # Global styles
    👉 app.js            # Frontend logic for API calls & UI updates
    👉 lionFitLogo.png   # Branding
👉 📂 backend
    👉 server.js         # Express.js backend with FatSecret API integration
    👉 .env              # API credentials (DO NOT COMMIT)
    👉 vercel.json       # Deployment config for Vercel
👉 README.md             # Documentation
```

---

## 🚀 Installation & Development
### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR_GITHUB_USERNAME/lionfit.git
cd lionfit
```

### **2️⃣ Install Dependencies**
Ensure **Node.js** is installed, then run:
```sh
npm install
```

### **3️⃣ Configure API Keys**
Create a `.env` file in the **backend folder** and add your **FatSecret API credentials**:
```
FATSECRET_CLIENT_ID=a4b776a26aba43f082824398b0f2efaf
FATSECRET_CLIENT_SECRET=36feb23191d04fd4bc65ace99e7982be
```

### **4️⃣ Start the Backend Locally**
Run the backend:
```sh
node server.js
```
Expected output:
```
🚀 Server running on port 3000
```

### **5️⃣ Open the Frontend**
1. Open `index.html` in your browser, or
2. Use **Live Server** in VS Code for local testing.

---

## 🌍 Deployment
### **1️⃣ Deploy Backend to Vercel**
```sh
vercel --prod
```
🔗 **Production API URL:**  
```
https://lion-fit-iiry.vercel.app
```

### **2️⃣ Deploy Frontend to GitHub Pages**
Push changes to GitHub, then enable **GitHub Pages** in repository settings.

---

## 📊 FatSecret API Usage
### **📍 Search Food Nutrition**
**Endpoint:**  
```
GET /api/nutrition?q=<food_name>
```
**Example Request:**
```
https://lion-fit-iiry.vercel.app/api/nutrition?q=chicken
```
👉 **Returns JSON with calories, protein, fat, and carbs**.

---

## 💡 Future Enhancements
- ✅ **User Authentication** (Login & Save Meal Plans)
- ✅ **Workout Tracking System**
- ✅ **Integration with Wearable Devices**
- ✅ **AI-Powered Meal Suggestions**

---

## 📞 Contact
For feedback or issues, visit the **Contact Us** page or email **support@lionfit.com**.

---

This `README.md` includes **API integration details, deployment steps, and project structure updates**. Let me know if you'd like any modifications! 🚀

