/**
* Template Name: Impact
* Updated: Sep 18 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/impact-bootstrap-business-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Sticky Header on Scroll
   */
  const selectHeader = document.querySelector('#header');
  if (selectHeader) {
    let headerOffset = selectHeader.offsetTop;
    let nextElement = selectHeader.nextElementSibling;

    const headerFixed = () => {
      if ((headerOffset - window.scrollY) <= 0) {
        selectHeader.classList.add('sticked');
        if (nextElement) nextElement.classList.add('sticked-header-offset');
      } else {
        selectHeader.classList.remove('sticked');
        if (nextElement) nextElement.classList.remove('sticked-header-offset');
      }
    }
    window.addEventListener('load', headerFixed);
    document.addEventListener('scroll', headerFixed);
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = document.querySelectorAll('#navbar a');

  function navbarlinksActive() {
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = document.querySelector(navbarlink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navbarlinksActive);
  document.addEventListener('scroll', navbarlinksActive);

  /**
   * Mobile nav toggle
   */
  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  document.querySelectorAll('#navbar a').forEach(navbarlink => {
    if (!navbarlink.hash) return;
    let section = document.querySelector(navbarlink.hash);
    if (!section) return;
    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });
  });

  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');
  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');
        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Initiate glightbox
   */
  if(typeof GLightbox !== 'undefined') {
    const glightbox = GLightbox({ selector: '.glightbox' });
  }

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /**
   * Initiate Pure Counter
   */
  if(typeof PureCounter !== 'undefined') {
    new PureCounter();
  }

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    if(typeof AOS !== 'undefined') {
      AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, mirror: false });
    }
  }
  window.addEventListener('load', () => { aos_init(); });

  /**
   * ---------------------------------------------------------
   * Secure WhatsApp Contact Form Integration
   * ---------------------------------------------------------
   */
  const contactForm = document.querySelector('.php-email-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Stop default form submission

      // Elements for UI feedback
      const loading = contactForm.querySelector('.loading');
      const errorMessage = contactForm.querySelector('.error-message');
      const sentMessage = contactForm.querySelector('.sent-message');
      
      if (loading) loading.style.display = 'block';
      if (errorMessage) errorMessage.style.display = 'none';
      if (sentMessage) sentMessage.style.display = 'none';

      // Wrap everything in try-catch so the page NEVER freezes
      try {
        // 1. Get Elements
        const nameEl = document.getElementById('name');
        const emailEl = document.getElementById('email');
        const subjectEl = document.getElementById('subject');
        const messageEl = contactForm.querySelector('textarea[name="message"]');

        // 2. Get Values (and Sanitize to prevent XSS)
        const rawName = nameEl ? nameEl.value : '';
        const rawEmail = emailEl ? emailEl.value : '';
        const rawSubject = subjectEl ? subjectEl.value : '';
        const rawMessage = messageEl ? messageEl.value : '';

        // Strip all HTML tags
        const name = rawName.replace(/<[^>]*>?/gm, '').trim();
        const email = rawEmail.replace(/<[^>]*>?/gm, '').trim();
        const subject = rawSubject.replace(/<[^>]*>?/gm, '').trim();
        const message = rawMessage.replace(/<[^>]*>?/gm, '').trim();

        // 3. Validation
        if (name.length < 2) {
          throw new Error('لطفا نام خود را به درستی وارد کنید.');
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          throw new Error('لطفا یک ایمیل معتبر وارد کنید.');
        }
        if (subject.length < 3) {
          throw new Error('لطفا موضوع را وارد کنید.');
        }
        if (message.length < 10) {
          throw new Error('متن پیام باید حداقل ۱۰ کاراکتر باشد.');
        }

        // 4. WhatsApp Settings
        // IMPORTANT: Replace this with your WhatsApp number (No spaces, no '+')
        const whatsappNumber = '93798241463'; 
        
        const text = `*پیام جدید از وب‌سایت*\n\n👤 *نام:* ${name}\n📧 *ایمیل:* ${email}\n📝 *موضوع:* ${subject}\n\n💬 *متن پیام:*\n${message}`;
        const encodedText = encodeURIComponent(text);
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

        // 5. Open WhatsApp
        window.open(whatsappURL, '_blank');

        // 6. Success
        if (loading) loading.style.display = 'none';
        if (sentMessage) sentMessage.style.display = 'block';
        contactForm.reset();

      } catch (error) {
        // If anything goes wrong, show the error message instead of freezing
        if (loading) loading.style.display = 'none';
        if (errorMessage) {
          errorMessage.textContent = error.message;
          errorMessage.style.display = 'block';
        }
      }
    });
  }

});