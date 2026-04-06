/* ========================================
   HORIZON BUILD GROUP - JAVASCRIPT
   Interactions and functionality
======================================== */

document.addEventListener('DOMContentLoaded', function() {
    
    /* ========================================
       MOBILE NAVIGATION TOGGLE
    ======================================== */
    const navToggle = document.getElementById('navToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');
    
    navToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
        });
    });
    
    /* ========================================
       STICKY HEADER ON SCROLL
    ======================================== */
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    /* ========================================
       SMOOTH SCROLL FOR ANCHOR LINKS
    ======================================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    /* ========================================
       QUOTE FORM HANDLING
    ======================================== */
    const quoteForm = document.getElementById('quoteForm');
    const formMessage = document.getElementById('formMessage');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate required fields
            const required = ['name', 'email', 'phone', 'projectType', 'timeline', 'message'];
            let isValid = true;
            
            required.forEach(field => {
                if (!data[field] || data[field].trim() === '') {
                    isValid = false;
                    const input = document.getElementById(field);
                    if (input) {
                        input.style.borderColor = '#dc3545';
                    }
                } else {
                    const input = document.getElementById(field);
                    if (input) {
                        input.style.borderColor = '';
                    }
                }
            });
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (data.email && !emailRegex.test(data.email)) {
                isValid = false;
                document.getElementById('email').style.borderColor = '#dc3545';
            }
            
            if (isValid) {
                // Simulate form submission
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Thank you for your enquiry! We will contact you within 24 hours.';
                quoteForm.reset();
                
                // Scroll to message
                formMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Hide message after 10 seconds
                setTimeout(() => {
                    formMessage.className = 'form-message';
                    formMessage.textContent = '';
                }, 10000);
            } else {
                formMessage.className = 'form-message error';
                formMessage.textContent = 'Please fill in all required fields correctly.';
            }
        });
        
        // Reset border color on input focus
        quoteForm.querySelectorAll('input, select, textarea').forEach(input => {
            input.addEventListener('focus', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    /* ========================================
       SCROLL ANIMATIONS
    ======================================== */
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.about-card, .service-category, .why-card, .project-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    /* ========================================
       HEADER SCROLL EFFECT
    ======================================== */
    let prevScrollPos = window.pageYOffset;
    
    window.onscroll = function() {
        const currentScrollPos = window.pageYOffset;
        
        if (currentScrollPos > 50) {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        prevScrollPos = currentScrollPos;
    };
    
    /* ========================================
       ACTIVE NAV LINK ON SCROLL
    ======================================== */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-list li a');
    
    const highlightNav = () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#' + current) {
                item.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', highlightNav);
    highlightNav();
    
    /* ========================================
       LAZY LOAD IMAGES
    ======================================== */
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    /* ========================================
       PROJECT CARD CLICK (Lightbox effect)
    ======================================== */
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.project-overlay span');
            
            // Simple alert for demo - can be enhanced with lightbox
            if (overlay) {
                alert('Project: ' + overlay.textContent);
            }
        });
    });
    
    /* ========================================
       PHONE NUMBER FORMATTING
    ======================================== */
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            if (value.length >= 4) {
                value = value.slice(0, 4) + ' ' + value.slice(4);
            }
            if (value.length >= 8) {
                value = value.slice(0, 8) + ' ' + value.slice(8);
            }
            
            e.target.value = value;
        });
    }
    
    /* ========================================
       ESCAPE KEY TO CLOSE MOBILE NAV
    ======================================== */
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            navToggle.classList.remove('active');
            nav.classList.remove('active');
        }
    });
    
    /* ========================================
       BACK TO TOP BUTTON (if needed)
    ======================================== */
    const backToTop = () => {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        
        if (scrollTop > 500) {
            document.querySelector('.floating-call')?.classList.add('show');
        } else {
            document.querySelector('.floating-call')?.classList.remove('show');
        }
    };
    
    window.addEventListener('scroll', backToTop);
    
    console.log('Horizon Build Group website loaded successfully!');
});
