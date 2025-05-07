// Theme switching functionality
function switchTheme(theme) {
  // Remove any existing theme stylesheets
  const oldTheme = document.getElementById("theme-style");
  if (oldTheme) {
    oldTheme.parentNode.removeChild(oldTheme);
  }

  // Create new theme stylesheet
  const newTheme = document.createElement("link");
  newTheme.id = "theme-style";
  newTheme.rel = "stylesheet";
  newTheme.href = `styles/${theme}.css`;

  // Add to head
  document.head.appendChild(newTheme);

  // Save theme preference
  localStorage.setItem("preferredTheme", theme);
}

// Check for saved theme preference
document.addEventListener("DOMContentLoaded", function () {
  const preferredTheme = localStorage.getItem("preferredTheme") || "theme1";
  switchTheme(preferredTheme);

  // Initialize other page-specific functionality
  if (document.querySelector(".testimonial-slider")) {
    initTestimonialSlider();
  }

  if (document.querySelector(".pets-listing")) {
    initViewSwitcher();
  }

  if (document.getElementById("pet-adoption-form")) {
    initAdoptionForm();
  }

  if (document.getElementById("register-form")) {
    initPasswordValidation();
  }

  if (document.querySelector(".faq-item")) {
    initFAQ();
  }
});

// Testimonial slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) => {
      testimonial.classList.remove("active");
    });
    testimonials[index].classList.add("active");
  }

  // Auto-rotate testimonials every 5 seconds
  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 5000);
}

// View switcher for pets listing
function initViewSwitcher() {
  const petsListing = document.querySelector(".pets-listing");

  function changeView(view) {
    if (view === "grid") {
      petsListing.classList.remove("list-view");
      petsListing.classList.add("grid-view");
    } else {
      petsListing.classList.remove("grid-view");
      petsListing.classList.add("list-view");
    }

    // Update active button
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    event.target.classList.add("active");
  }

  // Expose to global scope for HTML onclick
  window.changeView = changeView;
}

// Pet image gallery
function changeMainImage(src, alt) {
  const mainImage = document.getElementById("main-pet-image");
  mainImage.src = src;
  mainImage.alt = alt;
}

// Adoption form
function initAdoptionForm() {
  function showAdoptionForm() {
    document.getElementById("adoption-form").style.display = "block";
    window.scrollTo({
      top: document.getElementById("adoption-form").offsetTop - 20,
      behavior: "smooth",
    });
  }

  // Expose to global scope for HTML onclick
  window.showAdoptionForm = showAdoptionForm;

  // Form submission
  document
    .getElementById("pet-adoption-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert(
        "Thank you for your adoption application! We will review it and contact you soon."
      );
      this.reset();
    });
}

// Password validation
function initPasswordValidation() {
  const passwordInput = document.getElementById("reg-password");

  passwordInput.addEventListener("input", function () {
    const value = this.value;

    // Check length
    document.getElementById("length").style.color =
      value.length >= 8 ? "green" : "inherit";

    // Check for number
    document.getElementById("number").style.color = /\d/.test(value)
      ? "green"
      : "inherit";

    // Check for letter
    document.getElementById("letter").style.color = /[a-zA-Z]/.test(value)
      ? "green"
      : "inherit";
  });

  // Form submission
  document
    .getElementById("register-form")
    .addEventListener("submit", function (e) {
      const password = document.getElementById("reg-password").value;
      const confirm = document.getElementById("reg-confirm").value;

      if (password !== confirm) {
        e.preventDefault();
        alert("Passwords do not match!");
        return false;
      }

      if (
        password.length < 8 ||
        !/\d/.test(password) ||
        !/[a-zA-Z]/.test(password)
      ) {
        e.preventDefault();
        alert("Password does not meet requirements!");
        return false;
      }

      return true;
    });
}

// FAQ functionality
function initFAQ() {
  function toggleFaq(button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector(".faq-answer");

    // Toggle active class
    faqItem.classList.toggle("active");

    // Toggle answer visibility
    if (faqItem.classList.contains("active")) {
      answer.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.classList.remove("active");
      answer.style.maxHeight = "0";
    }
  }

  window.toggleFaq = toggleFaq;
}
document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    Swal.fire({
      title: "home4pets",
      text: "Your request has been submitted",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  });

document
  .getElementById("forgot-password-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    Swal.fire({
      title: "Home4Pets",
      text: "There is an email that has been sent to your inbox. Check it to reset your password.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  });



document
      .getElementById("login-form")
      .addEventListener("submit", function(event) {
       event.preventDefault();
       const username = document.getElementById("login-email");
       const password = document.getElementById("login-password");
       window.location.href = "index.html";
  });
   
