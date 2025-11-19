// ========================================
// Enhanced 1313 Realty Website JavaScript
// Interactive Features & Lead Generation
// ========================================

// === Sticky Header on Scroll ===
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// === Mobile Navigation Toggle ===
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
}

// === Smooth Scrolling for Navigation Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// === Testimonials Slider ===
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
}

const nextBtn = document.getElementById('nextTestimonial');
const prevBtn = document.getElementById('prevTestimonial');

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        showTestimonial(currentTestimonial);
    });
}

// Auto-advance testimonials every 5 seconds
if (testimonials.length > 0) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// === Mortgage Calculator ===
const homePriceInput = document.getElementById('homePrice');
const downPaymentInput = document.getElementById('downPayment');
const interestRateInput = document.getElementById('interestRate');
const loanTermSelect = document.getElementById('loanTerm');

const homePriceValue = document.getElementById('homePriceValue');
const downPaymentValue = document.getElementById('downPaymentValue');
const interestRateValue = document.getElementById('interestRateValue');

const monthlyPaymentDisplay = document.getElementById('monthlyPayment');
const piPaymentDisplay = document.getElementById('piPayment');
const loanAmountDisplay = document.getElementById('loanAmount');
const totalInterestDisplay = document.getElementById('totalInterest');

function calculateMortgage() {
    if (!homePriceInput) return;
    
    const homePrice = parseFloat(homePriceInput.value);
    const downPayment = parseFloat(downPaymentInput.value);
    const annualRate = parseFloat(interestRateInput.value) / 100;
    const years = parseInt(loanTermSelect.value);
    
    const principal = homePrice - downPayment;
    const monthlyRate = annualRate / 12;
    const numPayments = years * 12;
    
    // Calculate monthly payment using amortization formula
    let monthlyPayment = 0;
    if (monthlyRate > 0) {
        monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                        (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
        monthlyPayment = principal / numPayments;
    }
    
    const totalPaid = monthlyPayment * numPayments;
    const totalInterest = totalPaid - principal;
    
    // Update displays
    homePriceValue.textContent = `$${homePrice.toLocaleString()}`;
    downPaymentValue.textContent = `$${downPayment.toLocaleString()}`;
    interestRateValue.textContent = `${interestRateInput.value}%`;
    
    monthlyPaymentDisplay.textContent = `$${Math.round(monthlyPayment).toLocaleString()}`;
    piPaymentDisplay.textContent = `$${Math.round(monthlyPayment).toLocaleString()}`;
    loanAmountDisplay.textContent = `$${principal.toLocaleString()}`;
    totalInterestDisplay.textContent = `$${Math.round(totalInterest).toLocaleString()}`;
}

// Add event listeners for calculator inputs
if (homePriceInput) {
    homePriceInput.addEventListener('input', calculateMortgage);
    downPaymentInput.addEventListener('input', calculateMortgage);
    interestRateInput.addEventListener('input', calculateMortgage);
    loanTermSelect.addEventListener('change', calculateMortgage);
    
    // Update down payment max based on home price
    homePriceInput.addEventListener('input', () => {
        const maxDown = parseFloat(homePriceInput.value) * 0.5;
        downPaymentInput.max = maxDown;
        if (parseFloat(downPaymentInput.value) > maxDown) {
            downPaymentInput.value = maxDown;
        }
        calculateMortgage();
    });
    
    // Initial calculation
    calculateMortgage();
}

// === Home Valuation Form ===
const valuationForm = document.getElementById('valuationForm');
if (valuationForm) {
    valuationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const address = document.getElementById('valAddress').value;
        const email = document.getElementById('valEmail').value;
        
        // In production, send this to your CRM/email service
        alert(`Thank you! We'll send a free home valuation for ${address} to ${email}`);
        
        // Reset form
        this.reset();
    });
}

// === Property Viewing Scheduler ===
function scheduleViewing(button) {
    const propertyCard = button.closest('.property-card');
    const address = propertyCard.querySelector('.property-address').textContent.trim();
    
    // In production, open a modal or redirect to booking page
    if (confirm(`Schedule a viewing for ${address}?`)) {
        window.location.href = '#contact';
    }
}

// Make function globally available
window.scheduleViewing = scheduleViewing;

// === Contact About Mortgage ===
function contactAboutMortgage() {
    window.location.href = '#contact';
}

window.contactAboutMortgage = contactAboutMortgage;

// === Contact Form Enhanced ===
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const formMessage = this.querySelector('.form-message');
        
        // Netlify forms handle submission automatically
        // Show success message
        formMessage.textContent = 'Thank you! Your message has been sent. We\'ll be in touch soon!';
        formMessage.classList.add('success');
        formMessage.classList.remove('error');
    });
}

// === Scroll Reveal Animation ===
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animation
document.querySelectorAll('.service-card, .property-card, .calculator-container').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// === Console Branding ===
console.log('%c1313 Realty', 'font-size: 24px; font-weight: bold; color: #FFD700;');
console.log('%cYour Edmonton Real Estate Partner', 'font-size: 14px; color: #333;');
