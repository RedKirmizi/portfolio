document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
      // Remove "active" class from all links
      document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
  
      // Add "active" class to the clicked link
      this.classList.add('active');
    });
});
  
// // Function to set the active link based on the current section
// function updateActiveLink() {
//   const sections = document.querySelectorAll('section');
//   let currentSection = '';

//   sections.forEach(section => {
//       const sectionTop = section.offsetTop;
//       const sectionHeight = section.offsetHeight;
//       if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
//           currentSection = section.getAttribute('id');
//       }
//   });

//   // Update active class in the nav
//   const navLinks = document.querySelectorAll('.nav-link');
//   navLinks.forEach(link => {
//       link.classList.remove('active');
//       if (link.getAttribute('href') === `#${currentSection}`) {
//           link.classList.add('active');
//       }
//   });
// }

// // Listen for scroll events to update active link
// window.addEventListener('scroll', updateActiveLink);

// // Ensure the active link is updated when the page loads
// window.addEventListener('load', updateActiveLink);


