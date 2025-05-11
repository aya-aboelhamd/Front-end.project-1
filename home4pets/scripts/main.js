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
  }, 3000);
}

function initViewSwitcher() {
  const petsListing = document.querySelector(".pets-listing");
  petsListing.classList.add("list-view");
}

window.changeMainImage = function (src, alt) {
  const mainImage = document.getElementById("main-pet-image");
  mainImage.src = src;
  mainImage.alt = alt;
};

function initPasswordValidation() {
  const passwordInput = document.getElementById("reg-password");
  const registerForm = document.getElementById("register-form");
  if (!passwordInput || !registerForm) return;

  passwordInput.addEventListener("input", function () {
    const value = this.value;
    document.getElementById("length").style.color =
      value.length >= 8 ? "green" : "inherit";
    document.getElementById("number").style.color = /\d/.test(value)
      ? "green"
      : "inherit";
    document.getElementById("letter").style.color = /[a-zA-Z]/.test(value)
      ? "green"
      : "inherit";
  });

  registerForm.addEventListener("submit", function (e) {
    const password = passwordInput.value;
    const confirm = document.getElementById("reg-confirm").value;

    if (
      password !== confirm ||
      password.length < 8 ||
      !/\d/.test(password) ||
      !/[a-zA-Z]/.test(password)
    ) {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "error",
        title: "Invalid password! Please check the requirements.",
      });
    } else {
      Swal.fire({
        title: "Home4Pets",
        text: "Congratulations! You have created an account on our website.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        didClose: () => {
          window.location.href = "login.html";
        },
      });
    }
  });
}

function toggleFaq(button) {
  const answer = button.nextElementSibling;
  const icon = button.querySelector(".faq-icon");

  if (answer.style.display === "block") {
    answer.style.display = "none";
    icon.textContent = "+";
  } else {
    answer.style.display = "block";
    icon.textContent = "-";
  }
}

function initPetSearch() {
  const form = document.getElementById("search-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const keyword = document
      .getElementById("search-keyword")
      .value.toLowerCase();
    const type = document.getElementById("search-type").value.toLowerCase();
    const ageGroup = document.getElementById("search-age").value;
    const petCards = document.querySelectorAll(".pet-card");

    petCards.forEach((card) => {
      const spans = card.querySelectorAll(".pet-info span");

      let name = "",
        petType = "",
        ageText = "";
      spans.forEach((span) => {
        const text = span.textContent.toLowerCase();
        if (text.includes("name:")) name = text.replace("name:", "").trim();
        else if (text.includes("type:"))
          petType = text.replace("type:", "").trim();
        else if (text.includes("age:"))
          ageText = text.replace("age:", "").trim();
      });

      let show = true;

      if (keyword && !name.includes(keyword)) show = false;
      if (type && petType !== type && type !== "") show = false;

      const ageMatch = ageText.match(/(\d+)/);
      if (ageGroup && ageMatch) {
        const age = parseInt(ageMatch[1]);
        if (ageGroup === "puppy" && age > 1) show = false;
        if (ageGroup === "young" && (age < 1 || age > 3)) show = false;
        if (ageGroup === "adult" && (age < 3 || age > 7)) show = false;
        if (ageGroup === "senior" && age < 7) show = false;
      }

      card.style.display = show ? "flex" : "none";
    });
  });
}

function initFormSubmissions() {
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const alert = document.createElement("div");
      alert.textContent = "Your message has been sent successfully.";
      Object.assign(alert.style, {
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#8A2BE2",
        color: "#fff",
        padding: "10px 20px",
        borderRadius: "6px",
        zIndex: 1000,
        fontWeight: "bold",
        textAlign: "center",
        maxWidth: "90%",
      });
      document.body.appendChild(alert);
      setTimeout(() => alert.remove(), 4000);
      contactForm.reset();
    });
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const alertBox = document.getElementById("custom-alert");
      alertBox.style.display = "block";
      setTimeout(() => {
        alertBox.style.display = "none";
        window.location.href = "index.html";
      }, 1000);
    });
  }
}

function closeAlert() {
  document.getElementById("custom-alert").style.display = "none";
}
window.closeAlert = closeAlert;

document.addEventListener("DOMContentLoaded", function () {
  switchTheme(localStorage.getItem("preferredTheme") || "theme1");
  if (document.querySelector(".testimonial-slider")) initTestimonialSlider();
  if (document.querySelector(".pets-listing")) initViewSwitcher();
  if (document.getElementById("pet-adoption-form")) initAdoptionForm();
  if (document.getElementById("register-form")) initPasswordValidation();
  if (document.querySelector(".faq-item")) initFAQ();
  if (document.getElementById("search-form")) initPetSearch();
  initFormSubmissions();
});

document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    Swal.fire({
      title: "Home4Pets",
      text: "Congratulations! You have created an account on our website.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      didClose: () => {
        window.location.href = "login.html";
      },
    });
  });

document
  .getElementById("forgot-password-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    const verificationEmail = document.getElementById("verification-email");
    if (verificationEmail?.value) {
      Swal.fire({
        title: "Home4Pets",
        text: "Password reset instructions have been sent to your email.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
        didClose: () => {
          window.location.href = "login.html";
        },
      });
    }
  });
