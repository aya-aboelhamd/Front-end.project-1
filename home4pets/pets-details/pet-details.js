function showAdoptionForm() {
  const formSection = document.getElementById("adoption-form");
  formSection.style.display = "block";
  setTimeout(() => {
    formSection.classList.add("show");
    formSection.scrollIntoView({ behavior: "smooth" });
  }, 10);
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("pet-adoption-form");

  const handleSubmit = (e) => {
    e.preventDefault();

    swal({
      title: "Application Submitted",
      text: "Thank you for applying! We'll contact you soon.",
      icon: "success",
      button: "OK",
    }).then((confirmed) => {
      if (confirmed) {
        form.reset();
        const formContainer = document.getElementById("adoption-form");
        formContainer.style.display = "none";
        formContainer.classList.remove("show");
      }
    });
  };
  form.addEventListener("submit", handleSubmit);
});
