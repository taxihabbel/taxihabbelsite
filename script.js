// Navigation functionality
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Hamburger animation
    hamburger.classList.toggle('active');
});

// Close mobile menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active navigation link based on scroll position
function updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const id = section.getAttribute('id');
        const correspondingLink = document.querySelector(`.nav-link[href="#${id}"]`);

        if (scrollPos >= top && scrollPos <= bottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            correspondingLink?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        // Check if href is just "#" and return early to avoid invalid selector
        const href = this.getAttribute('href');
        if (href === '#') {
            return;
        }
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Remove existing error states
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        service: formData.get('service'),
        message: formData.get('message'),
        privacy: formData.get('privacy')
    };
    
    // Validation
    let isValid = true;
    
    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        showError('name', 'Bitte geben Sie Ihren vollständigen Namen ein.');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email', 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
        isValid = false;
    }
    
    // Phone validation (optional but if provided, should be valid)
    if (data.phone && data.phone.trim()) {
        const phoneRegex = /^[\+]?[\d\s\-\(\)]+$/;
        if (!phoneRegex.test(data.phone) || data.phone.trim().length < 6) {
            showError('phone', 'Bitte geben Sie eine gültige Telefonnummer ein.');
            isValid = false;
        }
    }
    
    // Service validation
    if (!data.service) {
        showError('service', 'Bitte wählen Sie einen Service aus.');
        isValid = false;
    }
    
    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        showError('message', 'Bitte geben Sie eine Nachricht mit mindestens 10 Zeichen ein.');
        isValid = false;
    }
    
    // Privacy validation
    if (!data.privacy) {
        showError('privacy', 'Bitte stimmen Sie der Datenschutzerklärung zu.');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.classList.add('loading');
    submitButton.textContent = 'Wird gesendet...';
    submitButton.disabled = true;
    
    try {
        // Simulate form submission (replace with actual endpoint)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Show success message
        showSuccessMessage('Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns schnellstmöglich bei Ihnen.');
        
        // Reset form
        contactForm.reset();
        
        // Optional: Send to actual endpoint
        // const response = await fetch('/submit-contact', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data)
        // });
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showError('form', 'Es gab einen Fehler beim Senden Ihrer Nachricht. Bitte versuchen Sie es erneut oder rufen Sie uns direkt an.');
    } finally {
        // Reset button state
        submitButton.classList.remove('loading');
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

function showError(fieldName, message) {
    const field = document.getElementById(fieldName);
    if (!field) return;
    
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    formGroup.appendChild(errorDiv);
}

function showSuccessMessage(message) {
    // Remove existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Create and show success message
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message show';
    successDiv.textContent = message;
    
    const form = document.getElementById('contactForm');
    form.insertBefore(successDiv, form.firstChild);
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successDiv.classList.remove('show');
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add animation classes to elements
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in animation to service cards
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
    
    // Add fade-in animation to fleet cards
    document.querySelectorAll('.fleet-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(card);
    });
    
    // Add fade-in animation to feature items
    document.querySelectorAll('.feature-item').forEach((item, index) => {
        item.classList.add('fade-in');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Add slide-in animations to contact info
    document.querySelectorAll('.contact-item').forEach((item, index) => {
        item.classList.add('slide-in-left');
        item.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(item);
    });
    
    // Add slide-in animation to contact form
    const contactFormContainer = document.querySelector('.contact-form-container');
    if (contactFormContainer) {
        contactFormContainer.classList.add('slide-in-right');
        observer.observe(contactFormContainer);
    }
});

// Phone number formatting for German numbers
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.startsWith('49')) {
        value = '+' + value;
    } else if (value.startsWith('0')) {
        value = '+49' + value.substring(1);
    } else if (!value.startsWith('+')) {
        value = '+49' + value;
    }
    
    // Format: +49 XXXX XXXXXX
    value = value.replace(/^(\+49)(\d{2,4})(\d+)/, '$1 $2 $3');
    
    input.value = value;
}

// Add phone formatting to phone input
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', () => formatPhoneNumber(phoneInput));
}

// Add floating label effect
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim()) {
            input.classList.add('has-value');
        } else {
            input.classList.remove('has-value');
        }
    });
});

// Preload critical images
const criticalImages = [
    'https://images.pexels.com/photos/1118448/pexels-photo-1118448.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=600'
];

criticalImages.forEach(src => {
    const img = new Image();
    img.src = src;
});

// Add click tracking for analytics (if needed)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone call clicked:', link.href);
        // Add analytics tracking here if needed
    });
});

document.querySelectorAll('.social-icon').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Social media clicked:', link.href);
        // Add analytics tracking here if needed
    });
});