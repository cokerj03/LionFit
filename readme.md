# LionFit

LionFit is a modern health and fitness web application designed to empower users on their journey to a healthier lifestyle. The site features personalized nutrition insights, expert meal planning, and fitness resources—all accessible through a clean, modern interface with multiple pages.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation & Development](#installation--development)
- [Deployment Considerations](#deployment-considerations)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

## Overview

LionFit provides:
- **About Information:** Learn about LionFit’s mission, services, and team on the Home page.
- **Meal Planner:** Get personalized meal planning recommendations via nutrition search and AI-enhanced suggestions.
- **Blog:** Read comprehensive guides on nutrition and meal planning.
- **Workout & Merch:** Explore upcoming workout programs and merchandise (both pages currently display “Coming Soon”).
- **Contact:** Get in touch through a dedicated contact form.

## Features

- **Multi-Page Navigation:**  
  - **Home (About):** Overview of LionFit’s mission and offerings.
  - **Meal Planner:** Nutrition search functionality integrated with external API endpoints.
  - **Blog:** In-depth articles and guides.
  - **Workout & Merch:** Upcoming content pages (Coming Soon).
  - **Contact:** A fully styled contact form.

- **API Integration:**  
  - Connects to external nutrition APIs (e.g., Nutritionix) for meal recommendations.  
  - **Note:** The current API endpoint is set to `localhost:3000` for local development. When deploying to GitHub Pages (which supports static sites only), you must deploy your serverless functions (using Vercel, Netlify, etc.) and update your API endpoint URLs in the code.

- **Responsive & Modern Design:**  
  - Centered header with logo and navigation.
  - Clean, dark-themed design with white text and consistent styling across pages.

## Technology Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend (API/Serverless Functions):** Node.js (deployed on a platform that supports serverless functions, e.g., Vercel/Netlify)
- **Deployment:**  
  - **Static Site:** GitHub Pages for hosting static HTML, CSS, and client-side JavaScript.
  - **API Endpoints:** Must be hosted separately on a backend platform (GitHub Pages does not support serverless functions).

## Project Structure

LionFit/ ├── public/ │ ├── index.html // Home/About page │ ├── mealplanner.html // Meal Planner page with nutrition search │ ├── blog.html // Blog page with detailed nutrition guides │ ├── workout.html // Workout page (Coming Soon) │ ├── merch.html // Merch page (Coming Soon) │ ├── contact.html // Contact page with form │ ├── lionFitLogo.png // Logo file │ └── style.css // Global styling for the site ├── api/ │ ├── nutrition.js // Serverless function for Nutritionix API (to be deployed on a backend platform) │ └── other-api.js // Additional API functions (if needed) ├── app.js // Client-side JavaScript (handles API calls, etc.) └── README.md // Project documentation