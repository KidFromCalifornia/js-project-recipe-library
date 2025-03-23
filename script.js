const BASE_URL = `https://api.spoonacular.com/recipes/`;
const API_KEY = `c73e23ce1ee149baaab903ff81a775fa`;
const fixedCuisines = [
  "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German",
  "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican",
  "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
];

const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10&cuisine=${fixedCuisines.join(',')}&fillIngredients=true&addRecipeInformation=true&sort=random`;

const recipeContainer = document.getElementById("recipe-container");
const filterDropdown = document.getElementById("filterDropdown");
const buttonContainer = document.getElementById("filterButtonsContainer");
const missingRecipe = document.getElementById("missingRecipe");

// Function to select a random recipe
const getRandomRecipe = (recipes) => {
  const randomIndex = Math.floor(Math.random() * recipes.length);
  return recipes[randomIndex];
};

// Fetch recipes
fetch(URL)
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => {
    const recipes = data.results;
    localStorage.setItem("recipes", JSON.stringify(recipes));
    initializePage(recipes);
  })
  .catch(error => {
    alert("OH NO! There is an issue with retrieving new recipes,\nplease try again tomorrow or continue with previous retrieved recipes.\n\n  " + error);
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      const recipes = JSON.parse(storedRecipes);
      initializePage(recipes);
    }
  });

function initializePage(recipes) {
  generateDropdown(filterDropdown, recipes, "filter");
  generateButtons(buttonContainer, recipes, "filter");
  generateDropdown(document.getElementById("sortDropdown"), recipes, "sort");
  generateButtons(document.getElementById("sortButtons"), recipes, "sort");
  document.querySelectorAll("#search, #searchMobile").forEach(input => {
    input.addEventListener("input", () => searchFunction(recipes));
  });
  document.querySelectorAll("#randomRecipeButton, #randomMobile").forEach(button => {
    button.addEventListener("click", () => {
      console.log("Random recipe button clicked");
      const randomRecipe = getRandomRecipe(recipes);
      recipeCards([randomRecipe]);
    });
  });
  recipeCards(recipes);
}

// Get unique filter values
const getUniqueFilter = (recipes) => {
  const uniqueCuisines = new Set();
  recipes.forEach(recipe => {
    (recipe.cuisines || []).forEach(cuisine => uniqueCuisines.add(cuisine));
  });
  return [...uniqueCuisines];
};

// Generate buttons
const generateButtons = (container, recipes, type) => {
  if (!container) return;

  const items = type === "filter" ? getUniqueFilter(recipes) : ["servings", "Popularity", "time"];
  const buttonClass = type === "filter" ? "filter-button" : "sort-button";
  const buttonText = type === "filter" ? "All Cuisines" : "Sort by";

  container.innerHTML = `
    <button value="all" class="${buttonClass}">${buttonText}</button>
    ${items.map(item => `<button value="${item}" class="${buttonClass}">${item}</button>`).join("")}
  `;

  document.querySelectorAll(`.${buttonClass}`).forEach(button => {
    button.addEventListener("click", (event) => type === "filter" ? filterSelect(event, recipes) : sortRecipes(event, recipes));
  });
};

// Generate dropdown
const generateDropdown = (container, recipes, type) => {
  if (!container) return;

  const items = type === "filter" ? getUniqueFilter(recipes) : ["servings", "Popularity", "time"];
  const buttonClass = type === "filter" ? "filter-button" : "sort-button";
  const buttonText = type === "filter" ? "All" : "Sort by";

  container.innerHTML = `
    <li><button value="all" class="${buttonClass}">${buttonText}</button></li>
    ${items.map(item => `<li><button value="${item}" class="${buttonClass}">${item}</button></li>`).join("")}
  `;

  document.querySelectorAll(`.${buttonClass}`).forEach(option => {
    option.addEventListener("click", (event) => type === "filter" ? filterSelect(event, recipes) : sortRecipes(event, recipes));
  });
};

// Render recipe cards
const recipeCards = (recipes) => {
  if (!recipeContainer) return;

  recipeContainer.innerHTML = "";

  recipes.forEach(recipe => {
    const ingredientList = (recipe.extendedIngredients || [])
      .map(ingredient => `<li>${ingredient.original}</li>`)
      .join("");

    const cleanDietsText = (recipe.diets || []).map(diet => diet.charAt(0).toUpperCase() + diet.slice(1)).join(", ");
    const cleancuisinesText = (recipe.cuisines || []).map(cuisine => cuisine.charAt(0).toUpperCase() + cuisine.slice(1)).join(", ");

    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <span></span>
      <p><strong>Cuisine:</strong> ${cleancuisinesText}</p>
      <p><strong>Diet:</strong> ${cleanDietsText}</p>
      <span></span>
      <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
      <p><strong>Servings:</strong> ${recipe.servings}</p>
      <span></span>
      <p><strong>Ingredients:</strong></p>
      <ul class="ingredients-list">${ingredientList}</ul>
      <a href="${recipe.sourceUrl}" target="_blank">Get Recipe</a>
    `;

    recipeContainer.appendChild(recipeCard);
  });
};

// Filter function for cuisine
const filterSelect = (event, recipes) => {
  event.preventDefault();
  const filterValue = event.target.value;

  if (filterValue === "all") {
    recipeCards(recipes);
  } else {
    const filteredRecipes = recipes.filter(recipe => recipe.cuisines.includes(filterValue));
    recipeCards(filteredRecipes);
  }
};

// Sorting function
const sortRecipes = (event, recipes) => {
  event.preventDefault();
  const sortValue = event.target.value;

  let sortedRecipes = [...recipes];

  if (sortValue === "servings") {
    sortedRecipes.sort((a, b) => (a.servings || 0) - (b.servings || 0));
  } else if (sortValue === "Popularity") {
    sortedRecipes.sort((a, b) => (b.aggregateLikes || 0) - (a.aggregateLikes || 0));
  } else if (sortValue === "time") {
    sortedRecipes.sort((a, b) => (a.readyInMinutes || 0) - (b.readyInMinutes || 0));
  }

  recipeCards(sortedRecipes);
};

// Handle dropdown clicks
const dropdowns = document.querySelectorAll(".dropdown");

document.addEventListener("click", (event) => {
  dropdowns.forEach(dropdown => {
    const menu = dropdown.querySelector(".filter-content, .sort-content");
    if (!menu) return;

    if (dropdown.contains(event.target)) {
      event.stopPropagation();
      menu.classList.toggle("show");
      dropdown.classList.toggle("active");
    } else {
      menu.classList.remove("show");
      dropdown.classList.remove("active");
    }
  });
});

// search function
function searchFunction(recipes) {
  if (!recipes) {
    return;
  }
  let query = document.getElementById("search").value.toLowerCase() || document.getElementById("searchMobile").value.toLowerCase();

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(query) ||
    recipe.cuisines.some(cuisine => cuisine.toLowerCase().includes(query)) ||
    recipe.diets.some(diet => diet.toLowerCase().includes(query))
  );

  if (query === "") {
    recipeCards(recipes);
  } else if (filteredRecipes.length === 0) {
    recipeContainer.innerHTML = `<p>No matching recipes found, what else sounds good?</p>`;
  } else {
    recipeCards(filteredRecipes);
  }
}