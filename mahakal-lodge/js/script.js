/**
 * ==========================================================================
 * MAHAKAL LODGE — Premium Hospitality Script
 * Pure Vanilla JavaScript (No Frameworks, No External Dependencies)
 * ==========================================================================
 */

'use strict';

/* ==========================================================================
   1. EDITABLE LODGE CONFIGURATION
   Easily update phone, WhatsApp, email, rates & details in this single section.
   ========================================================================== */
const LODGE_CONFIG = {
  // Lodge Details
  name: "MAHAKAL LODGE",
  altName: "महाकाल ईन लॉज २",
  tagline: "Comfortable Stay. Peaceful Experience.",
  subTagline: "24-Hour Hospitality • Balaji Mandir Road • Nanded",
  
  // Location & Address (Coordinates: 19°08'57.8"N 77°19'02.3"E)
  address: "Near Balaji Mandir, Old Mondha, Nanded, Maharashtra - 431601",
  coordinates: {
    lat: 19.149389,
    lng: 77.317306,
    dms: "19°08'57.8\"N 77°19'02.3\"E"
  },
  
  // Contact Information
  phone: "+91 8888067173",
  phoneRaw: "8888067173",
  whatsapp: "+91 8888067173",
  whatsappClean: "918888067173", // Digits only with country code
  email: "contact@mahakallodge.com",
  
  // Direct Google Maps Navigation Links
  googleMapsDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=19.149389,77.317306",
  googleMapsViewUrl: "https://www.google.com/maps/search/?api=1&query=19.149389,77.317306",
  
  // Stay Timings & Pricing Guidance (Transparent placeholders)
  checkInTime: "12:00 PM",
  checkOutTime: "11:00 AM",
  pricingNote: "Contact for Rates / Best Price Guaranteed",

  // Room Types
  rooms: [
    {
      id: "deluxe-ac",
      name: "Deluxe AC Room",
      badge: "Most Popular",
      price: "Best Rates On Request",
      priceSub: "Per Night + Taxes",
      image: "images/hero-room.jpg",
      fallbackImage: "WhatsApp Image 2026-08-27 at 3.33.38 AM.jpeg",
      desc: "Spacious luxury room featuring contemporary warm cove ceiling illumination, plush king-size bed, air conditioning, private attached bathroom, and elegant seating.",
      amenities: ["Air Conditioning", "King Bed", "Balcony View", "Free Wi-Fi", "Warm Ambient Light", "24/7 Water"]
    },
    {
      id: "executive-double",
      name: "Executive Double Room",
      badge: "Comfort & Style",
      price: "Best Rates On Request",
      priceSub: "Per Night + Taxes",
      image: "images/executive-room.jpg",
      fallbackImage: "WhatsApp Image 2026-08-27 at 3.33.41 AM.jpeg",
      desc: "Thoughtfully furnished room with a full dressing vanity, fresh hotel linens, calm ambience, high-speed Wi-Fi, and personalized 24-hour room assistance.",
      amenities: ["Double Bed", "Vanity Mirror", "Daily Housekeeping", "Free Wi-Fi", "LED TV", "Hot Shower"]
    },
    {
      id: "master-suite",
      name: "Premium Family Suite",
      badge: "Spacious Stay",
      price: "Best Rates On Request",
      priceSub: "Per Night + Taxes",
      image: "images/master-suite.jpg",
      fallbackImage: "WhatsApp Image 2026-08-27 at 3.33.41 AM (1).jpeg",
      desc: "Expansive suite designed for families and pilgrims with dual windows, abundant natural light, modern false ceiling styling, cozy duvet, and extra luggage space.",
      amenities: ["Family Bedding", "Twin Windows", "Air Cooled / AC", "24/7 Front Desk", "CCTV Security", "Spacious Layout"]
    }
  ]
};


/* ==========================================================================
   2. DOM INITIALIZATION
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initBookButtonsRedirect();
  initContactForm();
  initGalleryLightbox();
  initScrollAnimations();
  initBackToTop();
  initDynamicConfig();
  initImageFallbacks();
});


/* ==========================================================================
   3. DYNAMIC CONFIG POPULATION
   Injects config values into matching data attributes across the DOM
   ========================================================================== */
function initDynamicConfig() {
  // Update phone numbers
  document.querySelectorAll('[data-config="phone"]').forEach(el => {
    el.textContent = LODGE_CONFIG.phone;
    if (el.tagName === 'A') el.href = `tel:${LODGE_CONFIG.phoneRaw}`;
  });

  // Update WhatsApp numbers & links
  document.querySelectorAll('[data-config="whatsapp"]').forEach(el => {
    el.textContent = LODGE_CONFIG.whatsapp;
    if (el.tagName === 'A') {
      el.href = `https://wa.me/${LODGE_CONFIG.whatsappClean}?text=${encodeURIComponent('Hello Mahakal Lodge, I would like to inquire about room booking.')}`;
    }
  });

  // Update Email
  document.querySelectorAll('[data-config="email"]').forEach(el => {
    el.textContent = LODGE_CONFIG.email;
    if (el.tagName === 'A') el.href = `mailto:${LODGE_CONFIG.email}`;
  });

  // Update Directions buttons
  document.querySelectorAll('[data-config="directions"]').forEach(el => {
    if (el.tagName === 'A') el.href = LODGE_CONFIG.googleMapsDirectionsUrl;
  });

  // Update Address
  document.querySelectorAll('[data-config="address"]').forEach(el => {
    el.textContent = LODGE_CONFIG.address;
  });
}


/* ==========================================================================
   4. NAVBAR & NAVIGATION
   Sticky header, mobile hamburger drawer, smooth scrolling, active link spy
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  // Header scroll shadow and shrink
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting via scroll position
    let currentId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  const toggleMobileMenu = (state) => {
    const shouldOpen = typeof state === 'boolean' ? state : !navMenu.classList.contains('active');
    hamburger.classList.toggle('active', shouldOpen);
    navMenu.classList.toggle('active', shouldOpen);
    overlay.classList.toggle('active', shouldOpen);
    hamburger.setAttribute('aria-expanded', shouldOpen);
    document.body.classList.toggle('no-scroll', shouldOpen);
  };

  if (hamburger) {
    hamburger.addEventListener('click', () => toggleMobileMenu());
  }

  if (overlay) {
    overlay.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Smooth scroll and auto-close mobile drawer on link click
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        toggleMobileMenu(false);

        const headerOffset = 76;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Close drawer on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMobileMenu(false);
    }
  });
}


/* ==========================================================================
   5. BOOKING BUTTONS REDIRECTION TO CONTACT
   Redirects room booking requests to the contact & inquiry section
   and pre-populates the inquiry message with room details.
   ========================================================================== */
function initBookButtonsRedirect() {
  document.querySelectorAll('.btn-book-room').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomId = btn.getAttribute('data-room-id');
      const room = LODGE_CONFIG.rooms ? LODGE_CONFIG.rooms.find(r => r.id === roomId) : null;
      const roomTitle = room ? room.name : (btn.closest('.room-card')?.querySelector('.room-title')?.textContent?.trim() || 'Room');

      const contactSection = document.getElementById('contact');
      if (contactSection) {
        const headerOffset = 76;
        const offsetPosition = contactSection.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }

      const messageInput = document.getElementById('contactMessage');
      if (messageInput) {
        messageInput.value = `Hello, I would like to inquire about booking the ${roomTitle}. Please share tariff and availability details.`;
        setTimeout(() => {
          messageInput.focus();
        }, 500);
      }
    });
  });
}


/* ==========================================================================
   7. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !phone || !message) {
      alert('Please fill out your Name, Phone Number, and Message.');
      return;
    }

    // Direct to WhatsApp or show feedback
    const text = `*GENERAL INQUIRY — MAHAKAL LODGE*\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:* ${message}`;
    const url = `https://wa.me/${LODGE_CONFIG.whatsappClean}?text=${encodeURIComponent(text)}`;
    
    window.open(url, '_blank');
    alert('Thank you! Your message has been prepared for WhatsApp. We will assist you promptly.');
    contactForm.reset();
  });
}


/* ==========================================================================
   8. FULLSCREEN GALLERY LIGHTBOX
   Modal lightbox with previous/next, keyboard controls, and touch swipe
   ========================================================================== */
function initGalleryLightbox() {
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!lightbox || galleryItems.length === 0) return;

  // Build items array from DOM
  const images = [];
  galleryItems.forEach((item, index) => {
    const img = item.querySelector('img');
    const title = item.querySelector('.gallery-caption')?.textContent || `Lodge Photograph ${index + 1}`;
    const sub = item.querySelector('.gallery-sub')?.textContent || 'MAHAKAL LODGE';

    images.push({
      src: img.getAttribute('src'),
      alt: img.getAttribute('alt') || title,
      title: title,
      sub: sub
    });

    item.addEventListener('click', () => {
      openLightbox(index);
    });
  });

  let currentIndex = 0;

  const updateLightbox = () => {
    const current = images[currentIndex];
    lightboxImg.src = current.src;
    lightboxImg.alt = current.alt;
    lightboxTitle.textContent = `${current.title} • ${current.sub}`;
    lightboxCounter.textContent = `${currentIndex + 1} / ${images.length}`;
  };

  const openLightbox = (index) => {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.classList.add('no-scroll');
  };

  const closeLightbox = () => {
    lightbox.classList.remove('active');
    document.body.classList.remove('no-scroll');
  };

  const showNext = () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateLightbox();
  };

  const showPrev = () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateLightbox();
  };

  // Button clicks
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Click outside to close
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;

    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') showNext();
    else if (e.key === 'ArrowLeft') showPrev();
  });

  // Mobile touch swipe gestures
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 50) {
      if (diff < 0) showNext(); // Swiped left -> next
      else showPrev();          // Swiped right -> prev
    }
  }, { passive: true });
}


/* ==========================================================================
   9. SCROLL REVEAL ANIMATIONS
   Lightweight IntersectionObserver reveal
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is unavailable
    revealElements.forEach(el => el.classList.add('active'));
  }
}


/* ==========================================================================
   10. BACK-TO-TOP FLOATING BUTTON
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


/* ==========================================================================
   11. IMAGE FALLBACK SYSTEM
   Automatically falls back to original filenames if aliased files aren't found
   ========================================================================== */
function initImageFallbacks() {
  const fallbackMap = {
    'images/hero-room.jpg': 'WhatsApp Image 2026-08-27 at 3.33.38 AM.jpeg',
    'images/deluxe-room.jpg': 'WhatsApp Image 2026-08-27 at 3.33.37 AM.jpeg',
    'images/corridor-reception.jpg': 'WhatsApp Image 2026-08-27 at 3.33.36 AM.jpeg',
    'images/executive-room.jpg': 'WhatsApp Image 2026-08-27 at 3.33.41 AM.jpeg',
    'images/master-suite.jpg': 'WhatsApp Image 2026-08-27 at 3.33.41 AM (1).jpeg',
    'images/lodge-poster.jpg': 'WhatsApp Image 2026-08-27 at 3.33.35 AM.jpeg'
  };

  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
      const src = this.getAttribute('src');
      if (fallbackMap[src]) {
        // First fallback: try parent directory WhatsApp filename
        this.src = '../' + fallbackMap[src];
      } else if (src.startsWith('images/')) {
        const basename = src.replace('images/', '');
        this.src = '../' + basename;
      }
    });
  });
}
