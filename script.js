/* ==================================================
   BOOSTLANE SUPABASE CONFIGURATION
================================================== */

const SUPABASE_URL =
  "https://whseefadqutdrsachypc.supabase.co";

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
   MESSAGE FUNCTION
================================================== */

function showMessage(text, error = false) {

  if (!accountMessage) return;

  accountMessage.textContent = text;

  accountMessage.style.color =
    error ? "#dc2626" : "#16a34a";
}


/* ==================================================
   SIGN UP TAB
================================================== */

if (signupTab) {

  signupTab.addEventListener("click", () => {

    signupTab.classList.add("active");

    loginTab.classList.remove("active");

    showSignupForm();

  });

}


/* ==================================================
   LOGIN TAB
================================================== */

if (loginTab) {

  loginTab.addEventListener("click", () => {

    loginTab.classList.add("active");

    signupTab.classList.remove("active");

    showLoginForm();

  });

}


/* ==================================================
   SIGN UP FORM
================================================== */

function showSignupForm() {

  if (!signupForm) return;

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


  signupForm.onsubmit = async (event) => {

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


    try {

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


      if (data.user) {

        showMessage(
          "Account created successfully! Check your email if confirmation is required."
        );

      }

    } catch (error) {

      console.error(
        "SIGN UP ERROR:",
        error
      );

      showMessage(
        "Something went wrong. Please try again.",
        true
      );

    }

  };

}


/* ==================================================
   LOGIN FORM
================================================== */

function showLoginForm() {

  if (!signupForm) return;

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


  signupForm.onsubmit = async (event) => {

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


    try {

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

        showDashboard(
          data.user
        );

      }

    } catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );

      showMessage(
        "Login failed. Please try again.",
        true
      );

    }

  };

}


/* ==================================================
   SHOW DASHBOARD
================================================== */

function showDashboard(user) {

  if (!accountSection || !dashboardSection) {
    return;
  }


  accountSection.style.display =
    "none";

  dashboardSection.style.display =
    "block";


  const name =
    user.user_metadata?.full_name;


  if (dashboardUser) {

    dashboardUser.textContent =
      name
        ? `Welcome ${name}. Manage your account, services, and orders.`
        : "Manage your account, services, and orders.";

  }


  dashboardSection.scrollIntoView({
    behavior: "smooth"
  });

}


/* ==================================================
   LOGOUT
================================================== */

if (logoutButton) {

  logoutButton.addEventListener(
    "click",
    async () => {

      const { error } =
        await supabase.auth.signOut();


      if (error) {

        console.error(error);

        return;

      }


      if (dashboardSection) {

        dashboardSection.style.display =
          "none";

      }


      if (accountSection) {

        accountSection.style.display =
          "block";

        accountSection.scrollIntoView({
          behavior: "smooth"
        });

      }


      showMessage(
        "You have been logged out."
      );

    }
  );

}


/* ==================================================
   VIEW SERVICES
================================================== */

if (servicesButton) {

  servicesButton.addEventListener(
    "click",
    () => {

      if (dashboardMessage) {

        dashboardMessage.textContent =
          "Our service ordering system is coming next. 🚀";

      }

    }
  );

}


/* ==================================================
   MY ORDERS
================================================== */

if (ordersButton) {

  ordersButton.addEventListener(
    "click",
    async () => {

      if (!dashboardMessage) return;


      dashboardMessage.textContent =
        "Loading your orders...";


      try {

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

          console.error(
            "ORDERS ERROR:",
            error
          );

          dashboardMessage.textContent =
            "Unable to load your orders yet.";

          return;

        }


        if (!data || data.length === 0) {

          dashboardMessage.textContent =
            "You don't have any orders yet.";

          return;

        }


        dashboardMessage.innerHTML =
          `<strong>You have ${data.length} order(s).</strong>`;

      } catch (error) {

        console.error(error);

        dashboardMessage.textContent =
          "Something went wrong while loading orders.";

      }

    }
  );

}


/* ==================================================
   CHECK EXISTING LOGIN SESSION
================================================== */

async function checkUser() {

  try {

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

  } catch (error) {

    console.error(
      "SESSION ERROR:",
      error
    );

  }

}


/* ==================================================
   AUTH STATE LISTENER
================================================== */

supabase.auth.onAuthStateChange(
  (event, session) => {

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

      if (dashboardSection) {

        dashboardSection.style.display =
          "none";

      }

      if (accountSection) {

        accountSection.style.display =
          "block";

      }

    }

  }
);


/* ==================================================
   START BOOSTLANE
================================================== */

showSignupForm();

checkUser();


console.log(
  "✅ Boostlane JavaScript is running."
);