const BASE_URL = `https://api.spoonacular.com/recipes/`;
const API_KEY = `c73e23ce1ee149baaab903ff81a775fa`;
const fixedCuisines = [
  "African", "Asian", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German",
  "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican",
  "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese"
];



const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=50&cuisine=${fixedCuisines.join(',')}&fillIngredients=true&addRecipeInformation=true&sort=random`;

console.log(URL);

const recipeContainer = document.getElementById("recipe-container");
const filterDropdown = document.getElementById("filterDropdown");
const buttonContainer = document.getElementById("filterButtonsContainer");
const missingRecipe = document.getElementById("missingRecipe");

// Fetch recipes
fetch(URL)
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => {
    const recipes = data.results;
    localStorage.setItem("recipes", JSON.stringify(recipes));
    console.log("Recipes fetched and stored in localStorage:", recipes);
    initializePage(recipes);
  })
  .catch(error => {
    alert("There has been a problem with your fetch operation:", error);
    const storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
      const recipes = JSON.parse(storedRecipes);
      console.log("Using stored recipes from localStorage:", recipes);
      initializePage(recipes);
    }
  });

function initializePage(recipes) {
  generateFilterDropdown(recipes);
  generateFilterButtons(recipes);
  generateSortDropdown(recipes);
  generateSortButtons(recipes);
  document.getElementById("search").addEventListener("input", () => searchFunction(recipes));
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

// Generate filter buttons
const generateFilterButtons = (recipes) => {
  if (!buttonContainer) return;

  const cuisines = getUniqueFilter(recipes);
  buttonContainer.innerHTML = `
    <button value="all" class="filter-button">All Cuisines</button>
    ${cuisines.map(cuisine => `<button value="${cuisine}" class="filter-button">${cuisine}</button>`).join("")}
  `;

  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", (event) => filterSelect(event, recipes));
  });
};

// Generate cuisine dropdown
const generateFilterDropdown = (recipes) => {
  if (!filterDropdown) return;

  const cuisines = getUniqueFilter(recipes);
  filterDropdown.innerHTML = `
    <li><button value="all" class="filter-button">All Cuisines</button></li>
    ${cuisines.map(cuisine => `<li><button value="${cuisine}" class="filter-button">${cuisine}</button></li>`).join("")}
  `;

  document.querySelectorAll(".filter-button").forEach(option => {
    option.addEventListener("click", (event) => filterSelect(event, recipes));
  });
};

// Generate sort buttons
const generateSortButtons = (recipes) => {
  const sortContainer = document.getElementById("sortButtons");
  if (!sortContainer) return;

  sortContainer.innerHTML = `
    <button value="popularity" class="sort-button">Sort by Popularity</button>
    <button value="price" class="sort-button">Sort by Price</button>
    <button value="time" class="sort-button">Sort by Cooking Time</button>
  `;

  document.querySelectorAll(".sort-button").forEach(button => {
    button.addEventListener("click", (event) => sortRecipes(event, recipes));
  });
};

// Generate sort dropdown
const generateSortDropdown = (recipes) => {
  const sortContainer = document.getElementById("sortDropdown");
  if (!sortContainer) return;

  sortContainer.innerHTML = `
    <li><button value="popularity" class="sort-button">Sort by Popularity</button></li>
    <li><button value="price" class="sort-button">Sort by Price</li>
    <li><button value="time" class="sort-button">Sort by Cooking Time</button></li>
  `;

  document.querySelectorAll(".sort-button").forEach(button => {
    button.addEventListener("click", (event) => sortRecipes(event, recipes));
  });
};
// seach function


// Render recipe cards
const recipeCards = (recipes) => {
  if (!recipeContainer) return;

  recipeContainer.innerHTML = "";

  recipes.forEach(recipe => {


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
      <ul class="ingredients-list">${(recipe.extendedIngredients || []).map(ingredient => `<li>${ingredient.original}</li>`).join("")}</ul>
      <a href="${recipe.sourceUrl}" target="_blank">Get Recipe</a>
    `;

    recipeContainer.appendChild(recipeCard);
  });
  console.log(recipes);
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

  if (sortValue === "popularity") {
    sortedRecipes.sort((a, b) => (b.aggregateLikes || 0) - (a.aggregateLikes || 0));
  } else if (sortValue === "price") {
    sortedRecipes.sort((a, b) => (a.pricePerServing || 0) - (b.pricePerServing || 0));
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
function searchFunction(recipes) {
  if (!recipes) {
    return;
  }
  let query = document.getElementById("search").value.toLowerCase();

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
