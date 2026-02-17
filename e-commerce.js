// Countdown Timer Function
function updateCountdown() {
    // Set target date (3 days, 23 hours, 19 minutes, 56 seconds from now)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);
    targetDate.setHours(targetDate.getHours() + 23);
    targetDate.setMinutes(targetDate.getMinutes() + 19);
    targetDate.setSeconds(targetDate.getSeconds() + 56);

    function update() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update countdown display
        const timeValues = document.querySelectorAll('.time-value');
        if (timeValues.length >= 4) {
            timeValues[0].textContent = String(days).padStart(2, '0');
            timeValues[1].textContent = String(hours).padStart(2, '0');
            timeValues[2].textContent = String(minutes).padStart(2, '0');
            timeValues[3].textContent = String(seconds).padStart(2, '0');
        }

        // Update circle countdown for music banner
        const circleValues = document.querySelectorAll('.circle-time .time-value');
        if (circleValues.length >= 4) {
            circleValues[0].textContent = String(hours).padStart(2, '0');
            circleValues[1].textContent = String(days).padStart(2, '0');
            circleValues[2].textContent = String(minutes).padStart(2, '0');
            circleValues[3].textContent = String(seconds).padStart(2, '0');
        }

        // Stop countdown if time is up
        if (distance < 0) {
            clearInterval(countdownInterval);
            timeValues.forEach(val => val.textContent = '00');
        }
    }

    update();
    const countdownInterval = setInterval(update, 1000);
}

// Carousel Navigation Functions
function previousSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) {
            carouselInstance.prev();
        }
    }
}

function nextSlide(carouselId) {
    const carousel = document.getElementById(carouselId);
    if (carousel) {
        const carouselInstance = bootstrap.Carousel.getInstance(carousel);
        if (carouselInstance) {
            carouselInstance.next();
        }
    }
}

// Product Card Interactions
function initializeProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Add to Cart Button
        const addToCartBtn = card.querySelector('.btn-add-cart');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function() {
                // Add animation
                this.textContent = 'Added!';
                this.style.backgroundColor = '#00FF66';
                
                setTimeout(() => {
                    this.textContent = 'Add To Cart';
                    this.style.backgroundColor = '#000';
                }, 2000);
            });
        }

        // Wishlist Button
        const wishlistBtn = card.querySelector('.btn-action:first-child');
        if (wishlistBtn) {
            wishlistBtn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                if (icon.classList.contains('bi-heart')) {
                    icon.classList.remove('bi-heart');
                    icon.classList.add('bi-heart-fill');
                    this.style.color = '#DB4444';
                } else {
                    icon.classList.remove('bi-heart-fill');
                    icon.classList.add('bi-heart');
                    this.style.color = '';
                }
            });
        }
    });
}

// Category Card Interactions
function initializeCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');
        });
    });
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-box input');
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log('Searching for:', searchTerm);
                    // Add your search logic here
                    alert(`Searching for: ${searchTerm}`);
                }
            }
        });
    }
}

// Smooth Scroll for Navigation
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar Scroll Effect
function initializeNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-sm');
        } else {
            navbar.classList.remove('shadow-sm');
        }
    });
}

// Lazy Loading Images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
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
    
    images.forEach(img => imageObserver.observe(img));
}

// Cart Count Update (Demo)
function updateCartCount() {
    const cartIcon = document.querySelector('.bi-cart3');
    if (cartIcon) {
        // This would connect to your actual cart system
        const cartCount = 0;
        if (cartCount > 0) {
            const badge = document.createElement('span');
            badge.className = 'position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger';
            badge.textContent = cartCount;
            cartIcon.parentElement.classList.add('position-relative');
            cartIcon.parentElement.appendChild(badge);
        }
    }
}

// Mobile Menu Enhancements
function initializeMobileMenu() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Close menu when clicking a link
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });
    }
}

// Initialize AOS (Animate On Scroll) - Optional Enhancement
function initializeAnimations() {
    // Add fade-in animation to sections as they come into view
    const sections = document.querySelectorAll('section');
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
}

// View All Products Button
function initializeViewAllButton() {
    const viewAllBtn = document.querySelector('.btn-danger.btn-lg');
    if (viewAllBtn) {
        viewAllBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('View all products clicked');
            // Add your navigation logic here
        });
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize countdown timer
    updateCountdown();
    
    // Initialize product card interactions
    initializeProductCards();
    
    // Initialize category cards
    initializeCategoryCards();
    
    // Initialize search
    initializeSearch();
    
    // Initialize smooth scroll
    initializeSmoothScroll();
    
    // Initialize navbar scroll effect
    initializeNavbarScroll();
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Update cart count
    updateCartCount();
    
    // Initialize mobile menu
    initializeMobileMenu();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize view all button
    initializeViewAllButton();
    
    console.log('E-Commerce website initialized successfully!');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        // Reinitialize elements that need adjustment on resize
        console.log('Window resized');
    }, 250);
});

// Prevent default form submission on search
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('search-form')) {
        e.preventDefault();
    }
});