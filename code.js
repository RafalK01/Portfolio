
const jobButtons = document.querySelectorAll('.job-btn');
const ironhackBtn = document.querySelector('.ironhack');

ironhackBtn.classList.add('clicked'); // Add 'clicked' class to ironhack button initially

const jobDescription = document.querySelector('.job-description');

// Create an Intersection Observer instance
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const sectionId = entry.target.getAttribute('id');
    const correspondingButton = document.querySelector(`[data-section="${sectionId}"]`);

    if (entry.intersectionRatio >= 0.5) { // Check if 50% or more of the element is visible
      correspondingButton.classList.add('clicked');
    } else {
      correspondingButton.classList.remove('clicked');
    }
  });
}, { threshold: 0.5 }); // Adjust the threshold as needed


// Observe each section
const sections = document.querySelectorAll('.job-description section');
sections.forEach(section => {
  observer.observe(section);
});

// Function to find the currently visible section
const findVisibleSection = () => {
  let visibleSection = null;
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      visibleSection = section;
    }
  });
  return visibleSection;
};

// Function to handle scroll event
const handleScroll = () => {
  const visibleSection = findVisibleSection();
  if (visibleSection) {
    const sectionId = visibleSection.getAttribute('id');
    const correspondingButton = document.querySelector(`[data-section="${sectionId}"]`);

    // Remove 'clicked' class from all buttons
    jobButtons.forEach(btn => {
      btn.classList.remove('clicked');
    });

    // Add 'clicked' class to the corresponding button
    correspondingButton.classList.add('clicked');
  }
};

// Add scroll event listener
jobDescription.addEventListener('scroll', handleScroll);

jobButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();

    // Remove 'clicked' class from all buttons
    jobButtons.forEach(btn => {
      btn.classList.remove('clicked');
    });

    // Add 'clicked' class to the clicked button
    button.classList.add('clicked');

    const sectionId = button.getAttribute('data-section');
    const section = document.getElementById(sectionId);

    const scrollOffset = section.offsetTop - jobDescription.offsetTop;

    jobDescription.scrollTo({
      top: scrollOffset,
      behavior: 'smooth'
    });
  });
});



// -------------------------proper section scrolling

$(document).ready(function() {
    // Function to handle smooth scrolling
    function smoothScroll(target, offset) {
        $('html, body').animate({
            scrollTop: $(target).offset().top - offset
        }, 100);
    }

    // Handle click event on navigation links
    $('a.nav-btn').on('click', function(event) {
        event.preventDefault();
        var href = $(this).attr('href');
        var offset = 50; // Set the offset value (150px in this example)
        smoothScroll(href, offset);
    });
});
