/* ==================================================
   BOOSTLANE SUPABASE CONFIGURATION
================================================== */

const SUPABASE_URL =
  "https://whseefadqutdrsachypc.supabase.co";


/*
   IMPORTANT:

   Replace ONLY the text below with your
   Supabase LEGACY ANON KEY.

   Do NOT use the service_role key.
*/

const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indoc2VlZmFkcXV0ZHJzYWNoeXBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk2NzYyMjUsImV4cCI6MjEwNTI1MjIyNX0.a0LAPGnV5uOA0x2RdI1cXm7oUtINdpNJUrCSfOexlU0";


/* ==================================================
   START SUPABASE
================================================== */

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);


/* ==================================================
   GET HTML ELEMENTS
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

const servicesButton =
  document.getElementById("services-button");

const ordersButton =
  document.getElementById("orders-button");

const dashboardMessage =
  document.getElementById("dashboard-message");


/* ==================================================
   SHOW MESSAGE
================================================== */

function showMessage(text, error = false) {

  accountMessage.textContent = text;

  accountMessage.style.color =
    error ? "#dc2626" : "#16a34a";
}


/* ==================================================
   SIGN UP TAB
================================================== */

signupTab.addEventListener("click", function () {

  signupTab.classList.add("active");

  loginTab.classList.remove("active");

  showSignupForm();

});


/* ==================================================
   LOGIN TAB
================================================== */

loginTab.addEventListener("click", function () {

  loginTab.classList.add("active");

  signupTab.classList.remove("active");

  showLoginForm();

});


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
      type="submit"
      class="main-button account-button"
    >
      Create Account
    </button>

  `;


  signupForm.onsubmit =
    async function (event) {

      event.preventDefault();


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


      const { data, error } =
        await supabase.auth.signUp({

          email: email,

          password: password,

          options: {

            data: {

              full_name: name

            }

          }

        });


      if (error) {

        showMessage(
          error.message,
          true
        );

        return;

      }


      /*
        If email confirmation is enabled,
        Supabase may not log the user in
        until they confirm their email.
      */

      if (data.user) {

        showMessage(
          "Account created successfully! Check your email if confirmation is required."
        );

      }

    };

}


/* ==================================================
   LOGIN FORM
================================================== */

function showLoginForm() {

  signupForm.innerHTML = `

    <label for="login-email">
      Email
    </label>

    <input
      type="email"
      id="login-email"
      placeholder="Enter your email"
      required
    >


    <label for="login-password">
      Password
    </label>

    <input
      type="password"
      id="login-password"
      placeholder="Enter your password"
      required
    >


    <button
      type="submit"
      class="main-button account-button"
    >
      Login
    </button>

  `;


  signupForm.onsubmit =
    async function (event) {

      event.preventDefault();


      const email =
        document
          .getElementById("login-email")
          .value
          .trim();


      const password =
        document
          .getElementById("login-password")
          .value;


      showMessage(
        "Logging you in..."
      );


      const { data, error } =
        await supabase.auth.signInWithPassword({

          email: email,

          password: password

        });


      if (error) {

        showMessage(
          error.message,
          true
        );

        return;

      }


      if (data.user) {

        showMessage(
          "Login successful!"
        );

        showDashboard(
          data.user
        );

      }

    };

}


/* ==================================================
   SHOW DASHBOARD
================================================== */

function showDashboard(user) {

  accountSection.style.display =
    "none";

  dashboardSection.style.display =
    "block";


  const name =
    user.user_metadata?.full_name;


  if (name) {

    dashboardUser.textContent =
      `Welcome ${name}. Manage your account, services, and orders.`;

  } else {

    dashboardUser.textContent =
      "Manage your account, services, and orders.";

  }


  dashboardSection.scrollIntoView({
    behavior: "smooth"
  });

}


/* ==================================================
   LOGOUT
================================================== */

logoutButton.addEventListener(
  "click",
  async function () {

    const { error } =
      await supabase.auth.signOut();


    if (error) {

      alert(error.message);

      return;

    }


    dashboardSection.style.display =
      "none";

    accountSection.style.display =
      "block";


    accountSection.scrollIntoView({
      behavior: "smooth"
    });


    showMessage(
      "You have been logged out."
    );

  }
);


/* ==================================================
   VIEW SERVICES
================================================== */

servicesButton.addEventListener(
  "click",
  function () {

    dashboardMessage.textContent =
      "Our service ordering system will appear here next. 🚀";

  }
);


/* ==================================================
   MY ORDERS
================================================== */

ordersButton.addEventListener(
  "click",
  async function () {

    const {
      data: {
        user
      }
    } =
      await supabase.auth.getUser();


    if (!user) {

      dashboardMessage.textContent =
        "Please login again.";

      return;

    }


    const {
      data,
      error
    } =
      await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (error) {

      dashboardMessage.textContent =
        "Unable to load your orders yet.";

      console.error(error);

      return;

    }


    if (!data || data.length === 0) {

      dashboardMessage.textContent =
        "You don't have any orders yet.";

      return;

    }


    dashboardMessage.innerHTML =
      `<strong>You have ${data.length} order(s).</strong>`;

  }
);


/* ==================================================
   CHECK CURRENT LOGIN SESSION
================================================== */

async function checkUser() {

  const {
    data: {
      session
    }
  } =
    await supabase.auth.getSession();


  if (session && session.user) {

    showDashboard(
      session.user
    );

  }

}


/* ==================================================
   WATCH LOGIN / LOGOUT CHANGES
================================================== */

supabase.auth.onAuthStateChange(
  function (event, session) {

    if (
      event === "SIGNED_IN" &&
      session
    ) {

      showDashboard(
        session.user
      );

    }


    if (
      event === "SIGNED_OUT"
    ) {

      dashboardSection.style.display =
        "none";

      accountSection.style.display =
        "block";

    }

  }
);


/* ==================================================
   START APP
================================================== */

showSignupForm();

check