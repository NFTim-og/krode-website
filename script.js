/**
 * KRODE Website - JavaScript Interactions
 * Modern animations, scroll effects, and interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavbar();
  initScrollAnimations();
  initCounterAnimations();
  initContactForm();
  initSmoothScroll();
  initPortfolioFilter();
  initChatbot();
  initLanguageSwitcher();
  initBackToTop();
  initCookieBanner();
  initFAQ();
  initExitIntent();
  loadPlaceholderImages();
});

/**
 * Navbar functionality
 * - Scroll effect (background on scroll)
 * - Mobile menu toggle
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Navbar scroll effect
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
  });

  // Mobile menu toggle
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  });

  // Close mobile menu when clicking on a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Scroll-triggered animations using Intersection Observer
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionally unobserve after animation
        // observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(element => {
    observer.observe(element);
  });
}

/**
 * Counter animations for statistics
 */
function initCounterAnimations() {
  const counters = document.querySelectorAll('[data-target]');

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        animateCounter(counter, target);
        observer.unobserve(counter);
      }
    });
  }, observerOptions);

  counters.forEach(counter => {
    observer.observe(counter);
  });
}

/**
 * Animate a counter from 0 to target value
 */
function animateCounter(element, target) {
  const duration = 2000; // 2 seconds
  const frameDuration = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameDuration);
  const easeOutQuad = t => t * (2 - t);

  let frame = 0;

  const counter = setInterval(() => {
    frame++;
    const progress = easeOutQuad(frame / totalFrames);
    const currentValue = Math.round(target * progress);

    element.textContent = currentValue + (target >= 100 ? '+' : '');

    if (frame === totalFrames) {
      clearInterval(counter);
      element.textContent = target + '+';
    }
  }, frameDuration);
}

/**
 * Contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contactForm');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Show success message (in production, this would send to a server)
    const button = form.querySelector('button[type="submit"]');
    const originalContent = button.innerHTML;

    button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Missatge Enviat!
    `;
    button.style.background = '#22c55e';
    button.disabled = true;

    // Reset form
    form.reset();

    // Reset button after 3 seconds
    setTimeout(() => {
      button.innerHTML = originalContent;
      button.style.background = '';
      button.disabled = false;
    }, 3000);

    console.log('Form submitted:', data);
  });
}

/**
 * Smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      const navbarHeight = document.getElementById('navbar').offsetHeight;
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

/**
 * Load placeholder images with gradients
 * In production, replace with actual images
 */
function loadPlaceholderImages() {
  // Define placeholder colors for each product/section
  const imagePlaceholders = {
    'aboutImage': createGradientPlaceholder('#1a1a2e', '#16213e', '800x600'),
    'productImg1': createGradientPlaceholder('#2d3436', '#636e72', '600x400'),
    'productImg2': createGradientPlaceholder('#0c0c0c', '#434343', '600x400'),
    'productImg3': createGradientPlaceholder('#8b0000', '#2c0000', '600x400'),
    'productImg4': createGradientPlaceholder('#1e3a5f', '#0d1b2a', '600x400'),
    'productImg5': createGradientPlaceholder('#3d3d3d', '#1a1a1a', '600x400'),
    'productImg6': createGradientPlaceholder('#ff6b35', '#2d2d2d', '600x400'),
    'sectorImg1': createGradientPlaceholder('#1a1a2e', '#0f0f1a', '800x600'),
    'sectorImg2': createGradientPlaceholder('#2c3e50', '#1a252f', '800x600')
  };

  // Apply placeholders to images that fail to load
  Object.keys(imagePlaceholders).forEach(id => {
    const img = document.getElementById(id);
    if (img) {
      img.onerror = () => {
        img.src = imagePlaceholders[id];
      };
      // Trigger error handler if image doesn't exist
      if (!img.complete || img.naturalHeight === 0) {
        img.src = imagePlaceholders[id];
      }
    }
  });
}

/**
 * Create a gradient placeholder image as data URL
 */
function createGradientPlaceholder(color1, color2, size = '800x600') {
  const [width, height] = size.split('x').map(Number);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, color1);
  gradient.addColorStop(1, color2);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  // Add subtle pattern
  ctx.fillStyle = 'rgba(255, 255, 255, 0.02)';
  for (let i = 0; i < width; i += 40) {
    ctx.fillRect(i, 0, 1, height);
  }
  for (let i = 0; i < height; i += 40) {
    ctx.fillRect(0, i, width, 1);
  }

  // Add door icon in center
  ctx.strokeStyle = 'rgba(255, 107, 53, 0.3)';
  ctx.lineWidth = 3;

  const iconSize = Math.min(width, height) * 0.15;
  const centerX = width / 2;
  const centerY = height / 2;

  // Draw door shape
  ctx.beginPath();
  ctx.roundRect(centerX - iconSize / 2, centerY - iconSize / 2, iconSize, iconSize, 8);
  ctx.stroke();

  // Draw handle
  ctx.beginPath();
  ctx.arc(centerX + iconSize / 4, centerY, 4, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 107, 53, 0.5)';
  ctx.fill();

  return canvas.toDataURL('image/jpeg', 0.8);
}

/**
 * Portfolio filter functionality
 */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      // Filter items with animation
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          item.classList.remove('hidden');
          // Trigger reflow for animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
            item.classList.add('hidden');
          }, 400);
        }
      });
    });
  });
}

/**
 * Parallax effect for hero section (subtle)
 */
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');

  if (hero && heroContent && scrolled < window.innerHeight) {
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
  }
});

/**
 * Add slight 3D tilt effect to product cards
 */
document.querySelectorAll('.product-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    const inner = card.querySelector('.product-card-inner');
    if (inner) {
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  });

  card.addEventListener('mouseleave', () => {
    const inner = card.querySelector('.product-card-inner');
    if (inner) {
      inner.style.transform = 'rotateX(0) rotateY(0)';
    }
  });
});

/**
 * PORTA Chatbot functionality
 */
function initChatbot() {
  const widget = document.getElementById('chatbotWidget');
  const toggle = document.getElementById('chatbotToggle');
  const closeBtn = document.getElementById('chatbotClose');
  const messagesContainer = document.getElementById('chatbotMessages');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const quickReplies = document.querySelectorAll('.quick-reply');
  const label = document.querySelector('.chatbot-label');

  if (!widget) return;

  // Toggle chat window
  toggle.addEventListener('click', () => {
    widget.classList.toggle('open');
  });

  // Label click also opens chat
  if (label) {
    label.addEventListener('click', () => {
      widget.classList.add('open');
    });
  }

  closeBtn.addEventListener('click', () => {
    widget.classList.remove('open');
  });

  // Send message
  function sendMessage(text) {
    if (!text.trim()) return;

    // Add user message
    addMessage(text, 'user');
    input.value = '';

    // Show typing indicator
    showTyping();

    // Simulate bot response
    setTimeout(() => {
      hideTyping();
      const response = getBotResponse(text);
      addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
  }

  function addMessage(text, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${type}`;
    messageDiv.innerHTML = `<div class="message-content"><p>${text}</p></div>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `<div class="message-content"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function hideTyping() {
    const typing = document.getElementById('typingIndicator');
    if (typing) typing.remove();
  }

  function getBotResponse(text) {
    const lowerText = text.toLowerCase();

    if (lowerText.includes('producte') || lowerText.includes('producto') || lowerText.includes('porta') || lowerText.includes('puerta')) {
      return `Oferim una àmplia gamma de productes:<br><br>
        🚪 <strong>Portes Seccionals</strong> - Aïllament tèrmic i acústic<br>
        ⚡ <strong>Portes Ràpides</strong> - Alta velocitat per a zones de trànsit<br>
        🔥 <strong>Portes Tallafocs</strong> - Certificades segons normativa europea<br>
        📦 <strong>Molls de Càrrega</strong> - Sistemes de càrrega i descàrrega<br>
        🔄 <strong>Portes Enrotllables</strong> - Estalvi d'espai<br>
        ⚙️ <strong>Motorització</strong> - Automatització intel·ligent<br><br>
        Vols més informació sobre algun producte en concret?`;
    }

    if (lowerText.includes('manteniment') || lowerText.includes('mantenimiento') || lowerText.includes('reparaci')) {
      return `Oferim serveis de manteniment complets:<br><br>
        🔧 <strong>Manteniment Preventiu</strong> - Revisions periòdiques<br>
        🚨 <strong>Urgències 24h</strong> - Servei disponible tots els dies<br>
        ✅ <strong>Recanvis Originals</strong> - Garantia del fabricant<br>
        📋 <strong>Contractes de Manteniment</strong> - Preus preferents<br><br>
        Truca'ns al <strong>972 27 17 13</strong> per contractar!`;
    }

    if (lowerText.includes('ubica') || lowerText.includes('adreça') || lowerText.includes('direccion') || lowerText.includes('on esteu') || lowerText.includes('horari')) {
      return `📍 <strong>Adreça:</strong><br>
        Carrer Compositor Pep Ventura, 58<br>
        17800 Olot, Girona<br><br>
        🕐 <strong>Horari:</strong><br>
        Dilluns - Divendres: 7:45 - 17:00<br>
        Dissabte - Diumenge: Tancat<br><br>
        📞 Telèfon: <strong>972 27 17 13</strong><br>
        ✉️ Email: <strong>info@krode.com</strong>`;
    }

    if (lowerText.includes('pressupost') || lowerText.includes('presupuesto') || lowerText.includes('preu') || lowerText.includes('precio')) {
      return `Per sol·licitar un pressupost personalitzat, pots:<br><br>
        📝 Omplir el <a href="#contact" style="color: #EB5A28">formulari de contacte</a><br>
        📞 Trucar-nos al <strong>972 27 17 13</strong><br>
        ✉️ Enviar un email a <strong>info@krode.com</strong><br><br>
        Et respondrem el més aviat possible amb una proposta adaptada a les teves necessitats!`;
    }

    // Default response
    return `Gràcies pel teu missatge! Per a consultes específiques, et recomano:<br><br>
      📞 Trucar al <strong>972 27 17 13</strong><br>
      ✉️ Escriure a <strong>info@krode.com</strong><br><br>
      O utilitza els botons ràpids per explorar els nostres serveis!`;
  }

  // Event listeners
  sendBtn.addEventListener('click', () => sendMessage(input.value));
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage(input.value);
  });

  quickReplies.forEach(btn => {
    btn.addEventListener('click', () => {
      const message = btn.getAttribute('data-message');
      sendMessage(message);
    });
  });
}

/**
 * Language Switcher functionality
 */
function initLanguageSwitcher() {
  const langBtns = document.querySelectorAll('.lang-btn');

  if (langBtns.length === 0) return;

  // Store current language
  let currentLang = localStorage.getItem('krode-lang') || 'ca';

  // Set initial language
  setLanguage(currentLang);

  langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang') === currentLang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }

    btn.addEventListener('click', () => {
      langBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
      localStorage.setItem('krode-lang', lang);
    });
  });

  function setLanguage(lang) {
    currentLang = lang;

    // Update navigation links
    document.querySelectorAll('[data-ca][data-es]').forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });

    // Update HTML lang attribute
    document.documentElement.lang = lang;
  }
}

/**
 * Back to Top button functionality
 */
function initBackToTop() {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  // Show/hide on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  // Scroll to top on click
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Cookie consent banner functionality
 */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');

  if (!banner) return;

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('krode-cookies');

  if (!cookieChoice) {
    // Show banner after 2 seconds
    setTimeout(() => {
      banner.classList.add('visible');
    }, 2000);
  }

  // Accept cookies
  acceptBtn.addEventListener('click', () => {
    localStorage.setItem('krode-cookies', 'accepted');
    banner.classList.remove('visible');
  });

  // Decline cookies
  declineBtn.addEventListener('click', () => {
    localStorage.setItem('krode-cookies', 'declined');
    banner.classList.remove('visible');
  });
}

/**
 * FAQ accordion functionality
 */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });

      // Toggle current item
      item.classList.toggle('active');
    });
  });
}

/**
 * Exit intent popup functionality
 */
function initExitIntent() {
  const popup = document.getElementById('exitPopup');
  const closeBtn = document.getElementById('exitPopupClose');
  const ctaBtn = document.getElementById('exitPopupCTA');
  const overlay = popup?.querySelector('.exit-popup-overlay');

  if (!popup) return;

  // Check if already shown
  if (sessionStorage.getItem('krode-exit-shown')) return;

  // Show popup on exit intent (mouse leaves viewport)
  document.addEventListener('mouseout', (e) => {
    if (e.clientY < 50 && !sessionStorage.getItem('krode-exit-shown')) {
      popup.classList.add('visible');
      sessionStorage.setItem('krode-exit-shown', 'true');
    }
  });

  // Close popup
  const closePopup = () => {
    popup.classList.remove('visible');
  };

  closeBtn?.addEventListener('click', closePopup);
  overlay?.addEventListener('click', closePopup);
  ctaBtn?.addEventListener('click', closePopup);

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
  });
}

// Console welcome message
console.log('%c KRODE Website ', 'background: linear-gradient(135deg, #ff6b35, #e55a2b); color: white; font-size: 16px; padding: 10px 20px; border-radius: 8px; font-weight: bold;');
console.log('%c Designed with ❤️ for industrial excellence ', 'color: #888; font-size: 12px;');
console.log('%c PORTA AI Assistant Ready ', 'background: #22c55e; color: white; font-size: 12px; padding: 5px 10px; border-radius: 4px;');
