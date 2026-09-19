// Boostlane account interface

const signupForm = document.getElementById("signup-form");
const accountTabs = document.querySelectorAll(".account-tab");
const accountMessage = document.getElementById("account-message");

accountTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {

    accountTabs.forEach(item => {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    if (index === 0) {
      showSignupForm();
    } else {
      showLoginForm();
    }
  });
});

function showSignupForm() {
  signupForm.innerHTML = `
    <label for="signup-name">Full Name</label>
    <input
      type="text"
      id="signup-name"
      placeholder="Enter your full name"
      required
    >

    <label for="signup-email">Email</label>
    <input
      type="email"
      id="signup-email"
      placeholder="Enter your email"
      required
    >

    <label for="signup-password">Password</label>
    <input
      type="password"
      id="signup-password"
      placeholder="Create a password"
      required
    >

    <button type="submit" class="main-button account-button">
      Create Account
    </button>
  `;

  signupForm.onsubmit = function(event) {
    event.preventDefault();

    accountMessage.textContent =
      "Your account form is ready. Backend connection is the next step.";
  };
}

function showLoginForm() {
  signupForm.innerHTML = `
    <label for="login-email">Email</label>
    <input
      type="email"
      id="login-email"
      placeholder="Enter your email"
      required
    >

    <label for="login-password">Password</label>
    <input
      type="password"
      id="login-password"
      placeholder="Enter your password"
      required
    >

    <button type="submit" class="main-button account-button">
      Login
    </button>
  `;

  signupForm.onsubmit = function(event) {
    event.preventDefault();

    accountMessage.textContent =
      "Login form is ready. Backend connection is the next step.";
  };
};