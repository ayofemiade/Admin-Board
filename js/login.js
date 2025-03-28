document.getElementById("login-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");

  // Simple mock authentication (replace with real authentication)
  if (email === "admin" && password === "password123") {
    // Successful login
    window.location.href = "admin.html";
  } else if (email === "staff" && password === "password123") {
    // Successful login
    window.location.href = "staff-dashboard.html";
  } else if (email === "student" && password === "password123") {
    // Successful login
    window.location.href = "student-dashboard.html";
  } else {
    // Failed login
    errorMessage.textContent = "Invalid email or password";
  }
});

const loginAs = document.querySelector(".login-as");
const dropdownMenu = document.querySelector(".hidden");

function revealDropdown() {
  if (dropdownMenu.classList.contains("hidden")) {
    dropdownMenu.classList.remove("hidden");

    document.querySelector("ul").addEventListener("click", function (e) {
      const currentVal = e.target.getAttribute("id");
      const span = document.querySelector("#loginAs");

      span.innerText = currentVal;
    });
  } else {
    dropdownMenu.classList.add("hidden");
  }
}

loginAs.addEventListener("click", revealDropdown);
