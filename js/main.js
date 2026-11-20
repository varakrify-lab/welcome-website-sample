(function () {
  'use strict';

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Responsive navigation
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');

  function setNav(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setNav(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { setNav(false); }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setNav(false);
        toggle.focus();
      }
    });
  }

  // Contact form validation
  var form = document.getElementById('contact-form');
  if (!form) { return; }

  var status = document.getElementById('form-status');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validateField(field) {
    var value = field.value.trim();
    var message = '';

    if (!value) {
      message = 'This field is required.';
    } else if (field.name === 'name' && value.length < 2) {
      message = 'Please enter at least 2 characters.';
    } else if (field.name === 'email' && !emailPattern.test(value)) {
      message = 'Please enter a valid email address.';
    } else if (field.name === 'message' && value.length < 10) {
      message = 'Please enter at least 10 characters.';
    }

    var errorEl = document.getElementById(field.id + '-error');
    errorEl.textContent = message;
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
    return !message;
  }

  var fields = Array.prototype.slice.call(form.querySelectorAll('input, textarea'));

  fields.forEach(function (field) {
    field.addEventListener('blur', function () { validateField(field); });
    field.addEventListener('input', function () {
      if (field.getAttribute('aria-invalid') === 'true') { validateField(field); }
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';

    var firstInvalid = null;
    fields.forEach(function (field) {
      if (!validateField(field) && !firstInvalid) { firstInvalid = field; }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Demo only: no backend is connected.
    status.textContent = 'Thank you! Your message has been validated successfully (demo: no data was sent).';
    form.reset();
    fields.forEach(function (f) { f.removeAttribute('aria-invalid'); });
  });
})();
