import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const MEALDB_API_URL = "https://www.themealdb.com/api/json/v1/1/";

// Function to fetch and display recipes for a given cuisine
const fetchCuisineRecipes = async (cuisine, containerId) => {
    const container = document.getElementById(containerId);
    const loadingIndicator = document.getElementById("loading-indicator");

    if (!container) return;

    loadingIndicator.style.display = "block"; // Show loading indicator while fetching
    container.innerHTML = ''; // Clear any existing content

    try {
        // Fetching data from the MealDB API for the given cuisine
        const response = await fetch(`${MEALDB_API_URL}filter.php?a=${cuisine}`);
        const data = await response.json();

        if (data?.meals) {
            const recipesToDisplay = data.meals.slice(0, 9); // Limit to 9 recipes

            console.log(`Fetched ${cuisine} recipes:`, recipesToDisplay.length);

            recipesToDisplay.forEach(recipe => {
                const recipeCard = document.createElement('a');
                recipeCard.className = 'recipe-card';
                recipeCard.href = `Recipes.html?recipeId=${recipe.idMeal}`; // Link to individual recipe page

                const imageUrl = recipe.strMealThumb; // Image URL from the API
                const recipeName = recipe.strMeal; // Recipe name from the API

                // Check if image URL exists and is not empty
                if (imageUrl && imageUrl !== "null") {
                    console.log('Valid Image URL:', imageUrl);
                } else {
                    console.warn('Invalid Image URL:', imageUrl);
                }

                // Create the recipe card content and append to the container
                recipeCard.innerHTML = `
                    <img src="${imageUrl}" alt="${recipeName}" />
                    <p>${recipeName}</p>
                `;

                container.appendChild(recipeCard);
            });
        } else {
            container.innerHTML = `<p>No ${cuisine} recipes found.</p>`;
        }
    } catch (error) {
        console.error(`Error fetching ${cuisine} recipes:`, error);
        container.innerHTML = '<p class="error-message">Failed to load recipes.</p>';
    } finally {
        loadingIndicator.style.display = "none"; // Hide loading indicator after fetching is complete
    }
};

// Function to fetch and display Italian recipes
const fetchItalianRecipes = async () => {
    fetchCuisineRecipes("Italian", "italian-cuisine-container");
};

// Function to fetch and display Mexican recipes
const fetchMexicanRecipes = async () => {
    fetchCuisineRecipes("Mexican", "mexican-cuisine-container");
};

// Function to fetch and display Chinese recipes
const fetchChineseRecipes = async () => {
    fetchCuisineRecipes("Chinese", "chinese-cuisine-container");
};

// Function to fetch and display Indian recipes
const fetchIndianRecipes = async () => {
    fetchCuisineRecipes("Indian", "indian-cuisine-container");
};

// Call the functions to fetch recipes for each cuisine when the page loads
window.onload = () => {
    fetchItalianRecipes();
    fetchMexicanRecipes();
    fetchChineseRecipes();
    fetchIndianRecipes();
};
// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration (replace with your own if changed)
const firebaseConfig = {
  apiKey: "AIzaSyD19Cr8Qbe81F2kz0w8ASACW_hUE1DBrRQ",
  authDomain: "modernkusina-da7a9.firebaseapp.com",
  projectId: "modernkusina-da7a9",
  storageBucket: "modernkusina-da7a9.firebasestorage.app",
  messagingSenderId: "1074529326313",
  appId: "1:1074529326313:web:d26fdae2e8bd77339c4c78",
  measurementId: "G-NLNP9BVB29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: Enable analytics (only works if your site is served over HTTPS and uses a valid domain)
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Export so you can use in other modules if needed
export { auth, db };

