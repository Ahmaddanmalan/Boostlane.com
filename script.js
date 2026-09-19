const SUPABASE_URL = "https://whseefadqutdrsachypc.supabase.co";

const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc2VlZmFkcXV0ZHJzYWNoeXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NzYyMjUsImV4cCI6MjEwNTI1MjIyNX0.a0LAPGnV5uOA0x2RdI1cXm7oUtINdpNJUrCSfOexlU0";

const supabase = window.supabase.createClient(

  SUPABASE_URL,

  SUPABASE_KEY

);
const SUPABASE_URL = "https://whseefadqutdrsachypc.supabase.co";
const SUPABASE_KEY = "PASTE_YOUR_ANON_KEY_HERE";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

const signupForm = document.getElementById("signup-form");
const accountTabs = document.querySelectorAll(".account-tab");
const accountMessage = document.getElementById("account-message");

function message(text, error = false) {
  accountMessage.textContent = text;
  accountMessage.style.color = error ? "#dc2626" : "#16a34a";
}

accountTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    accountTabs.forEach(item => item.classList.remove("active"));
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
    <input id="signup-name" type="text"
      placeholder="Enter your full name" required>

    <label for="signup-email">Email</label>
    <input id="signup-email" type="email"
      placeholder="Enter your email" required>

    <label for="signup-password">Password</label>
    <input id="signup-password" type="password"
      placeholder="Create a password" required>

    <button type="submit" class="main-button account-button">
      Create Account
    </button>
  `;

  signupForm.onsubmit = async (event) => {
    event.preventDefault();

    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value;

    message("Creating your account...");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name
        }
      }
    });

    if (error) {
      message(error.message, true);
      return;
    }

    if (data.user) {
      message(
        "Account created successfully! Check your email if confirmation is required."
      );
    }
  };
}

function showLoginForm() {
  signupForm.innerHTML = `
    <label for="login-email">Email</label>
    <input id="login-email" type="email"
      placeholder="Enter your email" required>

    <label for="login-password">Password</label>
    <input id="login-password" type="password"
      placeholder="Enter your password" required>

    <button type="submit" class="main-button account-button">
      Login
    </button>
  `;

  signupForm.onsubmit = async (event) => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    message("Logging you in...");

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      message(error.message, true);
      return;
    }

    if (data.user) {
      message("Login successful! Welcome to Boostlane.");
    }
  };
}

showSignupForm();