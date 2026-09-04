// Glammé Gallery & Client Transformation Slider JavaScript Engine

document.addEventListener('DOMContentLoaded', () => {
  // Real Transformations Carousel Track Control
  const track = document.getElementById('trans-track');
  const prevBtn = document.getElementById('prev-trans');
  const nextBtn = document.getElementById('next-trans');

  let currentTransIndex = 0;

  function updateCarousel() {
    if (!track) return;
    const cards = track.querySelectorAll('.transformation-card');
    if (!cards.length) return;
    
    const maxIndex = cards.length - 1;
    if (currentTransIndex > maxIndex) currentTransIndex = 0;
    if (currentTransIndex < 0) currentTransIndex = maxIndex;

    const cardStyle = window.getComputedStyle(cards[0]);
    const marginRight = parseInt(cardStyle.marginRight) || 0;
    const gap = parseInt(window.getComputedStyle(track).gap) || 16;
    const cardWidth = cards[0].offsetWidth + (gap || marginRight);

    const offset = currentTransIndex * -cardWidth;
    track.style.transform = `translateX(${offset}px)`;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const cards = track ? track.querySelectorAll('.transformation-card') : [];
      const maxIndex = cards.length ? cards.length - 1 : 3;
      
      if (currentTransIndex < maxIndex) {
        currentTransIndex++;
      } else {
        currentTransIndex = 0;
      }
      updateCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const cards = track ? track.querySelectorAll('.transformation-card') : [];
      const maxIndex = cards.length ? cards.length - 1 : 3;
      
      if (currentTransIndex > 0) {
        currentTransIndex--;
      } else {
        currentTransIndex = maxIndex;
      }
      updateCarousel();
    });
  }

  // Recalculate on window resize
  window.addEventListener('resize', updateCarousel);

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
