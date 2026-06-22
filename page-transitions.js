(function () {
  // Inject overlay element
  var overlay = document.createElement('div');
  overlay.id = 'page-overlay';
  document.body.appendChild(overlay);

  // Enter: overlay starts opaque, fades out to reveal the page
  overlay.style.opacity = '1';
  requestAnimationFrame(function () {
    overlay.style.transition = 'opacity 0.48s cubic-bezier(0.22, 1, 0.36, 1)';
    overlay.style.opacity = '0';
  });

  // Exit: fade overlay back in, then navigate
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || link.target === '_blank') return;
    if (/^(https?:|mailto:|tel:)/.test(href)) return;
    e.preventDefault();
    overlay.style.transition = 'opacity 0.26s ease-in';
    overlay.style.opacity = '1';
    setTimeout(function () { window.location.href = href; }, 290);
  });
})();
