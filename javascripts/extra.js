document.addEventListener('DOMContentLoaded', function() {
  const footer = document.querySelector('.md-footer-meta__inner');
  if (footer) {
    footer.style.cursor = 'pointer';
    footer.addEventListener('click', function(e) {
      if (e.target === footer || e.target === footer.querySelector('::before')) {
        window.open('https://www.athenarc.gr', '_blank');
      }
    });
  }
});