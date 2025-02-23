# LionFit

LionFit is a modern health and fitness web application that helps users search for nutritional information and receive personalized meal recommendations. The app integrates with the Nutritionix and Edamam Meal Planner APIs and features AI-enhanced smart recommendations, serverless API handling, and performance optimization.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [License](#license)
- [Contact](#contact)

## Overview

LionFit is designed to empower users to make healthier food choices by providing detailed nutritional data and smart meal planning recommendations. The application emphasizes performance, security, and an intuitive user interface, featuring a sleek black background with white text and the LionFit logo displayed at the top left.

## Features

- **AI-Enhanced Recommendations:**  
  Utilize AI-powered search and smart meal suggestions based on user input. This can later be expanded to include features such as a chatbot or NLP-based responses.
  
- **Serverless Functions:**  
  API calls are managed by serverless functions (e.g., on Vercel or Netlify), ensuring scalable and secure data handling.
  
- **Performance Optimization:**  
  The app incorporates lazy loading, code splitting, and compression techniques to achieve high performance (targeting 90+ on Google Lighthouse).
  
- **Security & Best Practices:**  
  Implementations include secure API calls, input validation, and user authentication (using JWT, Firebase Auth, or a custom solution).

## Technology Stack

- **Frontend:**  
  HTML, CSS, JavaScript (or frameworks like React)
  
- **Backend:**  
  Serverless functions (Node.js) deployed on platforms such as Vercel, Netlify, or Firebase
  
- **APIs:**  
  - **Nutritionix API** (API key: `00b81cef`)
  - **Edamam Meal Planner API** (API key: `bb67a30b4ec2d751721fdf6b8f59a2c2`)

## Project Structure

