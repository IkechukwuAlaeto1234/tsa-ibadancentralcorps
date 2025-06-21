// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle with Full Screen Overlay
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;

    // Create close button for full screen menu
    function createCloseButton() {
        const closeBtn = document.createElement('button');
        closeBtn.className = 'nav-close-btn';
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 20px;
            right: 20px;
            background: none;
            border: none;
            font-size: 40px;
            color: white;
            cursor: pointer;
            z-index: 10000;
            padding: 10px;
            line-height: 1;
        `;
        return closeBtn;
    }

    // Function to open full screen menu
    function openFullScreenMenu() {
        if (navMenu) {
            navMenu.classList.add('active');
            mobileNavToggle.classList.add('active');
            body.style.overflow = 'hidden'; // Prevent body scrolling
            
            // Add close button if it doesn't exist
            if (!navMenu.querySelector('.nav-close-btn')) {
                const closeBtn = createCloseButton();
                navMenu.appendChild(closeBtn);
                
                // Close button event listener
                closeBtn.addEventListener('click', closeFullScreenMenu);
            }
        }
    }

    // Function to close full screen menu
    function closeFullScreenMenu() {
        if (navMenu) {
            navMenu.classList.remove('active');
            mobileNavToggle.classList.remove('active');
            body.style.overflow = ''; // Restore body scrolling
        }
    }

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                closeFullScreenMenu();
            } else {
                openFullScreenMenu();
            }
        });

        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', closeFullScreenMenu);
        });

        // Close mobile menu when clicking outside (on overlay background)
        navMenu.addEventListener('click', (e) => {
            if (e.target === navMenu) {
                closeFullScreenMenu();
            }
        });

        // Close menu with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeFullScreenMenu();
            }
        });
    }

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Active Navigation Link Highlighting with throttling
    let scrollTimeout;
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
        
        if (sections.length === 0) return;
        
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const scrollPosition = window.pageYOffset + headerHeight + 100;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });
        
        // If no section is active, check if we're at the top
        if (!current && window.pageYOffset < 100) {
            current = 'home';
        }
        
        // Update active class on navigation links
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            if (linkHref === '#' + current) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll event listener
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNavLink, 10);
    });
    
    // Initial call to set active link
    updateActiveNavLink();

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (header) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
            
            lastScrollTop = scrollTop;
        }
    });

    // Force initial display check
    setTimeout(() => {
        if (window.innerWidth > 768 && navMenu) {
            navMenu.style.display = '';
        }
    }, 100);

});

// Back to Top Button Functionality
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
        // Add pulse animation when first shown
        if (!backToTopBtn.classList.contains('pulse')) {
            backToTopBtn.classList.add('pulse');
            setTimeout(() => {
                        backToTopBtn.classList.remove('pulse');
                    }, 2000);
                }
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        // Testimonials Slider
        const testimonialSlides = document.querySelectorAll('.testimonial-slide');
        const testimonialNavBtns = document.querySelectorAll('.testimonial-nav-btn');
        let currentSlide = 0;

        function showTestimonial(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.style.display = i === index ? 'flex' : 'none';
            });
            
            testimonialNavBtns.forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
        }

        testimonialNavBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                currentSlide = index;
                showTestimonial(currentSlide);
            });
        });

        // Auto-play testimonials
        setInterval(() => {
            currentSlide = (currentSlide + 1) % testimonialSlides.length;
            showTestimonial(currentSlide);
        }, 5000);

        // Initialize first testimonial
        showTestimonial(0);

        // Gallery Lightbox
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${img.src}" alt="${img.alt}">
                        <span class="lightbox-close">&times;</span>
                    </div>
                `;
                document.body.appendChild(lightbox);
                
                lightbox.addEventListener('click', function(e) {
                    if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
                        document.body.removeChild(lightbox);
                    }
                });
            });
        });


        // Gallery Image Zoom and Description Handler
class GalleryManager {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item');
        this.modal = null;
        this.descriptions = {
            'people worshipping in sanctuary.jpeg': 'Join us every Sunday for our uplifting worship service. Experience the power of community prayer, inspiring sermons, and beautiful music in our sanctuary.',
            'youth-conference.jpeg': 'Our annual youth conference brings together young people from across the community for spiritual growth, fellowship, and inspiring workshops.',
            'community-outreach.jpeg': 'Serving our community with love and compassion through various outreach programs, food drives, and support for those in need.',
            'salvation-army-brass-band.jpg': 'Our talented brass band fills the air with beautiful music during worship services and community events, celebrating faith through song.',
            'christmas-charity-event.jpg': 'During the holiday season, we organize special charity events to spread joy and provide gifts and meals to families in need.',
            'salvation-army-young-people-sunday-school.jpg': 'Our children\'s Sunday school program provides engaging Bible lessons, fun activities, and spiritual guidance for young minds.',
            'womens-ministries-.jpg': 'Women\'s ministries offers fellowship, Bible study, and support for women of all ages in their spiritual journey and daily life.',
            'emergency-relief-efforts.webp': 'In times of crisis, we mobilize quickly to provide emergency relief, disaster response, and support to affected communities.'
        };
        this.init();
    }

    init() {
        this.createModal();
        this.attachEventListeners();
        this.addDescriptionElements();
    }

    // Add description elements to each gallery item
    addDescriptionElements() {
        this.galleryItems.forEach(item => {
            const img = item.querySelector('img');
            const filename = this.extractFilename(img.src);
            const description = this.descriptions[filename] || 'Experience the spirit of community and faith in action.';
            
            // Create description element
            const descElement = document.createElement('div');
            descElement.className = 'gallery-description';
            descElement.textContent = description;
            
            item.appendChild(descElement);
        });
    }

    // Extract filename from image src
    extractFilename(src) {
        return src.split('/').pop();
    }

    // Create modal for zoomed images
    createModal() {
        this.modal = document.createElement('div');
        this.modal.className = 'gallery-modal';
        this.modal.innerHTML = `
            <div class="modal-content">
                <span class="modal-close">&times;</span>
                <img class="modal-image" src="" alt="">
                <div class="modal-description"></div>
                <div class="modal-navigation">
                    <button class="modal-prev">&#10094;</button>
                    <button class="modal-next">&#10095;</button>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);
    }

    // Attach event listeners
    attachEventListeners() {
        // Gallery item interactions
        this.galleryItems.forEach((item, index) => {
            // Hover effects
            item.addEventListener('mouseenter', () => this.showDescription(item));
            item.addEventListener('mouseleave', () => this.hideDescription(item));
            
            // Click to zoom
            item.addEventListener('click', () => this.openModal(item, index));
        });

        // Modal interactions
        const closeBtn = this.modal.querySelector('.modal-close');
        const prevBtn = this.modal.querySelector('.modal-prev');
        const nextBtn = this.modal.querySelector('.modal-next');

        closeBtn.addEventListener('click', () => this.closeModal());
        prevBtn.addEventListener('click', () => this.navigateModal(-1));
        nextBtn.addEventListener('click', () => this.navigateModal(1));

        // Close modal on outside click
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (this.modal.classList.contains('active')) {
                switch(e.key) {
                    case 'Escape':
                        this.closeModal();
                        break;
                    case 'ArrowLeft':
                        this.navigateModal(-1);
                        break;
                    case 'ArrowRight':
                        this.navigateModal(1);
                        break;
                }
            }
        });
    }

    // Show description on hover
    showDescription(item) {
        const overlay = item.querySelector('.gallery-overlay');
        const description = item.querySelector('.gallery-description');
        
        overlay.style.opacity = '1';
        description.style.opacity = '1';
        description.style.transform = 'translateY(0)';
        
        // Add zoom effect to image
        const img = item.querySelector('img');
        img.style.transform = 'scale(1.1)';
    }

    // Hide description on mouse leave
    hideDescription(item) {
        const overlay = item.querySelector('.gallery-overlay');
        const description = item.querySelector('.gallery-description');
        
        overlay.style.opacity = '0';
        description.style.opacity = '0';
        description.style.transform = 'translateY(20px)';
        
        // Remove zoom effect from image
        const img = item.querySelector('img');
        img.style.transform = 'scale(1)';
    }

    // Open modal with zoomed image
    openModal(item, index) {
        const img = item.querySelector('img');
        const filename = this.extractFilename(img.src);
        const description = this.descriptions[filename] || 'Experience the spirit of community and faith in action.';
        
        const modalImg = this.modal.querySelector('.modal-image');
        const modalDesc = this.modal.querySelector('.modal-description');
        
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalDesc.textContent = description;
        
        this.currentIndex = index;
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Close modal
    closeModal() {
        this.modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    // Navigate through images in modal
    navigateModal(direction) {
        this.currentIndex += direction;
        
        if (this.currentIndex < 0) {
            this.currentIndex = this.galleryItems.length - 1;
        } else if (this.currentIndex >= this.galleryItems.length) {
            this.currentIndex = 0;
        }
        
        const item = this.galleryItems[this.currentIndex];
        const img = item.querySelector('img');
        const filename = this.extractFilename(img.src);
        const description = this.descriptions[filename] || 'Experience the spirit of community and faith in action.';
        
        const modalImg = this.modal.querySelector('.modal-image');
        const modalDesc = this.modal.querySelector('.modal-description');
        
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalDesc.textContent = description;
    }
}

// Enhanced CSS styles (add these to your stylesheet)
const additionalStyles = `
    .gallery-item {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        border-radius: 8px;
        transition: transform 0.3s ease;
    }

    .gallery-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(0,0,0,0.3);
    }

    .gallery-item img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }

    .gallery-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(45deg, rgba(0,0,0,0.6), rgba(0,0,0,0.3));
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .gallery-overlay i {
        color: white;
        font-size: 2rem;
        animation: pulse 2s infinite;
    }

    .gallery-description {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.9));
        color: white;
        padding: 20px 15px 15px;
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.3s ease;
        font-size: 0.9rem;
        line-height: 1.4;
    }

    .gallery-modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.9);
        backdrop-filter: blur(5px);
    }

    .gallery-modal.active {
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    }

    .modal-content {
        position: relative;
        max-width: 90%;
        max-height: 90%;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 25px 50px rgba(0,0,0,0.5);
    }

    .modal-image {
        width: 100%;
        height: auto;
        max-height: 70vh;
        object-fit: contain;
    }

    .modal-description {
        padding: 20px;
        background: #f8f9fa;
        border-top: 1px solid #e9ecef;
        font-size: 1rem;
        line-height: 1.6;
        color: #333;
    }

    .modal-close {
        position: absolute;
        top: 15px;
        right: 20px;
        color: white;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        z-index: 1001;
        background: rgba(0,0,0,0.5);
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.3s ease;
    }

    .modal-close:hover {
        background: rgba(0,0,0,0.8);
    }

    .modal-navigation {
        position: absolute;
        top: 50%;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        transform: translateY(-50%);
        pointer-events: none;
    }

    .modal-prev, .modal-next {
        background: rgba(0,0,0,0.5);
        color: white;
        border: none;
        padding: 15px 20px;
        font-size: 18px;
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.3s ease;
        pointer-events: all;
    }

    .modal-prev:hover, .modal-next:hover {
        background: rgba(0,0,0,0.8);
    }

    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }

    @media (max-width: 768px) {
        .modal-content {
            max-width: 95%;
            max-height: 95%;
        }
        
        .gallery-description {
            font-size: 0.8rem;
            padding: 15px 10px 10px;
        }
        
        .modal-navigation {
            padding: 0 10px;
        }
    }
`;

// Initialize the gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add styles to the page
    const styleSheet = document.createElement('style');
    styleSheet.textContent = additionalStyles;
    document.head.appendChild(styleSheet);
    
    // Initialize gallery manager
    new GalleryManager();
});

// Export for use in modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GalleryManager;
}


            // Form validation rules
const validationRules = {
    name: {
        required: true,
        minLength: 2,
        pattern: /^[a-zA-Z\s'-]+$/,
        message: 'Name must be at least 2 characters and contain only letters, spaces, hyphens, and apostrophes'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    subject: {
        required: true,
        minLength: 5,
        maxLength: 100,
        message: 'Subject must be between 5 and 100 characters'
    },
    message: {
        required: true,
        minLength: 10,
        maxLength: 1000,
        message: 'Message must be between 10 and 1000 characters'
    }
};

// Get DOM elements
const contactForm = document.getElementById('contactForm');
const contactFormContainer = document.getElementById('contactFormContainer');
const loadingPage = document.getElementById('loadingPage');
const successPage = document.getElementById('successPage');
const errorPage = document.getElementById('errorPage');
const alertContainer = document.getElementById('alertContainer');
const submitBtn = document.getElementById('submitBtn');
const btnText = document.getElementById('btnText');

// Validate individual field
function validateField(fieldName, value) {
    const rules = validationRules[fieldName];
    const errors = [];

    if (rules.required && !value.trim()) {
        errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`);
        return errors;
    }

    if (value.trim()) {
        if (rules.minLength && value.trim().length < rules.minLength) {
            errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must be at least ${rules.minLength} characters long`);
        }

        if (rules.maxLength && value.trim().length > rules.maxLength) {
            errors.push(`${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} must not exceed ${rules.maxLength} characters`);
        }

        if (rules.pattern && !rules.pattern.test(value.trim())) {
            errors.push(rules.message);
        }
    }

    return errors;
}

// Show field error and update character counter
function showFieldError(fieldName, errors) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(fieldName + 'Error');
    
    if (errors.length > 0) {
        field.classList.add('error');
        field.classList.remove('success');
        errorElement.textContent = errors[0]; // Keep inline error for persistence
        errorElement.classList.add('show');

        // NEW: Display the specific field error in the alert container
        showAlert(errors[0], 'error'); 
        
        return false;
    } else {
        field.classList.remove('error');
        field.classList.add('success');
        errorElement.classList.remove('show');
        errorElement.textContent = ''; // Clear inline error
        
        // Optionally, if you want to clear the main alert when a field becomes valid:
        // You would need more complex logic here to check if the current alert
        // is related to this field. For now, showAlert's timeout handles disappearance.
        // If you don't want the alert to persist after a field becomes valid,
        // you might call alertContainer.innerHTML = ''; here, but be careful
        // not to clear other general alerts too quickly.

        return true;
    }
}

// Update character counter
function updateCharacterCounter(fieldName, currentLength) {
    const rules = validationRules[fieldName];
    const counterElement = document.getElementById(fieldName + 'Counter');
    
    if (!counterElement) return;
    
    let counterText = '';
    let counterClass = 'char-counter';
    
    if (rules.minLength && rules.maxLength) {
        counterText = `${currentLength}/${rules.maxLength} characters`;
        if (currentLength < rules.minLength) {
            counterText += ` (minimum ${rules.minLength})`;
            counterClass += ' char-counter-warning';
        } else if (currentLength >= rules.minLength && currentLength <= rules.maxLength) {
            counterClass += ' char-counter-success';
        } else {
            counterClass += ' char-counter-error';
        }
    } else if (rules.minLength) {
        if (currentLength < rules.minLength) {
            counterText = `${currentLength} characters (minimum ${rules.minLength})`;
            counterClass += ' char-counter-warning';
        } else {
            counterText = `${currentLength} characters ✓`;
            counterClass += ' char-counter-success';
        }
    } else if (rules.maxLength) {
        counterText = `${currentLength}/${rules.maxLength} characters`;
        if (currentLength <= rules.maxLength) {
            counterClass += ' char-counter-success';
        } else {
            counterClass += ' char-counter-error';
        }
    }
    
    counterElement.textContent = counterText;
    counterElement.className = counterClass;
}

// Validate entire form
function validateForm() {
    let isValid = true;
    const formData = new FormData(contactForm);

    for (const [fieldName, value] of formData.entries()) {
        // Convert HTML field names to lowercase for validation
        const fieldKey = fieldName.toLowerCase();
        if (validationRules[fieldKey]) {
            const errors = validateField(fieldKey, value);
            if (!showFieldError(fieldKey, errors)) {
                isValid = false;
            }
        }
    }

    return isValid;
}

// Show alert
function showAlert(message, type) {
    alertContainer.innerHTML = `<div class="alert alert-${type}">${message}</div>`;
    setTimeout(() => {
        alertContainer.innerHTML = '';
    }, 5000);
}

// Clear all field states and counters
function clearAllFieldStates() {
    const fields = ['name', 'email', 'subject', 'message'];
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        const errorElement = document.getElementById(fieldName + 'Error');
        const counterElement = document.getElementById(fieldName + 'Counter');
        
        if (field) {
            // Remove all styling classes
            field.classList.remove('error', 'success');
            field.value = ''; // Clear field value
        }
        
        if (errorElement) {
            // Clear error messages
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
        
        if (counterElement) {
            // Reset character counters
            updateCharacterCounter(fieldName, 0);
        }
    });
    
    // Clear any alerts
    alertContainer.innerHTML = '';
}

// Show different pages
function showContactForm() {
    contactFormContainer.style.display = 'block';
    loadingPage.style.display = 'none';
    successPage.style.display = 'none';
    errorPage.style.display = 'none';
    
    // Clear the form and reset all states
    contactForm.reset();
    clearAllFieldStates();
}

function showLoadingPage() {
    contactFormContainer.style.display = 'none';
    loadingPage.style.display = 'block';
    successPage.style.display = 'none';
    errorPage.style.display = 'none';
}

function showSuccessPage() {
    contactFormContainer.style.display = 'none';
    loadingPage.style.display = 'none';
    successPage.style.display = 'block';
    errorPage.style.display = 'none';
}

function showErrorPage() {
    contactFormContainer.style.display = 'none';
    loadingPage.style.display = 'none';
    successPage.style.display = 'none';
    errorPage.style.display = 'block';
}

// Show success message overlay on main page (different from success page)
function showMainPageSuccessMessage() {
    // Create success overlay/modal on the main form page
    const successOverlay = document.createElement('div');
    successOverlay.id = 'mainPageSuccessOverlay';
    successOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;
    
    successOverlay.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 8px;
            text-align: center;
            max-width: 400px;
            margin: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        ">
            <h2 style="color: #28a745; margin-bottom: 1rem;">Message Sent Successfully!</h2>
            <p style="margin-bottom: 1.5rem; color: #666;">Thank you for reaching out to Iyke Visuals. We've received your message and will get back to you within 24 hours.</p>
            <button id="okayBtn" style="
                background-color: #dc3545;
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1rem;
            ">Okay</button>
        </div>
    `;
    
    document.body.appendChild(successOverlay);
    
    // Add click handler to Okay button
    document.getElementById('okayBtn').addEventListener('click', function() {
        // Immediately remove the overlay
        document.body.removeChild(successOverlay);
        // Reset form to clean state
        showContactForm();
    });
    
    // Also allow clicking outside to close
    successOverlay.addEventListener('click', function(e) {
        if (e.target === successOverlay) {
            // Immediately remove the overlay
            document.body.removeChild(successOverlay);
            // Reset form to clean state
            showContactForm();
        }
    });
}

// Real-time field validation with character counting
function setupRealTimeValidation() {
    const fields = ['name', 'email', 'subject', 'message'];
    
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            // Initialize character counter
            const currentLength = field.value.trim().length;
            updateCharacterCounter(fieldName, currentLength);
            
            field.addEventListener('blur', function() {
                const errors = validateField(fieldName, this.value);
                showFieldError(fieldName, errors);
            });
            
            field.addEventListener('input', function() {
                // Update character counter in real-time
                const currentLength = this.value.trim().length;
                updateCharacterCounter(fieldName, currentLength);
                
                // Clear error styling when user starts typing
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    const errorElement = document.getElementById(fieldName + 'Error');
                    errorElement.classList.remove('show');
                }
                
                // Add success styling if field is valid
                const errors = validateField(fieldName, this.value);
                if (errors.length === 0 && this.value.trim()) {
                    this.classList.add('success');
                } else {
                    this.classList.remove('success');
                }
            });
        }
    });
}

// Handle form submission
function handleFormSubmission() {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate form
        if (!validateForm()) {
            showAlert('Please fix the errors below before submitting.', 'error');
            return;
        }
        
        // Show loading page
        showLoadingPage();
        
        try {
            // Submit form to Formspree
            const formData = new FormData(contactForm);
            
            // Add a hidden field to prevent Formspree from redirecting
            formData.append('_next', window.location.href.split('?')[0]); // Current page without parameters
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Clear the URL of any success parameters to prevent showing success message on main page
                if (window.history && window.history.replaceState) {
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
                
                // Success - show success page
                showSuccessPage();
            } else {
                // Error from server
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showErrorPage();
        }
    });
}

// Handle "Go Back" button clicks
function setupGoBackButtons() {
    // Find all "Go Back" buttons (you might have them on success and error pages)
    const goBackButtons = document.querySelectorAll('[onclick*="showContactForm"], .go-back-btn, #goBackBtn, .back-btn');
    
    goBackButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            // Immediately show the contact form (this will hide all other pages)
            showContactForm();
        });
    });
    
    // If you have a specific button with onclick attribute, override it
    const onclickButtons = document.querySelectorAll('button[onclick="showContactForm()"]');
    onclickButtons.forEach(button => {
        // Remove the onclick attribute and add proper event listener
        button.removeAttribute('onclick');
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            showContactForm();
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // ... (other setup and variable declarations) ...

    // Show appropriate view based on URL parameters
    if (hasSuccess) {
        // When 'success' is in the URL, immediately show the Main Page Success OVERLAY.
        // The overlay's 'Okay' button or clicking outside it will then call showContactForm()
        // to reset the form and clear everything.
        showMainPageSuccessMessage(); // <--- Direct call to show the overlay
        
        // Ensure the form underneath is in a clean state *before* the overlay is shown
        // (though showMainPageSuccessMessage calls showContactForm when dismissed).
        // It's often good practice to ensure the underlying state is clean.
        showContactForm(); // Ensure the contact form is visible (but hidden by overlay) and clean.

        // Clean the URL to prevent re-showing the overlay on refresh
        if (window.history && window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    } else if (hasError) {
        // If error from URL, show the dedicated ERROR PAGE (your full-screen "Oops! Something Went Wrong" screen).
        // This keeps your design consistent: full page for post-submission outcomes.
        showErrorPage(); // <--- Use the full error page for URL-based errors
        
        // IMPORTANT: DO NOT call showAlert here if you want to use the full error page.
        // showAlert('There was an error sending your message. Please try again.', 'error'); // REMOVE OR COMMENT OUT THIS LINE

        // Clean the URL
        if (window.history && window.history.replaceState) {
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    } else {
        // Normal page load or after a successful reset from success/error pages
        showContactForm(); // Show a clean contact form and clear any existing alerts
    }
});
        // Show loading page in new tab
        function showLoadingPageInNewTab() {
            const loadingHTML = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Sending Message - The Salvation Army Ibadan Central Corps</title>
                    <style>
                        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap'); 
                        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap'); 
                        
                        :root {
                            --primary: #ED1B24;
                            --primary-dark: #C41017;
                            --light: #f9f9f9;
                            --dark: #222222;
                            --gray: #6c757d;
                            --light-gray: #e9ecef;
                            --white: #ffffff;
                        }

                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        body {
                            font-family: 'Satoshi', sans-serif;
                            background-color: var(--white);
                            color: var(--dark);
                            min-height: 100vh;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                            padding: 20px;
                        }

                        .facebook-loader {
                            width: 60px;
                            height: 60px;
                            border: 6px solid var(--light-gray);
                            border-top: 6px solid var(--primary);
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                            margin-bottom: 30px;
                        }

                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }

                        h2 {
                            font-family: 'Clash Display', sans-serif;
                            font-size: 2rem;
                            color: var(--dark);
                            margin-bottom: 10px;
                            text-align: center;
                        }

                        p {
                            font-size: 1.1rem;
                            color: var(--gray);
                            margin-bottom: 30px;
                            text-align: center;
                        }

                        .progress-dots {
                            display: flex;
                            gap: 10px;
                        }

                        .progress-dot {
                            width: 12px;
                            height: 12px;
                            background-color: var(--primary);
                            border-radius: 50%;
                            animation: bounce 1.4s ease-in-out infinite both;
                        }

                        .progress-dot:nth-child(1) { animation-delay: -0.32s; }
                        .progress-dot:nth-child(2) { animation-delay: -0.16s; }

                        @keyframes bounce {
                            0%, 80%, 100% {
                                transform: scale(0);
                            } 40% {
                                transform: scale(1);
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="facebook-loader"></div>
                    <h2>Sending Your Message...</h2>
                    <p>Please wait while we process your request</p>
                    <div class="progress-dots">
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                    </div>
                </body>
                </html>
            `;

            const loadingWindow = window.open('', '_blank');
            loadingWindow.document.write(loadingHTML);
            loadingWindow.document.close();
            
            return loadingWindow;
        }

        // Show success page in new tab
        function showSuccessPageInNewTab(loadingWindow) {
            const successHTML = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Message Sent Successfully - The Salvation Army Ibadan Central Corps</title>
                    <style>
                        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap'); 
                        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap'); 
                        
                        :root {
                            --primary: #ED1B24;
                            --primary-dark: #C41017;
                            --light: #f9f9f9;
                            --dark: #222222;
                            --gray: #6c757d;
                            --white: #ffffff;
                            --shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                            --transition: all 0.3s ease-in-out;
                        }

                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        body {
                            font-family: 'Satoshi', sans-serif;
                            background-color: var(--light);
                            color: var(--dark);
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 20px;
                        }

                        .success-container {
                            text-align: center;
                            padding: 60px 40px;
                            background: var(--white);
                            border-radius: 15px;
                            box-shadow: var(--shadow);
                            max-width: 500px;
                            width: 100%;
                        }

                        .success-container h2 {
                            font-family: 'Clash Display', sans-serif;
                            font-size: 2.5rem;
                            color: #28a745;
                            margin-bottom: 20px;
                        }

                        .success-container p {
                            font-size: 1.2rem;
                            color: var(--gray);
                            margin-bottom: 30px;
                            line-height: 1.6;
                        }

                        .back-btn {
                            background-color: var(--primary);
                            color: var(--white);
                            padding: 12px 25px;
                            border: none;
                            border-radius: 8px;
                            font-size: 1rem;
                            font-weight: 500;
                            cursor: pointer;
                            transition: var(--transition);
                            text-decoration: none;
                            display: inline-block;
                        }

                        .back-btn:hover {
                            background-color: var(--primary-dark);
                            transform: translateY(-2px);
                        }

                        @media (max-width: 768px) {
                            .success-container {
                                padding: 40px 20px;
                            }
                            
                            .success-container h2 {
                                font-size: 2rem;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="success-container">
                        <h2>Message Sent Successfully!</h2>
                        <p>Thank you for contacting The Salvation Army Ibadan Central Corps. We’ve received your message and will respond shortly. God bless you.</p>
                        <button class="back-btn" onclick="window.close()">Go Back</button>
                    </div>
                </body>
                </html>
            `;

            // Replace loading page content with success page
            loadingWindow.document.open();
            loadingWindow.document.write(successHTML);
            loadingWindow.document.close();
        }

        // Show error page in new tab
        function showErrorPageInNewTab(loadingWindow) {
            const errorHTML = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Message Send Failed - The Salvation Army Ibadan Central Corps</title>
                    <style>
                        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap'); 
                        @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap'); 
                        
                        :root {
                            --primary: #ED1B24;
                            --primary-dark: #C41017;
                            --light: #f9f9f9;
                            --dark: #222222;
                            --gray: #6c757d;
                            --white: #ffffff;
                            --shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                            --transition: all 0.3s ease-in-out;
                        }

                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        body {
                            font-family: 'Satoshi', sans-serif;
                            background-color: var(--light);
                            color: var(--dark);
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            padding: 20px;
                        }

                        .error-container {
                            text-align: center;
                            padding: 60px 40px;
                            background: var(--white);
                            border-radius: 15px;
                            box-shadow: var(--shadow);
                            max-width: 500px;
                            width: 100%;
                        }

                        .error-container h2 {
                            font-family: 'Clash Display', sans-serif;
                            font-size: 2.5rem;
                            color: var(--primary);
                            margin-bottom: 20px;
                        }

                        .error-container p {
                            font-size: 1.2rem;
                            color: var(--gray);
                            margin-bottom: 30px;
                            line-height: 1.6;
                        }

                        .back-btn {
                            background-color: var(--primary);
                            color: var(--white);
                            padding: 12px 25px;
                            border: none;
                            border-radius: 8px;
                            font-size: 1rem;
                            font-weight: 500;
                            cursor: pointer;
                            transition: var(--transition);
                        }

                        .back-btn:hover {
                            background-color: var(--primary-dark);
                            transform: translateY(-2px);
                        }

                        @media (max-width: 768px) {
                            .error-container {
                                padding: 40px 20px;
                            }
                            
                            .error-container h2 {
                                font-size: 2rem;
                            }
                        }
                    </style>
                </head>
                <body>
                    <div class="error-container">
                        <h2>Oops! Something Went Wrong</h2>
                        <p>We couldn't send your message at this time. Please check your information and try again, or contact us directly.</p>
                        <button class="back-btn" onclick="window.close()">Try Again</button>
                    </div>
                </body>
                </html>
            `;

            // Replace loading page content with error page
            loadingWindow.document.open();
            loadingWindow.document.write(errorHTML);
            loadingWindow.document.close();
        }

        // Show contact form
        function showContactForm() {
            contactFormContainer.style.display = 'block';
            loadingPage.classList.remove('show');
            successPage.classList.remove('show');
            errorPage.classList.remove('show');
            
            // Reset form
            contactForm.reset();
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';
        }

        // Form submission handler
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }

            // Disable submit button and show loading state
            submitBtn.disabled = true;
            btnText.textContent = 'Sending...';

            // Show loading page in new tab
            const loadingWindow = showLoadingPageInNewTab();

            try {
                const formData = new FormData(contactForm);
                const response = await fetch('https://formspree.io/f/mvgrqrpz', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Show success page in the loading tab after a short delay
                    setTimeout(() => {
                        showSuccessPageInNewTab(loadingWindow);
                    }, 2000);
                    
                    showAlert('Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    throw new Error('Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                
                // Show error page in the loading tab after a short delay
                setTimeout(() => {
                    showErrorPageInNewTab(loadingWindow);
                }, 2000);
                
                showAlert('Failed to send message. Please try again.', 'danger');
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                btnText.textContent = 'Send Message';
            }
        });

        // Clear error messages on input
        document.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function() {
                const errorDiv = document.getElementById(this.id + 'Error');
                if (errorDiv) {
                    errorDiv.style.display = 'none';
                }
            });
        });




        // --- global-loader.js (or integrated into your main script.js) ---

class SiteLoader {
    constructor() {
        this.createLoaderHTML();
        this.loader = document.getElementById('siteLoaderModal');
        this.loaderTextElement = this.loader ? this.loader.querySelector('.loader-text') : null;

        // Mappings for contextual loader messages (customize as needed)
        this.pageMessages = {
            '/about/': 'Loading About Us...',
            '/ministries/': 'Entering Ministries...',
            '/events/': 'Fetching Events...',
            '/events/all': 'Fetching All Events...', // For "View All Events"
            '/outreach/': 'Preparing Outreach Info...',
            '/gallery/': 'Loading Photo Gallery...',
            '/contact/': 'Opening Contact Page...',
            // Specific event pages (example, add all your event URLs)
            '/events/corps-anniversary-celebration.html': 'Loading Corps Anniversary Details...',
            '/events/youth-conference.html': 'Preparing Youth Conference Info...',
            '/events/community-outreach.html': 'Getting Community Outreach Info...',
            '/events/prayer-vigil.html': 'Opening Prayer Vigil Details...',
            '/events/womens-fellowship.html': 'Loading Women\'s Fellowship Info...',
            '/privacy-policy/': 'Accessing Privacy Policy...',
            '/cookie-policy/': 'Accessing Cookie Policy...',
            '/terms-of-service/': 'Reviewing Terms of Service...',
            // Default message if no specific match
            'default': 'Loading...',
            'same-page': 'Navigating...' // For hash links on the same page
        };

        this.init();
    }

    createLoaderHTML() {
        // Check if loader already exists
        if (document.getElementById('siteLoaderModal')) {
            return;
        }

        const loaderHTML = `
            <div id="siteLoaderModal" class="site-loader-modal">
                <div class="loader-content">
                    <div class="facebook-loader"></div>
                    <h2 class="loader-text">Loading...</h2>
                    <p>Please wait while we process your request</p>
                    <div class="progress-dots">
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                        <div class="progress-dot"></div>
                    </div>
                </div>
            </div>
        `;

        // Add the loader HTML to the body
        document.body.insertAdjacentHTML('beforeend', loaderHTML);

        // Add the CSS styles
        this.addLoaderStyles();
    }

    addLoaderStyles() {
        // Check if styles already exist
        if (document.getElementById('siteLoaderStyles')) {
            return;
        }

        const styles = `
            <style id="siteLoaderStyles">
                @import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap');
                @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap');
               
                :root {
                    --primary: #ED1B24;
                    --primary-dark: #C41017;
                    --light: #f9f9f9;
                    --dark: #222222;
                    --gray: #6c757d;
                    --light-gray: #e9ecef;
                    --white: #ffffff;
                }

                .site-loader-modal {
                    width: 60px;
                            height: 60px;
                            border: 6px solid var(--light-gray);
                            border-top: 6px solid var(--primary);
                            border-radius: 50%;
                            animation: spin 1s linear infinite;
                            margin-bottom: 30px;
                        }

                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }

                        h2 {
                            font-family: 'Clash Display', sans-serif;
                            font-size: 2rem;
                            color: var(--dark);
                            margin-bottom: 10px;
                            text-align: center;
                        }

                        p {
                            font-size: 1.1rem;
                            color: var(--gray);
                            margin-bottom: 30px;
                            text-align: center;
                        }

                        .progress-dots {
                            display: flex;
                            gap: 10px;
                        }

                        .progress-dot {
                            width: 12px;
                            height: 12px;
                            background-color: var(--primary);
                            border-radius: 50%;
                            animation: bounce 1.4s ease-in-out infinite both;
                        }

                        .progress-dot:nth-child(1) { animation-delay: -0.32s; }
                        .progress-dot:nth-child(2) { animation-delay: -0.16s; }

                        @keyframes bounce {
                            0%, 80%, 100% {
                                transform: scale(0);
                            } 40% {
                                transform: scale(1);
                            }
                        }

                .site-loader-modal.active {
                    opacity: 1;
                    visibility: visible;
                }

                body.loading {
                    overflow: hidden;
                }

                /* Clickable event styles */
                .clickable-event {
                    cursor: pointer;
                    transition: transform 0.2s ease;
                }

                .clickable-event:hover {
                    transform: translateY(-2px);
                }

                .click-indicator {
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    background-color: var(--primary);
                    color: var(--white);
                    padding: 4px 8px;
                    border-radius: 12px;
                    font-size: 0.75rem;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                .clickable-event:hover .click-indicator {
                    opacity: 1;
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    init() {
        if (!this.loader) {
            console.error('Site loader modal element not found. Please ensure the HTML is present.');
            return;
        }

        this.attachEventListeners();
        // Hide loader immediately if page just loaded and it was left active (e.g., from a back button)
        window.addEventListener('load', () => this.hideLoader());
        document.addEventListener('DOMContentLoaded', () => {
            // Check if the loader was active from a previous page navigation (browser back/forward)
            if (this.loader.classList.contains('active')) {
                this.hideLoader();
            }
        });
    }

    attachEventListeners() {
        // Listen for clicks on ALL anchor tags (delegated to document for efficiency)
        document.addEventListener('click', (e) => {
            let targetLink = e.target.closest('a');

            // If a link was clicked and it's not explicitly set to open in a new tab
            if (targetLink && targetLink.getAttribute('target') !== '_blank') {
                const href = targetLink.getAttribute('href');

                // Ignore links that don't cause a full page load (e.g., hash links on same page, JavaScript void links)
                if (!href || href.startsWith('#') || href.startsWith('javascript:')) {
                    // For same-page hash links, if you want a subtle loader, uncomment below
                    // this.showLoader(this.pageMessages['same-page']);
                    // setTimeout(() => this.hideLoader(), 300); // Quick hide for smooth scroll
                    return; // Don't prevent default for internal hash links or JS
                }

                // Prevent default navigation to show loader first
                e.preventDefault(); 
                
                // Determine contextual message
                const message = this.getContextualMessage(href);
                this.showLoader(message);

                // Simulate a slight delay before navigation (optional, for visual effect)
                setTimeout(() => {
                    window.location.href = href; // Programmatically navigate
                }, 300); // Small delay before redirect, allows loader to appear
            }
        });

        // Listen for Formspree form submissions
        document.addEventListener('submit', (e) => {
            const form = e.target.closest('form');
            if (form && form.action.includes('formspree.io')) {
                // Formspree typically causes a redirect, so show loader
                this.showLoader('Submitting form...');
            }
        });
    }

    getContextualMessage(href) {
        // Remove origin for internal path matching
        const path = new URL(href, window.location.origin).pathname;

        // Check for direct matches
        if (this.pageMessages[path]) {
            return this.pageMessages[path];
        }

        // Handle generic /events/ path for specific event cards
        if (path.startsWith('/events/') && path.endsWith('.html') && !path.includes('all')) {
            // Attempt to extract event title from path if not explicitly mapped
            const fileName = path.split('/').pop().replace('.html', '');
            const readableTitle = fileName.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return `Loading ${readableTitle} Details...`;
        }

        // Check for partial matches (e.g., /events/ for all event-related links)
        for (const key in this.pageMessages) {
            if (href.includes(key)) {
                return this.pageMessages[key];
            }
        }

        return this.pageMessages['default'];
    }

    showLoader(message = 'Loading...') {
        if (!this.loader) return;
        this.loaderTextElement.textContent = message;
        this.loader.classList.add('active');
        document.body.classList.add('loading'); // Add class to body to prevent scroll
        
        // Start progressive loading animation
        this.startProgressiveLoad();
    }

    startProgressiveLoad() {
        const loader = this.loader.querySelector('.facebook-loader');
        if (!loader) return;

        // Reset any existing animation
        loader.style.setProperty('--progress', '0deg');
        
        // Simulate progressive loading over 2 seconds
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5; // Random increment between 5-20 degrees
            
            if (progress >= 360) {
                progress = 360;
                clearInterval(interval);
            }
            
            loader.style.setProperty('--progress', `${progress}deg`);
        }, 100); // Update every 100ms
        
        // Store interval reference for cleanup
        this.progressInterval = interval;
    }

    hideLoader() {
        if (!this.loader) return;
        
        // Clear any running progress interval
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
            this.progressInterval = null;
        }
        
        // Fade out animation
        this.loader.classList.remove('active');
        document.body.classList.remove('loading'); // Allow scroll again
    }
}

// Initialize the site loader on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    new SiteLoader();
});

// --- Your existing EventsManager logic (slightly modified) ---
// Note: This EventsManager will now *use* the global SiteLoader
// instead of creating its own, but it will keep its event mapping logic.

class EventsManager {
    constructor() {
        // Use the global loader instance if available
        this.globalLoader = window.siteLoaderInstance || null;
        
        this.eventUrls = {
            'corps anniversary celebration': '/events/corps-anniversary-celebration',
            'youth conference': '/events/youth-conference',
            'community outreach': '/events/community-outreach',
            'prayer vigil': '/events/prayer-vigil',
            "women's fellowship": '/events/womens-fellowship'
        };
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.addClickableStyles();
    }

    // Add visual indicators that events are clickable
    addClickableStyles() {
        const featuredEvent = document.querySelector('.featured-event');
        const eventCards = document.querySelectorAll('.event-card');
        
        if (featuredEvent) {
            featuredEvent.classList.add('clickable-event');
        }
        eventCards.forEach(card => {
            card.classList.add('clickable-event');
        });
        // Add click indicators visually (optional, can be done once by global loader if desired)
        this.addClickIndicators();
    }

    // Add click indicators to events (re-used from your original script)
    addClickIndicators() {
        const clickableEvents = document.querySelectorAll('.clickable-event');
        clickableEvents.forEach(event => {
            if (!event.querySelector('.click-indicator')) {
                const indicator = document.createElement('div');
                indicator.className = 'click-indicator';
                indicator.textContent = 'Click to view';
                event.style.position = 'relative'; // Ensure position for absolute indicator
                event.appendChild(indicator);
            }
        });
    }

    // Attach click event listeners
    attachEventListeners() {
        // Handle featured event clicks (excluding the button inside)
        const featuredEvent = document.querySelector('.featured-event');
        if (featuredEvent) {
            featuredEvent.addEventListener('click', (e) => {
                // Ensure click is not on the 'Event Details' button itself, as it has its own handler
                if (!e.target.closest('.btn') && e.currentTarget.classList.contains('clickable-event')) {
                    const eventTitle = featuredEvent.querySelector('h3').textContent.toLowerCase();
                    this.handleEventCardClick(eventTitle);
                }
            });
        }

        // Handle individual event card clicks
        const eventCards = document.querySelectorAll('.event-card');
        eventCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.currentTarget.classList.contains('clickable-event')) {
                    const eventTitle = card.querySelector('h4').textContent.toLowerCase();
                    this.handleEventCardClick(eventTitle);
                }
            });
        });

        // Handle "Event Details" button clicks (inside featured event)
        const eventDetailsBtn = document.querySelector('.featured-event .btn');
        if (eventDetailsBtn) {
            eventDetailsBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                const eventTitle = document.querySelector('.featured-event h3').textContent.toLowerCase();
                this.handleEventCardClick(eventTitle);
            });
        }

        // Handle "View All Events" button click
        const viewAllBtn = document.querySelector('.view-all-events .btn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Prevent default link behavior
                this.handleViewAllEvents();
            });
        }
    }

    // Central handler for event card/button clicks
    handleEventCardClick(eventTitle) {
        const eventKey = eventTitle.trim();
        const eventUrl = this.eventUrls[eventKey];
        
        if (eventUrl) {
            // Find the SiteLoader instance
            const siteLoader = document.getElementById('siteLoaderModal');
            if (siteLoader) {
                const loaderInstance = new SiteLoader();
                loaderInstance.showLoader(loaderInstance.getContextualMessage(eventUrl));
            }
            // Navigate after showing loader
            setTimeout(() => {
                window.location.href = eventUrl;
            }, 300);
        } else {
            console.warn(`No specific URL found for event: ${eventTitle}. Redirecting to generic event details.`);
            const siteLoader = document.getElementById('siteLoaderModal');
            if (siteLoader) {
                const loaderInstance = new SiteLoader();
                loaderInstance.showLoader(`Loading details for ${eventTitle}...`);
            }
            const genericUrl = `/events/details?event=${encodeURIComponent(eventTitle)}`;
            setTimeout(() => {
                window.location.href = genericUrl;
            }, 300);
        }
    }

    handleViewAllEvents() {
        const viewAllUrl = '/events/all'; // Define your "View All Events" page URL
        const siteLoader = document.getElementById('siteLoaderModal');
        if (siteLoader) {
            const loaderInstance = new SiteLoader();
            loaderInstance.showLoader(loaderInstance.getContextualMessage(viewAllUrl));
        }
        setTimeout(() => {
            window.location.href = viewAllUrl;
        }, 300);
    }
}

// Initialize EventsManager after the global SiteLoader
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure SiteLoader is fully initialized
    setTimeout(() => {
        new EventsManager();
    }, 100);
});



// Character counter functionality
        function updateCounter(inputId, counterId, maxLength = null) {
            const input = document.getElementById(inputId);
            const counter = document.getElementById(counterId);
            
            if (input && counter) {
                input.addEventListener('input', function() {
                    const length = this.value.length;
                    if (maxLength) {
                        counter.textContent = `${length}/${maxLength}`;
                        if (length > maxLength) {
                            counter.style.color = 'var(--primary)';
                        } else {
                            counter.style.color = '#666';
                        }
                    } else {
                        counter.textContent = `${length} characters`;
                    }
                });
            }
        }

        // Initialize character counters
        updateCounter('name', 'nameCounter', 50);
        updateCounter('email', 'emailCounter', 100);
        updateCounter('subject', 'subjectCounter', 100);
        updateCounter('message', 'messageCounter', 500);

        // Show/hide field hints on focus/blur
        function initializeFieldHints() {
            const formFields = document.querySelectorAll('.form-control');
            
            formFields.forEach(field => {
                const fieldHint = field.parentElement.querySelector('.field-hint');
                
                if (fieldHint) {
                    // Show hint on focus
                    field.addEventListener('focus', function() {
                        fieldHint.classList.add('show');
                    });
                    
                    // Hide hint on blur (when field loses focus)
                    field.addEventListener('blur', function() {
                        fieldHint.classList.remove('show');
                    });
                }
            });
        }

            // Initialize field hints
        initializeFieldHints()