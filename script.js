const buttons = document.querySelectorAll(".button-filter, .button-sort");
const responseDiv = document.querySelector(".response");
const dropdowns = document.querySelectorAll(".dropbtn");
const options = document.querySelectorAll(".selectors li");
const removeDrop = document.querySelector('.filter-content, .sort-content');

document.addEventListener("click", event => {
  dropdowns.forEach(dropdown => {
    const menu = dropdown.nextElementSibling;
    if (!dropdown.contains(event.target) && !menu.contains(event.target)) {
      menu.classList.remove("show");
      dropdown.classList.remove("active");
      removeDrop.classList.remove("active");
    }
  });
});

buttons.forEach(button =>
  button.addEventListener("click", event => {
    event.preventDefault(); // Prevent form submission
    responseDiv.textContent = `You clicked: ${event.target.textContent}`;
  })
);

dropdowns.forEach(dropdown =>
  dropdown.addEventListener("click", event => {
    event.stopPropagation(); // Prevent document click from closing immediately
    dropdown.nextElementSibling.classList.toggle("show");
    dropdown.classList.toggle("active");
  })
);

options.forEach(option =>
  option.addEventListener("click", event => {
    responseDiv.textContent = `You selected: ${event.target.textContent}`;
  })
);
