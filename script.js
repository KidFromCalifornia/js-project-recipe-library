const BASE_URL = `https://api.spoonacular.com/recipes/`
const URL = `https://api.spoonacular.com/recipes/random?number=8&apiKey=c73e23ce1ee149baaab903ff81a775fa`;

const recipeContainer = document.getElementById("recipe-container");
const filterDropdown = document.getElementById("filterDropdown");
const buttonContainer = document.getElementById("filterButtonsContainer");

// Fetch recipes
fetch(URL)
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(data => {
    const recipes = data.recipes; // Store recipes

    console.log("Recipe object:", recipes);

    generateFilterButtons(recipes);
    generateFilterDropdown(recipes);
    generateSortButtons(recipes);
    generateSortDropdown(recipes);
    recipeCards(recipes);
  })
  .catch(error => {
    console.error("There has been a problem with your fetch operation:", error);
  });

// Extract unique diets
const getUniqueDiets = (recipes) => [...new Set(recipes.flatMap(recipe => recipe.diets || []))];

// Generate filter buttons
const generateFilterButtons = (recipes) => {
  if (!buttonContainer) return;

  const diets = getUniqueDiets(recipes);
  buttonContainer.innerHTML = `
    <button value="all" class="filter-button">All Diets</button>
    ${diets.map(diet => `<button value="${diet}" class="filter-button">${diet}</button>`).join("")}
  `;

  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", (event) => filterCuisine(event, recipes));
  });
};

// Extract unique cuisines
const getUniquediets = (recipes) => [...new Set(recipes.flatMap(recipe => recipe.cuisines || []))];

// Generate cuisine dropdown
const generateFilterDropdown = (recipes) => {
  if (!filterDropdown) return;

  const diets = getUniqueDiets(recipes);
  filterDropdown.innerHTML = `
   <button value="all" class="filter-button">All Diets</button>
    ${diets.map(diet => `<button value="${diet}" class="filter-button">${diet}</button>`).join("")}
  `;

  document.querySelectorAll(".filter-option").forEach(option => {
    option.addEventListener("click", (event) => filterCuisine(event, recipes));
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
    <li><button value="price" class="sort-button">Sort by Price</button></li>
    <li><button value="time" class="sort-button">Sort by Cooking Time</button></li>
  `;

  document.querySelectorAll(".sort-button").forEach(button => {
    button.addEventListener("click", (event) => sortRecipes(event, recipes));
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

    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <p><strong>Diet:</strong> ${recipe.diets}</p>
      <span></span>
      <p><strong>Price per serving:</strong> $${recipe.pricePerServing}</p>
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
const filterCuisine = (event, recipes) => {
  const filterValue = event.target.value;
  event.preventDefault();

  if (filterValue === "all") {
    recipeCards(recipes);
  } else {
    const filteredRecipes = recipes.filter(recipe => recipe.diets.includes(filterValue));
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
const dropdowns = document.querySelectorAll(".sort-content, .filter-content");
document.addEventListener("click", event => {
  dropdowns.forEach(dropdown => {
    const menu = dropdown.nextElementSibling;
    if (dropdown.contains(event.target)) {
      event.stopPropagation();
      menu.classList.toggle("show");
      dropdown.classList.toggle("active");
    } else if (!menu.contains(event.target)) {
      menu.classList.remove("show");
      dropdown.classList.remove("active");
    }
  });
});