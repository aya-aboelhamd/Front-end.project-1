// Theme switching functionality
function switchTheme(theme) {
  const oldTheme = document.getElementById("theme-style");
  if (oldTheme) oldTheme.remove();

  const newTheme = document.createElement("link");
  newTheme.id = "theme-style";
  newTheme.rel = "stylesheet";
  newTheme.href = `styles/${theme}.css`;
  document.head.appendChild(newTheme);

  localStorage.setItem("preferredTheme", theme);
}

// Testimonial slider
function initTestimonialSlider() {
  const testimonials = document.querySelectorAll(".testimonial");
  let currentIndex = 0;

  function showTestimonial(index) {
    testimonials.forEach((t) => t.classList.remove("active"));
    testimonials[index].classList.add("active");
  }

  setInterval(() => {
    currentIndex = (currentIndex + 1) % testimonials.length;
    showTestimonial(currentIndex);
  }, 5000);
}

// View switcher
function initViewSwitcher() {
  const petsListing = document.querySelector(".pets-listing");

  window.changeView = function (view, event) {
    if (view === "grid") {
      petsListing.classList.remove("list-view");
      petsListing.classList.add("grid-view");
    } else {
      petsListing.classList.remove("grid-view");
      petsListing.classList.add("list-view");
    }

    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.classList.remove("active");
    });
    event.target.classList.add("active");
  };
}

// Image gallery
function changeMainImage(src, alt) {
  const mainImage = document.getElementById("main-pet-image");
  mainImage.src = src;
  mainImage.alt = alt;
}
window.changeMainImage = changeMainImage;

// Adoption form
function initAdoptionForm() {
  window.showAdoptionForm = function () {
    const form = document.getElementById("adoption-form");
    form.style.display = "block";
    window.scrollTo({ top: form.offsetTop - 20, behavior: "smooth" });
  };

  document.getElementById("pet-adoption-form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you for your adoption application! We will review it and contact you soon.");
    this.reset();
  });
}

// Password validation
function initPasswordValidation() {
  const passwordInput = document.getElementById("reg-password");

  passwordInput.addEventListener("input", function () {
    const value = this.value;
    document.getElementById("length").style.color = value.length >= 8 ? "green" : "inherit";
    document.getElementById("number").style.color = /\d/.test(value) ? "green" : "inherit";
    document.getElementById("letter").style.color = /[a-zA-Z]/.test(value) ? "green" : "inherit";
  });

  document.getElementById("register-form").addEventListener("submit", function (e) {
    const password = document.getElementById("reg-password").value;
    const confirm = document.getElementById("reg-confirm").value;

    if (password !== confirm) {
      e.preventDefault();
      alert("Passwords do not match!");
      return;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      e.preventDefault();
      alert("Password does not meet requirements!");
      return;
    }
  });
}

// FAQ toggle
function initFAQ() {
  window.toggleFaq = function (button) {
    const faqItem = button.parentElement;
    const answer = faqItem.querySelector(".faq-answer");

    faqItem.classList.toggle("active");

    if (faqItem.classList.contains("active")) {
      answer.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
    } else {
      answer.classList.remove("active");
      answer.style.maxHeight = "0";
    }
  };
}

// Form submissions with alerts
function initFormSubmissions() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      Swal.fire({
        title: "home4pets",
        text: "Your request has been submitted",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    });
  }

  const forgotPasswordForm = document.getElementById("forgot-password-form");
  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (event) {
      event.preventDefault();
      Swal.fire({
        title: "Home4Pets",
        text: "There is an email that has been sent to your inbox. Check it to reset your password.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      window.location.href = "index.html";
    });
  }
}

// Search functionality
function initPetSearch() {
  const searchForm = document.getElementById("search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const keyword = document.getElementById("search-keyword").value.toLowerCase();
      const type = document.getElementById("search-type").value.toLowerCase();
      const ageGroup = document.getElementById("search-age").value;

      const petCards = document.querySelectorAll(".pet-card");

      petCards.forEach((card) => {
        const name = card.querySelector("h3").textContent.toLowerCase();
        const breed = card.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
        const ageText = card.querySelector("p:nth-of-type(2)").textContent;
        let show = true;

        if (keyword && !name.includes(keyword) && !breed.includes(keyword)) show = false;
        if (type && !breed.includes(type)) show = false;

        if (ageGroup) {
          const ageMatch = ageText.match(/(\d+)/);
          if (ageMatch) {
            const age = parseInt(ageMatch[1]);
            switch (ageGroup) {
              case "puppy":
                if (age > 1) show = false;
                break;
              case "young":
                if (age < 1 || age > 3) show = false;
                break;
              case "adult":
                if (age < 3 || age > 7) show = false;
                break;
              case "senior":
                if (age < 7) show = false;
                break;
            }
          }
        }

        card.style.display = show ? "block" : "none";
      });
    });
  }
}

// On page load
document.addEventListener("DOMContentLoaded", function () {
  const preferredTheme = localStorage.getItem("preferredTheme") || "theme1";
  switchTheme(preferredTheme);

  if (document.querySelector(".testimonial-slider")) initTestimonialSlider();
  if (document.querySelector(".pets-listing")) initViewSwitcher();
  if (document.getElementById("pet-adoption-form")) initAdoptionForm();
  if (document.getElementById("register-form")) initPasswordValidation();
  if (document.querySelector(".faq-item")) initFAQ();

  initFormSubmissions();
  initPetSearch();
});
