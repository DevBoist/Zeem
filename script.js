/* ============================================================
   ZEEM GLOBAL PUBLICATIONS LIMITED — Main JavaScript
   ============================================================ */
 
(function () {
  'use strict';
 
  /* ── Mobile Navigation Toggle ── */
  const navToggle  = document.querySelector('.nav-toggle');
  const mobileNav  = document.querySelector('.mobile-nav');
  const siteHeader = document.getElementById('site-header');
 
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen);
      mobileNav.setAttribute('aria-hidden', !isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
 
    // Close mobile nav when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });
 
    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!siteHeader.contains(e.target)) {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }
 
  /* ── Sticky Header Shadow on Scroll ── */
  if (siteHeader) {
    window.addEventListener('scroll', function () {
      siteHeader.classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
  }
 
  /* ── Active Nav Link Highlight ── */
  (function setActiveNav() {
    const path  = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.main-nav a, .mobile-nav a');
    links.forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  })();
 
  /* ── Contact Form Handling ── */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');
 
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
 
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
 
      // Simple front-end validation
      let valid = true;
      const required = contactForm.querySelectorAll('[required]');
      required.forEach(function (field) {
        field.style.borderColor = '';
        if (!field.value.trim()) {
          field.style.borderColor = '#c0392b';
          valid = false;
        }
      });
 
      // Email validation
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField && emailField.value.trim()) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value.trim())) {
          emailField.style.borderColor = '#c0392b';
          valid = false;
        }
      }
 
      if (!valid) return;
 
      // Send via user's mail app: primary recipient + hidden BCC recipient
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      const getValue = function (selector) {
        const el = contactForm.querySelector(selector);
        return el ? el.value.trim() : '';
      };

      const firstName = getValue('#first-name');
      const lastName = getValue('#last-name');
      const senderEmail = getValue('#email');
      const phone = getValue('#phone');
      const organisation = getValue('#organisation');
      const enquiryType = getValue('#enquiry-type');
      const message = getValue('#message');

      const subject = 'Website Enquiry - ' + (enquiryType || 'General');
      const body =
        'Name: ' + [firstName, lastName].filter(Boolean).join(' ') + '\n' +
        'Email: ' + senderEmail + '\n' +
        'Phone: ' + (phone || 'N/A') + '\n' +
        'Organisation: ' + (organisation || 'N/A') + '\n' +
        'Enquiry Type: ' + (enquiryType || 'General') + '\n\n' +
        'Message:\n' + message;

      const mailtoUrl =
        'mailto:zeempublishing01@gmail.com' +
        '?bcc=' + encodeURIComponent('habibiff16@gmail.com') +
        '&subject=' + encodeURIComponent(subject) +
        '&body=' + encodeURIComponent(body);

      window.location.href = mailtoUrl;

      setTimeout(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        if (formSuccess) {
          formSuccess.classList.add('visible');
          setTimeout(function () {
            formSuccess.classList.remove('visible');
          }, 6000);
        }
      }, 350);
    });
 
    // Clear red border on input
    contactForm.querySelectorAll('input, textarea, select').forEach(function (el) {
      el.addEventListener('input', function () {
        this.style.borderColor = '';
      });
    });
  }
 
  /* ── Smooth Scroll for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = siteHeader ? siteHeader.offsetHeight + 16 : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
 
  /* ── Scroll-reveal Fade-In ── */
  (function initReveal() {
    const revealEls = document.querySelectorAll(
      '.card, .service-card, .pub-card, .strength-card, .why-item, ' +
      '.contact-card, .service-full-card, .book-item, .intro-feat-item'
    );
 
    if (!('IntersectionObserver' in window)) return;
 
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
 
    revealEls.forEach(function (el, i) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(22px)';
      el.style.transition = 'opacity 0.5s ease ' + (i % 4) * 0.08 + 's, transform 0.5s ease ' + (i % 4) * 0.08 + 's';
      observer.observe(el);
    });
  })();
 
})();
 
