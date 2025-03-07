
// recipes //

const recipes = [
  {
    id: 1,
    title: "Vegan Lentil Soup",
    image: `https://picsum.photos/seed/lentils/300/200`,
    readyInMinutes: 30,
    servings: 4,
    sourceUrl: "https://example.com/vegan-lentil-soup",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
      "red lentils",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "cumin",
      "paprika",
      "vegetable broth",
      "olive oil",
      "salt"
    ],
    pricePerServing: 2.5,
    popularity: 85
  },
  {
    id: 2,
    title: "Vegetarian Pesto Pasta",
    image: `https://picsum.photos/seed/pasta/300/200`,
    readyInMinutes: 25,
    servings: 2,
    sourceUrl: "",
    diets: ["vegetarian"],
    cuisine: "Italian",
    ingredients: [
      "pasta",
      "basil",
      "parmesan cheese",
      "garlic",
      "pine nuts",
      "olive oil",
      "salt",
      "black pepper"
    ],
    pricePerServing: 3.0,
    popularity: 92
  },
  {
    id: 3,
    title: "Gluten-Free Chicken Stir-Fry",
    image: `https://picsum.photos/seed/chicken/300/200`,
    readyInMinutes: 25,
    servings: 3,
    sourceUrl: "https://example.com/gluten-free-chicken-stir-fry",
    diets: ["gluten-free"],
    cuisine: "Asian",
    ingredients: [
      "chicken breast",
      "broccoli",
      "bell pepper",
      "carrot",
      "soy sauce (gluten-free)",
      "ginger",
      "garlic",
      "sesame oil",
      "cornstarch",
      "green onion",
      "sesame seeds",
      "rice"
    ],
    pricePerServing: 4.0,
    popularity: 78
  },
  {
    id: 4,
    title: "Dairy-Free Tacos",
    image: `https://picsum.photos/seed/tacos/300/200`,
    readyInMinutes: 15,
    servings: 2,
    sourceUrl: "https://example.com/dairy-free-tacos",
    diets: ["dairy-free"],
    cuisine: "Mexican",
    ingredients: [
      "corn tortillas",
      "ground beef",
      "taco seasoning",
      "lettuce",
      "tomato",
      "avocado"
    ],
    pricePerServing: 2.8,
    popularity: 88
  },
  {
    id: 5,
    title: "Middle Eastern Hummus",
    image: `https://picsum.photos/seed/hummus/300/200`,
    readyInMinutes: 10,
    servings: 4,
    sourceUrl: "https://example.com/middle-eastern-hummus",
    diets: ["vegan", "gluten-free"],
    cuisine: "Middle Eastern",
    ingredients: [
      "chickpeas",
      "tahini",
      "garlic",
      "lemon juice",
      "olive oil"
    ],
    pricePerServing: 1.5,
    popularity: 95
  },
  {
    id: 6,
    title: "Quick Avocado Toast",
    image: "https://picsum.photos/300/200?random",
    readyInMinutes: 5,
    servings: 1,
    sourceUrl: "https://picsum.photos/200/300",
    diets: ["vegan"],
    cuisine: "Mediterranean",
    ingredients: [
      "bread",
      "avocado",
      "lemon juice",
      "salt"
    ],
    pricePerServing: 2.0,
    popularity: 90
  },
  {
    id: 7,
    title: "Beef Stew",
    image: `https://picsum.photos/seed/beef/300/200`,
    readyInMinutes: 90,
    servings: 5,
    sourceUrl: "https://example.com/beef-stew",
    diets: [],
    cuisine: "European",
    ingredients: [
      "beef chunks",
      "potatoes",
      "carrots",
      "onion",
      "garlic",
      "tomato paste",
      "beef broth",
      "red wine",
      "bay leaves",
      "thyme",
      "salt",
      "black pepper",
      "butter",
      "flour",
      "celery",
      "mushrooms"
    ],
    pricePerServing: 5.5,
    popularity: 80
  },
  {
    id: 8,
    title: "Sweet Potato Buddha Bowl",
    image: `https://picsum.photos/seed/sweet-potato/300/200`,
    readyInMinutes: 35,
    servings: 4,
    sourceUrl: "https://example.com/sweet-potato-buddha-bowl",
    diets: ["vegan", "gluten-free"],
    cuisine: "Fusion",
    ingredients: [
      "sweet potatoes",
      "chickpeas",
      "avocado",
      "spinach",
      "quinoa",
      "lemon tahini dressing",
      "olive oil",
      "garlic",
      "turmeric",
      "cumin",
      "salt"
    ],
    pricePerServing: 4.2,
    popularity: 88
  },
  {
    id: 9,
    title: "Mushroom Risotto",
    image: `https://picsum.photos/seed/mushroom/300/200`,
    readyInMinutes: 40,
    servings: 3,
    sourceUrl: "https://example.com/mushroom-risotto",
    diets: ["vegetarian"],
    cuisine: "Italian",
    ingredients: [
      "arborio rice",
      "mushrooms",
      "vegetable broth",
      "onion",
      "garlic",
      "parmesan cheese",
      "white wine",
      "olive oil",
      "butter",
      "salt",
      "black pepper"
    ],
    pricePerServing: 4.5,
    popularity: 90
  },
  {
    id: 10,
    title: "Spicy Tofu Stir-Fry",
    image: `https://picsum.photos/seed/stir-fry/300/200`,
    readyInMinutes: 25,
    servings: 4,
    sourceUrl: "https://example.com/spicy-tofu-stirfry",
    diets: ["vegan", "gluten-free"],
    cuisine: "Asian",
    ingredients: [
      "tofu",
      "broccoli",
      "carrot",
      "bell pepper",
      "soy sauce (gluten-free)",
      "sriracha",
      "garlic",
      "ginger",
      "sesame oil",
      "green onion",
      "sesame seeds",
      "rice"
    ],
    pricePerServing: 3.8,
    popularity: 85
  },
  {
    id: 11,
    title: "Zucchini Noodles with Pesto",
    image: `https://picsum.photos/seed/n/300/200`,
    readyInMinutes: 20,
    servings: 2,
    sourceUrl: "https://picsum.photos/300/200/seed/{3}/",
    diets: ["vegetarian", "gluten-free"],
    cuisine: "Italian",
    ingredients: [
      "zucchini",
      "basil pesto",
      "parmesan cheese",
      "cherry tomatoes",
      "olive oil",
      "garlic",
      "pine nuts",
      "lemon juice",
      "black pepper"
    ],
    pricePerServing: 3.5,
    popularity: 92
  },
  {
    id: 12,
    title: "Chicken and Vegetable Skewers",
    image: `https://picsum.photos/seed/veg/300/200`,
    readyInMinutes: 25,
    servings: 4,
    sourceUrl: "https://example.com/chicken-vegetable-skewers",
    diets: ["gluten-free"],
    cuisine: "Mediterranean",
    ingredients: [
      "chicken breast",
      "red bell pepper",
      "zucchini",
      "onion",
      "olive oil",
      "lemon juice",
      "garlic",
      "oregano",
      "salt",
      "black pepper"
    ],
    pricePerServing: 4.0,
    popularity: 89
  },
  {
    id: 13,
    title: "Vegan Chocolate Avocado Mousse",
    image: `https://picsum.photos/seed/avo/300/200`,
    readyInMinutes: 10,
    servings: 2,
    sourceUrl: "https://example.com/vegan-chocolate-avocado-mousse",
    diets: ["vegan", "gluten-free"],
    cuisine: "Dessert",
    ingredients: [
      "avocado",
      "cocoa powder",
      "maple syrup",
      "vanilla extract",
      "almond milk",
      "salt"
    ],
    pricePerServing: 3.0,
    popularity: 87
  }
];



const buttons = document.querySelectorAll(".button-filter, .button-sort");
const responseDiv = document.querySelector(".response");
const dropdowns = document.querySelectorAll(".dropbtn");


// Handle dropdown clicks
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

// Update response text on button click
buttons.forEach(button =>
  button.addEventListener("click", event => {
    event.preventDefault();
    responseDiv.textContent = `You selected: ${event.target.textContent}`;
  })
);

// Handle list item clicks inside dropdowns
document.querySelectorAll(".selectors").forEach(item => {
  item.addEventListener("click", event => {
    event.preventDefault();
    responseDiv.textContent = `You selected: ${event.target.textContent}`;
  });
});

const cuisines = [...new Set(recipes.map(recipe => recipe.cuisine))];

// filter button fuction 

const generateCuisineButtons = () => {
  const buttonContainer = document.getElementById('filterButtonsContainer');

  // Generate buttons as an HTML string
  let buttonsHTML = cuisines
    .map(cuisine => `<button 
      value="${cuisine}" class="filter-button">${cuisine}</button>`)
    .join("");

  buttonsHTML = `<button value="all" class="filter-button">All Cuisines</button>` + buttonsHTML;

  // Inject into the container
  buttonContainer.innerHTML = buttonsHTML;
};

generateCuisineButtons();


const generateCuisineDropdown = () => {
  const dropdownContainer = document.getElementById('filterDropdown');

  // Generate the dropdown options as an HTML string
  let optionsHTML = cuisines
    .map(cuisine => `<li><button value="${cuisine}" class="filter-option" >${cuisine}</button></li>`)
    .join("");

  // Add the "All Cuisines" option at the top
  optionsHTML = `<li><Button class="filter-option" data-cuisine="all">All Cuisines</button</li>` + optionsHTML;

  // Inject the options into the dropdown
  dropdownContainer.innerHTML = optionsHTML;

};
generateCuisineDropdown();

// Function to render recipe cards
const recipeCards = () => {
  const recipeContainer = document.getElementById('recipe-container');

  recipeContainer.innerHTML = ``

  //code for single HTML injection
  const recipeCardsHTML = recipes.map(recipe => {
    const ingredientList = recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join("");

    return `
      <div class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.title}">
        <h3>${recipe.title}</h3>
        <span></span>
        <p><strong>Cuisine:</strong> ${recipe.cuisine}</p>
        <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
        <span></span>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Price per Serving:</strong> $${recipe.pricePerServing}</p>
        <p><strong>Ingredients:</strong></p>
        <ul class="ingredients-list">${ingredientList}</ul>
        <p><strong>Popularity:</strong> ${recipe.popularity}%</p>
        <a href="${recipe.sourceUrl}" target="_blank">Get Recipe</a>
      </div>
    `;
  }).join("");

  // Inject all recipe cards at once
  recipeContainer.innerHTML = recipeCardsHTML;
};

// Call the function to generate recipe cards
recipeCards();

const recipeContainer = (value) => {

  const recipeContainer = recipe.filter(recipe => recipe.cuisine === value)
  console.log(' these are the cusines', recipeContainer)
}


