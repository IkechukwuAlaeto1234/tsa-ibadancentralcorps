// Site Loader JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize loader
    initializeSiteLoader();
    
    // Initialize other components after loader
    initializeNavigation();
    initializeBackToTop();
    initializeScrollAnimations();
});

function initializeSiteLoader() {
    const loader = document.querySelector('.site-loader-modal');
    const progressBar = document.querySelector('.loader-progress-bar');
    const loaderText = document.querySelector('.loader-text');
    
    if (!loader || !progressBar || !loaderText) {
        console.warn('Loader elements not found');
        return;
    }
    
    // Loading messages
    const loadingMessages = [
        'Initializing...',
        'Loading content...',
        'Preparing experience...',
        'Almost ready...',
        'Welcome!'
    ];
    
    let currentMessageIndex = 0;
    let progress = 0;
    
    // Simulate loading progress
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15 + 5; // Random increment between 5-20
        
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            completeLoading();
        }
        
        // Update progress bar
        progressBar.style.width = `${progress}%`;
        
        // Update loading message
        if (progress > (currentMessageIndex + 1) * 20 && currentMessageIndex < loadingMessages.length - 1) {
            currentMessageIndex++;
            loaderText.textContent = loadingMessages[currentMessageIndex];
        }
    }, 200);
    
    // Ensure minimum loading time of 2 seconds
    setTimeout(() => {
        if (progress < 100) {
            progress = 100;
            progressBar.style.width = '100%';
            loaderText.textContent = loadingMessages[loadingMessages.length - 1];
            clearInterval(loadingInterval);
            setTimeout(completeLoading, 500);
        }
    }, 2000);
    
    function completeLoading() {
        // Add fade out animation
        loader.style.opacity = '0';
        
        // Remove loader from DOM after animation
        setTimeout(() => {
            loader.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            
            // Trigger any post-load animations
            triggerPostLoadAnimations();
        }, 500);
    }
}

function triggerPostLoadAnimations() {
    // Add entrance animations to main content
    const mainContent = document.querySelector('main');
    if (mainContent) {
        mainContent.style.opacity = '0';
        mainContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            mainContent.style.transition = 'all 0.8s ease-out';
            mainContent.style.opacity = '1';
            mainContent.style.transform = 'translateY(0)';
        }, 100);
    }
    
    // Animate header
    const header = document.querySelector('.header');
    if (header) {
        header.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            header.style.transition = 'transform 0.6s ease-out';
            header.style.transform = 'translateY(0)';
        }, 300);
    }
}

function initializeNavigation() {
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    

    // Mobile menu toggle
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animate hamburger icon (if you have one)
            mobileToggle.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        });
    }
    
    // Active navigation highlighting
    highlightActiveNavigation();
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        if (link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

function highlightActiveNavigation() {
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '-100px 0px -50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function initializeBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (!backToTopBtn) return;
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
        
        // Add pulse effect when near bottom
        if (window.scrollY > document.documentElement.scrollHeight - window.innerHeight - 100) {
            backToTopBtn.classList.add('pulse');
        } else {
            backToTopBtn.classList.remove('pulse');
        }
    });
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function initializeScrollAnimations() {
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('.leader-card, .value-card, .timeline-item, .mission, .vision');
    
    if (animateElements.length === 0) return;
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Set initial state and observe elements
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(element);
    });
}

// Newsletter form handling
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.footer-newsletter form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const submitBtn = this.querySelector('button');
            
            if (emailInput && emailInput.value) {
                // Simulate newsletter signup
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Subscribing...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.textContent = 'Subscribed!';
                    submitBtn.style.background = '#28a745';
                    emailInput.value = '';
                    
                    setTimeout(() => {
                        submitBtn.textContent = originalText;
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                    }, 2000);
                }, 1000);
            }
        });
    }
});

// Prevent body scroll during loading
document.body.style.overflow = 'hidden';

// Handle page refresh - reset loader
window.addEventListener('beforeunload', function() {
    const loader = document.querySelector('.site-loader-modal');
    if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
    }
});

// Performance optimization - preload critical resources
function preloadCriticalResources() {
    const criticalImages = [
        // Add paths to your critical images here
        // 'images/logo.png',
        // 'images/hero-bg.jpg'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = 'image';
        document.head.appendChild(link);
    });
}

// Call preload function
preloadCriticalResources();