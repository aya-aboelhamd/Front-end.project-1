function showAdoptionForm() {
  const formSection = document.getElementById("adoption-form");
  formSection.style.display = "block";
  setTimeout(() => {
    formSection.classList.add("show");
    formSection.scrollIntoView({ behavior: "smooth" });
  }, 10);
}

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("pet-adoption-form");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    Swal.fire({
      title: "Home4Pets",
      text: "Thank you for applying! We'll contact you soon.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      didClose: () => {
        form.reset();
        const adoptionForm = document.getElementById("adoption-form");
        if (adoptionForm) {
          adoptionForm.style.display = "none";
          adoptionForm.classList.remove("show");
        }
      },
    });
  });
});
