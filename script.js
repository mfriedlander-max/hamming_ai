const buttons = document.querySelectorAll(".cta");

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    if (event.target.matches(".ghost")) {
      document.querySelector("#work").scrollIntoView({ behavior: "smooth" });
    }
  });
});
