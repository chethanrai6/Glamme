// Glammé Gallery & Client Transformation Slider JavaScript Engine

document.addEventListener('DOMContentLoaded', () => {
  // Real Transformations Carousel Track Control
  const track = document.getElementById('trans-track');
  const prevBtn = document.getElementById('prev-trans');
  const nextBtn = document.getElementById('next-trans');

  let currentTransIndex = 0;
  const maxIndex = 2; // 4 cards total, show 2 per view or scroll offset

  function updateCarousel() {
    if (!track) return;
    const offset = currentTransIndex * -280;
    track.style.transform = `translateX(${offset}px)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentTransIndex < maxIndex) {
        currentTransIndex++;
        updateCarousel();
      } else {
        currentTransIndex = 0;
        updateCarousel();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentTransIndex > 0) {
        currentTransIndex--;
        updateCarousel();
      } else {
        currentTransIndex = maxIndex;
        updateCarousel();
      }
    });
  }

  // Category Filter Tabs Handler
  const filterBtns = document.querySelectorAll('.filter-btn');
  const detailedCards = document.querySelectorAll('.detailed-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      detailedCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
});
