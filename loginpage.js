document.addEventListener("DOMContentLoaded", function () {
    // =============== SHOW/HIDE PASSWORD (LOGIN & REGISTER) ===============
    const togglePasswordVisibility = (inputId, iconId) => {
      const input = document.getElementById(inputId);
      const icon = document.getElementById(iconId);
  
      if (input && icon) {
        icon.addEventListener('click', () => {
          input.type = input.type === 'password' ? 'text' : 'password';
          icon.classList.toggle('ri-eye-fill');
          icon.classList.toggle('ri-eye-off-fill');
        });
      }
    };
  
    togglePasswordVisibility('password', 'toggle-password'); // Login
    togglePasswordVisibility('passwordCreate', 'loginPasswordCreate'); // Create Account
  
    // =============== REDIRECT TO mainwebsite.html ON LOGIN ===============
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
      loginForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission
        // Optional: add simple validation or alerts here
        window.location.href = "mainwebsite.html"; // Redirect after login
      });
    }
  
    // =============== TOGGLE BETWEEN LOGIN & REGISTER FORMS ===============
    const loginAccessRegister = document.getElementById('loginAccessRegister');
    const buttonRegister = document.getElementById('loginButtonRegister');
    const buttonAccess = document.getElementById('loginButtonAccess');
  
    if (loginAccessRegister && buttonRegister && buttonAccess) {
      buttonRegister.addEventListener('click', () => {
        loginAccessRegister.classList.add('active');
      });
  
      buttonAccess.addEventListener('click', () => {
        loginAccessRegister.classList.remove('active');
      });
    }
    document.addEventListener("DOMContentLoaded", function () {
        // =============== SHOW/HIDE PASSWORD (LOGIN & REGISTER) ===============
        const togglePasswordVisibility = (inputId, iconId) => {
          const input = document.getElementById(inputId);
          const icon = document.getElementById(iconId);
      
          if (input && icon) {
            icon.addEventListener('click', () => {
              input.type = input.type === 'password' ? 'text' : 'password';
              icon.classList.toggle('ri-eye-fill');
              icon.classList.toggle('ri-eye-off-fill');
            });
          }
        };
      
        togglePasswordVisibility('password', 'toggle-password'); // Login
        togglePasswordVisibility('passwordCreate', 'loginPasswordCreate'); // Create Account
      
        // =============== REDIRECT TO mainwebsite.html ON SIGN UP ===============
        const signupForm = document.getElementById("signup-form");
        if (signupForm) {
          signupForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission
            // Optional: Add form validation or user registration logic here
            window.location.href = "mainwebsite.html"; // Redirect after sign up
          });
        }
      
        // =============== TOGGLE BETWEEN LOGIN & REGISTER FORMS ===============
        const loginAccessRegister = document.getElementById('loginAccessRegister');
        const buttonRegister = document.getElementById('loginButtonRegister');
        const buttonAccess = document.getElementById('loginButtonAccess');
      
        if (loginAccessRegister && buttonRegister && buttonAccess) {
          buttonRegister.addEventListener('click', () => {
            loginAccessRegister.classList.add('active');
          });
      
          buttonAccess.addEventListener('click', () => {
            loginAccessRegister.classList.remove('active');
          });
        }
      });
      document.getElementById("signup-form").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent default form submission
        window.location.href = "signup.html"; // Redirect to signup.html
      });
      
  });
  