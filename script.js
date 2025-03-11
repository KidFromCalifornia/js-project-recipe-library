const BASE_URL = `https://api.spoonacular.com/recipes`
const URL = `https://api.spoonacular.com/recipes/random?number=8&apiKey=c73e23ce1ee149baaab903ff81a775fa`;
const responseDiv = document.querySelector(".response");
const recipeContainer = document.getElementById('recipe-container');
const filterDropdown = document.getElementById('filterDropdown');
const buttonContainer = document.getElementById('filterButtonsContainer');

// Fetch recipes
fetch(URL)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(data => {
    const recipes = data.recipes; // Store recipes

    console.log('Recipe object:', recipes);

    generateCuisineButtons(recipes);
    generateCuisineDropdown(recipes);
    generateSortButtons();
    SortDropdown();
    recipeCards(recipes);
  })
  .catch(error => console.error('Error fetching data:', error));

// Extract unique cuisines from recipes
const getUniqueCuisines = (recipes) => {
  return [...new Set(recipes.flatMap(recipe => recipe.cuisines || []))];
};

// Generate cuisine buttons
const generateCuisineButtons = (recipes) => {
  const cuisines = getUniqueCuisines(recipes);
  buttonContainer.innerHTML = `<button value="all" class="filter-button">All Cuisines</button>` +
    cuisines.map(cuisine => `<button value="${cuisine}" class="filter-button">${cuisine}</button>`).join("");

  document.querySelectorAll(".filter-button").forEach(button => {
    button.addEventListener("click", (event) => filterCuisine(event, recipes));
  });
};

// Generate cuisine dropdown
const generateCuisineDropdown = (recipes) => {
  const cuisines = getUniqueCuisines(recipes);
  filterDropdown.innerHTML = `<li><button class="filter-option" value="all">All Cuisines</button></li>` +
    cuisines.map(cuisine => `<li><button value="${cuisine}" class="filter-option">${cuisine}</button></li>`).join("");

  document.querySelectorAll(".filter-option").forEach(option => {
    option.addEventListener("click", (event) => filterCuisine(event, recipes));
  });
};

// Generate sort buttons
const generateSortButtons = () => {
  const sortContainer = document.getElementById('sortButtonsContainer');
  sortContainer.innerHTML = `
    <button value="popularity" class="sort-button">Sort by Popularity</button>
    <button value="price" class="sort-button">Sort by Price</button>
    <button value="time" class="sort-button">Sort by Cooking Time</button>
  `;

  document.querySelectorAll(".sort-button").forEach(button => {
    button.addEventListener("click", (event) => sortRecipes(event));
  });
};

// Generate sort dropdown
const SortDropdown = () => {
  const sortContainer = document.getElementById('sortDropdown');
  sortContainer.innerHTML = `
    <li><button value="popularity" class="sort-button">Sort by Popularity</button></li>
    <li><button value="price" class="sort-button">Sort by Price</button></li>
    <li><button value="time" class="sort-button">Sort by Cooking Time</button></li>
  `;

  document.querySelectorAll(".sort-button").forEach(button => {
    button.addEventListener("click", (event) => sortRecipes(event));
  });
};

// Render recipe cards
const recipeCards = (recipes) => {
  recipeContainer.innerHTML = '';

  recipes.forEach(recipe => {
    const ingredientList = (recipe.extendedIngredients || [])
      .map(ingredient => `<li>${ingredient.original}</li>`)
      .join("");


    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");

    recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <p><strong>Cuisine:</strong> ${recipe.cuisines.length}</p>
        <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Ingredients:</strong></p>
        <ul class="ingredients-list">${ingredientList}</ul>
        <a href="${recipe.sourceUrl}" target="_blank">Get Recipe</a>)
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
    const filteredRecipes = recipes.filter(recipe => recipe.cuisines.includes(filterValue));
    recipeCards(filteredRecipes);
  }
};

// Sorting function
const sortRecipes = (event) => {
  event.preventDefault();
  const sortValue = event.target.value;

  let sortedRecipes = [...document.recipes];

  if (sortValue === "popularity") {
    sortedRecipes.sort((a, b) => (b.aggregateLikes || 0) - (a.aggregateLikes || 0));
  } else if (sortValue === "price") {
    sortedRecipes.sort((a, b) => (a.pricePerServing || 0) - (b.pricePerServing || 0));
  } else if (sortValue === "time") {
    sortedRecipes.sort((a, b) => (a.readyInMinutes || 0) - (b.readyInMinutes || 0));
  }

  recipeCards(sortedRecipes);
};
