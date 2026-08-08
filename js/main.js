const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});
/* =========================
   PROJECT CAROUSEL
========================= */

const track = document.getElementById("carouselTrack");
const prevButton = document.getElementById("prevProject");
const nextButton = document.getElementById("nextProject");
const currentSlide = document.getElementById("currentSlide");

const projects = document.querySelectorAll(".project-card");

let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;

  currentSlide.textContent = String(currentIndex + 1).padStart(2, "0");
}

/* Next */

nextButton.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex >= projects.length) {
    currentIndex = 0;
  }

  updateCarousel();
});

/* Previous */

prevButton.addEventListener("click", () => {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = projects.length - 1;
  }

  updateCarousel();
});
const contactForm = document.getElementById("contactForm");
const formPopup = document.getElementById("formPopup");
const popupClose = document.getElementById("popupClose");
const popupButton = document.getElementById("popupButton");

if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    // STOP the browser from opening Formspree
    e.preventDefault();

    const submitButton = contactForm.querySelector('button[type="submit"]');

    const originalText = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML = "SENDING...";

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: new FormData(contactForm),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        // Clear the form
        contactForm.reset();

        // Show your popup
        formPopup.classList.add("active");
      } else {
        alert("There was a problem sending your message. Please try again.");
      }
    } catch (error) {
      alert(
        "Unable to send your message. Please check your internet connection.",
      );
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalText;
    }
  });
}

// Close popup
function closePopup() {
  formPopup.classList.remove("active");
}

if (popupClose) {
  popupClose.addEventListener("click", closePopup);
}

if (popupButton) {
  popupButton.addEventListener("click", closePopup);
}

// Click outside popup
if (formPopup) {
  formPopup.addEventListener("click", function (e) {
    if (e.target === formPopup) {
      closePopup();
    }
  });
}

// ESC key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePopup();
  }
});
