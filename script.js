// ===== MOBILE MENU HANDLING ===== 
const sidemenu = document.getElementById("sidemenu");
const hamburgerIcon = document.querySelector('.nav-hamburger');
const navClose = document.querySelector('.nav-close');

function openmenu() {
    if (sidemenu) {
        sidemenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closemenu() {
    if (sidemenu) {
        sidemenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (sidemenu && sidemenu.classList.contains('active') && 
        !sidemenu.contains(e.target) && 
        !e.target.closest('.nav-hamburger')) {
        closemenu();
    }
});

// Close menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closemenu);
});

// ===== CERTIFICATION ACCORDION TOGGLE =====
function toggleCert(header) {
    const certItem = header.closest('.cert-item');
    const isActive = certItem.classList.contains('active');
    
    // Close all other certs
    document.querySelectorAll('.cert-item.active').forEach(item => {
        if (item !== certItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current cert
    certItem.classList.toggle('active');
}

// ===== SMOOTH SCROLL WITH ACTIVE NAV HIGHLIGHTING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const targetElement = document.querySelector(href);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                closemenu();
            }
        }
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('div[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== REVEAL ELEMENTS ON SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => {
    observer.observe(el);
});

// ===== ANIMATED COUNTERS =====
const startCounter = () => {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        // Start when element is visible
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && parseInt(counter.textContent) === 0) {
                    current = 0;
                    updateCounter();
                    counterObserver.unobserve(counter);
                }
            });
        });
        
        counterObserver.observe(counter);
    });
};

startCounter();

// ===== TAB FUNCTIONALITY =====
const tablinks = document.getElementsByClassName("tab-links");
const tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname, elem) {
    for (let tablink of tablinks) {
        tablink.classList.remove("active-link");
    }

    for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }

    if (elem) {
        elem.classList.add("active-link");
    }
    
    const targetTab = document.getElementById(tabname);
    if (targetTab) {
        targetTab.classList.add("active-tab");
        targetTab.style.animation = 'fadeIn 0.5s ease-in';
    }
}

// ===== BACK TO TOP BUTTON =====
const createBackToTopButton = () => {
    const backToTop = document.createElement('button');
    backToTop.id = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
};

createBackToTopButton();

// ===== FORM VALIDATION & SUBMISSION =====
const contactForm = document.querySelector('form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = contactForm.querySelector('input[name="Name"]');
        const emailInput = contactForm.querySelector('input[name="Email"]');
        const messageInput = contactForm.querySelector('textarea[name="Message"]');
        
        // Validation
        if (!nameInput.value.trim()) {
            showMessage('Please enter your name', 'error');
            return;
        }
        
        if (!emailInput.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            showMessage('Please enter a valid email', 'error');
            return;
        }
        
        if (!messageInput.value.trim()) {
            showMessage('Please enter your message', 'error');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showMessage('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function showMessage(text, type) {
    const msgSpan = document.getElementById('msg');
    if (msgSpan) {
        msgSpan.textContent = text;
        msgSpan.className = type;
        msgSpan.style.display = 'block';
        
        setTimeout(() => {
            msgSpan.style.display = 'none';
        }, 4000);
    }
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    parallaxElements.forEach(element => {
        const scrollPosition = window.pageYOffset;
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// ===== LAZY LOADING FOR IMAGES =====
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// ===== RIPPLE EFFECT ON BUTTONS =====
document.querySelectorAll('.btn-primary, .btn-secondary, form button, .cert-link').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        if (this.style.position !== 'relative' && this.style.position !== 'absolute') {
            this.style.position = 'relative';
        }
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// ===== SKILL PROGRESS BARS =====
const animateSkillBars = () => {
    const skillBars = document.querySelectorAll('[data-skill-level]');
    
    const barObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute('data-skill-level');
                bar.style.width = level + '%';
                barObserver.unobserve(bar);
            }
        });
    });
    
    skillBars.forEach(bar => barObserver.observe(bar));
};

animateSkillBars();

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
    // Add animation class to sections
    document.querySelectorAll('div[id]').forEach((section, index) => {
        if (!section.hasAttribute('data-animate')) {
            section.setAttribute('data-animate', 'true');
        }
    });
    
    console.log('✨ Modern portfolio loaded successfully!');
});
