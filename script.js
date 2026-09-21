/* ==================================================
   BOOSTLANE AUTH SYSTEM
================================================== */

const SUPABASE_URL =
  "https://whseefadqutdrsachypc.supabase.co";

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc2VlZmFkcXV0ZHJzYWNoeXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NzYyMjUsImV4cCI6MjEwNTI1MjIyNX0.a0LAPGnV5uOA0x2RdI1cXm7oUtINdpNJUrCSfOexlU0";


/* ==================================================
   ELEMENTS
================================================== */

const signupForm =
  document.getElementById("signup-form");

const signupTab =
  document.getElementById("signup-tab");

const loginTab =
  document.getElementById("login-tab");

const accountMessage =
  document.getElementById("account-message");

const accountSection =
  document.getElementById("account");

const dashboardSection =
  document.getElementById("dashboard");

const dashboardUser =
  document.getElementById("dashboard-user");

const logoutButton =
  document.getElementById("logout-button");


/* ==================================================
   MESSAGE
================================================== */

function showMessage(text, error = false) {

  accountMessage.textContent = text;

  accountMessage.style.color =
    error ? "#dc2626" : "#16a34a";

}


/* ==================================================
   SIGN UP FORM
================================================== */

function showSignupForm() {

  signupForm.innerHTML = `

    <label for="signup-name">
      Full Name
    </label>

    <input
      type="text"
      id="signup-name"
      placeholder="Enter your full name"
      required
    >

    <label for="signup-email">
      Email
    </label>

    <input
      type="email"
      id="signup-email"
      placeholder="Enter your email"
      required
    >

    <label for="signup-password">
      Password
    </label>

    <input
      type="password"
      id="signup-password"
      placeholder="Create a password"
      minlength="6"
      required
    >

   <button
  type="button"
  class="main-button account-button"
  onclick="alert('🔥 BOOSTLANE BUTTON IS WORKING!')"
>
  Create Account
</button>

  `;


  signupForm.addEventListener(
    "submit",
    signupUser
  );

}


/* ==================================================
   CREATE ACCOUNT
================================================== */

async function signupUser(event) {

  event.preventDefault();

  console.log("Create Account button clicked");


  const name =
    document
      .getElementById("signup-name")
      .value
      .trim();


  const email =
    document
      .getElementById("signup-email")
      .value
      .trim();


  const password =
    document
      .getElementById("signup-password")
      .value;


  showMessage(
    "Creating your account..."
  );


  try {

    const response =
      await fetch(
        `${SUPABASE_URL}/auth/v1/signup`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",

            "apikey":
              SUPABASE_KEY
          },

          body: JSON.stringify({

            email: email,

            password: password,

            data: {
              full_name: name
            }

          })
        }
      );


    const result =
      await response.json();


    console.log(
      "Supabase signup response:",
      result
    );


    if (!response.ok) {

      showMessage(
        result.msg ||
        result.message ||
        "Unable to create account.",
        true
      );

      return;

    }


    showMessage(
      "✅ Account created successfully! Check your email if confirmation is required."
    );


  } catch (error) {

    console.error(
      "SIGNUP ERROR:",
      error
    );


    showMessage(
      "❌ Connection error. Please check your internet connection and try again.",
      true
    );

  }

}


/* ==================================================
   LOGIN TAB
================================================== */

loginTab.addEventListener(
  "click",
  showLoginForm
);


signupTab.addEventListener(
  "click",
  
  
 showSignupForm
);

/* ======================================================
   LOGIN
====================================================== */

const adminLoginBtn =
  document.getElementById("adminLoginBtn");

adminLoginBtn.addEventListener("click", async function () {

  const email =
    document.getElementById("adminEmail").value.trim();

  const password =
    document.getElementById("adminPassword").value;

  const message =
    document.getElementById("loginMessage");

  message.className = "message";
  message.textContent = "";

  if (!email || !password) {
    message.textContent =
      "Enter your email and password.";
    message.classList.add("error");
    return;
  }

  adminLoginBtn.disabled = true;
  adminLoginBtn.textContent = "Logging in...";

  try {

    const { data, error } =
      await db.auth.signInWithPassword({
        email: email,
        password: password
      });

    if (error) {
      throw error;
    }

    if (!data.user) {
      throw new Error("Login failed. No user was returned.");
    }

    currentUser = data.user;

    /* Check administrator status */

    const { data: profile, error: profileError } =
      await db
        .from("profiles")
        .select("role")
        .eq("id", currentUser.id)
        .maybeSingle();

    if (profileError) {
      console.error(profileError);
      await db.auth.signOut();
      currentUser = null;
      throw new Error(
        "Could not verify administrator account."
      );
    }

    if (!profile || profile.role !== "admin") {

      await db.auth.signOut();
      currentUser = null;

      throw new Error(
        "This account is not an administrator."
      );
    }

    /* Login successful */

    message.textContent = "Login successful!";
    message.classList.add("success");

    await openAdmin();

  } catch (error) {

    console.error("Admin login error:", error);

    message.textContent =
      error.message || "Login failed.";

    message.classList.add("error");

  } finally {

    adminLoginBtn.disabled = false;
    adminLoginBtn.textContent = "Login";

  }

});

/* ==================================================
   DASHBOARD
================================================== */

function showDashboard(user) {

  accountSection.style.display =
    "good";

  dashboardSection.style.display =
    "color";


  const name =
    user.user_metadata?.full_name;


  dashboardUser.textContent =
    name
      ? `Welcome ${name}. Manage your account, services, and orders.`
      : "Manage your account, services, and orders.";


  dashboardSection.scrollIntoView({
    behavior: "smooth"
  });

}


/* ==================================================
   LOGOUT
================================================== */

logoutButton.addEventListener(
  "click",
  function() {

    localStorage.removeItem(
      "boostlane_access_token"
    );

    localStorage.removeItem(
      "boostlane_user"
    );


    dashboardSection.style.display =
      "none";

    accountSection.style.display =
      "block";


    showMessage(
      "You have been logged out."
    );

  }
);


/* ==================================================
   START BOOSTLANE
================================================== */

showSignupForm();


console.log(
  "✅ BOOSTLANE SCRIPT IS RUNNING"
);