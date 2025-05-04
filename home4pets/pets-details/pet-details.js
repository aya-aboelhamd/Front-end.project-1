function showAdoptionForm() {
    const formSection = document.getElementById('adoption-form');
    formSection.style.display = 'block';
    setTimeout(() => {
      formSection.classList.add('show');
      formSection.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('pet-adoption-form');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      alert("Thank you for applying! We'll contact you soon.");
      form.reset();
      document.getElementById('adoption-form').style.display = 'none';
      document.getElementById('adoption-form').classList.remove('show');
    });
  });
  