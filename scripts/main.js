//Toggle and Responsive Navigation
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const navLists = document.querySelector("nav");

  burger.addEventListener("click", () => {
    navLists.classList.toggle("nav-active");
    burger.classList.toggle("toggle-burger");
  });
};

navSlide();

// Clear form before unload
window.onbeforeunload = () => {
  for (const form of document.getElementsByTagName("form")) {
    form.reset();
  }
};

// Fungsi untuk smooth scroll
function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

// Event listener untuk link navigasi
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  navLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      smoothScroll(targetId, 500);
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nameInput = form.querySelector('input[name="name"]');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');
    
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      Swal.fire({
        title: 'Peringatan!',
        text: 'Mohon masukkan alamat email yang valid.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      return;
    }
    
    // Kirim form menggunakan Fetch API
    fetch(form.action, {
      method: form.method,
      body: new FormData(form),
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        Swal.fire({
          title: 'Sukses!',
          text: 'Pesan berhasil dikirim. Terima Kasih.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        form.reset(); // Reset form setelah berhasil
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Terjadi kesalahan. Mohon coba lagi.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    })
    .catch(error => {
      Swal.fire({
        title: 'Error!',
        text: 'Terjadi kesalahan. Mohon coba lagi.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      console.error('Error:', error);
    });
  });
});
