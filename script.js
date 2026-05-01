let currentIndex = 0;
let images = [];

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  refreshImages();

  // Use event delegation (IMPORTANT FIX)
  document.querySelector(".gallery").addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
      refreshImages(); // always update filtered list
      const clickedIndex = images.indexOf(e.target);
      openLightbox(clickedIndex);
    }
  });
});

// Get ONLY visible images
function refreshImages() {
  images = Array.from(document.querySelectorAll(".card img"))
    .filter(img => img.closest(".card").style.display !== "none");
}

// Open Lightbox
function openLightbox(index) {
  if (index < 0) return;

  currentIndex = index;
  document.getElementById("lightbox").style.display = "flex";
  showImage();
}

// Close Lightbox
function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

// Show image
function showImage() {
  if (images.length === 0) return;
  document.getElementById("lightbox-img").src = images[currentIndex].src;
}

// Next
function nextImage() {
  if (images.length === 0) return;
  currentIndex = (currentIndex + 1) % images.length;
  showImage();
}

// Previous
function prevImage() {
  if (images.length === 0) return;
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  showImage();
}

// Filter images
function filterImages(category) {
  document.querySelectorAll(".card").forEach(card => {
    card.style.display =
      category === "all" || card.classList.contains(category)
        ? "block"
        : "none";
  });

  refreshImages(); // update visible images after filtering
}