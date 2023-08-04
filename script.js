function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

document.addEventListener('DOMContentLoaded', function () {
  const descriptionElement = document.getElementById('description');
  const descriptionText =
    "A passionate web developer with a love for Django and building scalable applications. Let's connect and collaborate!";
  let index = 0;

  function type() {
    descriptionElement.textContent += descriptionText[index];
    index++;
    if (index < descriptionText.length) {
      setTimeout(type, 100); // Typing speed (adjust if needed)
    }
  }

  setTimeout(type, 1000); // Delay before typing starts (adjust if needed)
});