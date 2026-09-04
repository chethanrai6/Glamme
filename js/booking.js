// Glammé 4-Step Interactive Booking Engine

document.addEventListener('DOMContentLoaded', () => {
  let currentStep = 1;
  let selectedService = 'Hair Care & Styling';
  let selectedDate = '15 Sep 2026';
  let selectedTime = '10:00 AM';

  const stepTabs = [
    document.getElementById('step-tab-1'),
    document.getElementById('step-tab-2'),
    document.getElementById('step-tab-3'),
    document.getElementById('step-tab-4')
  ];

  const stepContents = [
    document.getElementById('step-content-1'),
    document.getElementById('step-content-2'),
    document.getElementById('step-content-3'),
    document.getElementById('step-content-4')
  ];

  const prevBtn = document.getElementById('wizard-prev-btn');
  const nextBtn = document.getElementById('wizard-next-btn');

  function updateWizardUI() {
    stepTabs.forEach((tab, index) => {
      if (!tab) return;
      tab.classList.remove('active', 'completed');
      if (index + 1 === currentStep) {
        tab.classList.add('active');
      } else if (index + 1 < currentStep) {
        tab.classList.add('completed');
      }
    });

    stepContents.forEach((content, index) => {
      if (!content) return;
      if (index + 1 === currentStep) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });

    if (prevBtn) {
      prevBtn.style.display = currentStep > 1 && currentStep < 4 ? 'inline-flex' : 'none';
    }

    if (nextBtn) {
      if (currentStep === 3) {
        nextBtn.textContent = 'Confirm Booking ✓';
      } else if (currentStep === 4) {
        nextBtn.style.display = 'none';
      } else {
        nextBtn.style.display = 'inline-flex';
        nextBtn.textContent = 'Next →';
      }
    }
  }

  // Service Card Selection
  const serviceCards = document.querySelectorAll('.service-select-card');
  serviceCards.forEach(card => {
    card.addEventListener('click', () => {
      serviceCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      selectedService = card.dataset.service || 'Hair Care';
    });
  });

  // Dynamic Calendar Generation
  const calendarDaysGrid = document.getElementById('calendar-days-grid');
  function generateCalendar() {
    if (!calendarDaysGrid) return;
    calendarDaysGrid.innerHTML = '';
    
    const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    dayHeaders.forEach(dh => {
      const el = document.createElement('div');
      el.className = 'day-header';
      el.textContent = dh;
      calendarDaysGrid.appendChild(el);
    });

    // September 2026 start day offset (Tuesday = offset 2)
    for (let i = 0; i < 2; i++) {
      const blank = document.createElement('div');
      calendarDaysGrid.appendChild(blank);
    }

    for (let d = 1; d <= 30; d++) {
      const dayCell = document.createElement('div');
      dayCell.className = `calendar-day ${d === 15 ? 'selected' : ''}`;
      dayCell.textContent = d;
      dayCell.addEventListener('click', () => {
        document.querySelectorAll('.calendar-day').forEach(cd => cd.classList.remove('selected'));
        dayCell.classList.add('selected');
        selectedDate = `${d} Sep 2026`;
      });
      calendarDaysGrid.appendChild(dayCell);
    }
  }
  generateCalendar();

  // Time Slot Selection
  const timeSlots = document.querySelectorAll('.time-slot');
  timeSlots.forEach(slot => {
    slot.addEventListener('click', () => {
      timeSlots.forEach(s => s.classList.remove('selected'));
      slot.classList.add('selected');
      selectedTime = slot.textContent.trim();
    });
  });

  // Next / Prev Button Controls
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentStep === 3) {
        // Validate form input
        const nameInput = document.getElementById('book-name');
        const phoneInput = document.getElementById('book-phone');
        
        if (nameInput && !nameInput.value.trim()) {
          alert('Please enter your full name');
          nameInput.focus();
          return;
        }
        if (phoneInput && !phoneInput.value.trim()) {
          alert('Please enter your phone number');
          phoneInput.focus();
          return;
        }

        // Fill Confirmation Ticket Details
        const randomRef = 'GLAM-' + Math.floor(1000 + Math.random() * 9000);
        document.getElementById('summary-ref').textContent = randomRef;
        document.getElementById('summary-service').textContent = selectedService;
        document.getElementById('summary-datetime').textContent = `${selectedDate} at ${selectedTime}`;
        document.getElementById('summary-client').textContent = nameInput.value;
      }

      if (currentStep < 4) {
        currentStep++;
        updateWizardUI();
      }
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateWizardUI();
      }
    });
  }
});
