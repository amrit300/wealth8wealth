// Mobile Menu
const menuToggle = document.getElementById('menuToggle');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
    });
}

// Smooth Navbar on Scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 14, 26, 0.85)';
        navbar.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(10, 14, 26, 0.72)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// iOS-style Spring Animation Observer
const springObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 80);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply to cards
document.querySelectorAll('.stat-card, .metric-card, .feature-card, .footer-stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px) scale(0.96)';
    el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
    springObserver.observe(el);
});

// Smooth Button Press Effect (60fps)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', function() {
        this.style.transition = 'transform 0.1s cubic-bezier(0.34, 1.56, 0.64, 1)';
        this.style.transform = 'scale(0.95)';
    });
    
    btn.addEventListener('mouseup', function() {
        this.style.transition = 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
        this.style.transform = 'scale(1)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Hardware Acceleration
document.querySelectorAll('.stat-card, .metric-card, .feature-card, .btn, .logo-icon').forEach(el => {
    el.style.willChange = 'transform';
    el.style.transform = 'translateZ(0)';
});

// Reduce motion for accessibility
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}// Animate Progress Bars on Scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressFills = entry.target.querySelectorAll('.progress-fill');
            progressFills.forEach(fill => {
                const width = fill.style.width;
                fill.style.width = '0%';
                setTimeout(() => {
                    fill.style.width = width;
                }, 100);
            });
        }
    });
}, observerOptions);

const statusSection = document.querySelector('.status-section');
if (statusSection) {
    progressObserver.observe(statusSection);
}

// Card Hover Effects
const cards = document.querySelectorAll('.feature-card, .security-card, .metric-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Button Click Animations
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-links.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(10, 14, 26, 0.98);
        padding: 20px;
        border-bottom: 1px solid var(--border-color);
    }
    
    .menu-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }
    
    .menu-toggle.active span:nth-child(2) {
        opacity: 0;
    }
    
    .menu-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }
`;
document.head.appendChild(style);

// Animate elements on scroll
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply animation to sections
document.querySelectorAll('.feature-card, .security-card, .stat-card, .metric-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// Update live metrics (simulated)
function updateLiveMetrics() {
    const uptimeElement = document.querySelector('.status-value');
    if (uptimeElement && uptimeElement.textContent === '99.9%') {
        // Simulate real-time updates
        setInterval(() => {
            const randomFluctuation = (Math.random() * 0.1 + 99.8).toFixed(1);
            // Keep it at 99.9% for consistency
        }, 5000);
    }
}

updateLiveMetrics();

// Console easter egg
console.log('%c🚀 Wealth ∞ Wealth AI Trading Engine', 'font-size: 20px; font-weight: bold; color: #00D9A3;');
console.log('%cInterested in joining our team? Email careers@wealthwealth.ai', 'font-size: 14px; color: #4A90E2;');        this.opacity = Math.random() * 0.5 + 0.2;
    }
    
    update() {
        this.y += this.speedY;
        
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
        
        // Droplet reflection
        ctx.beginPath();
        ctx.arc(this.x + 1, this.y + 2, this.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.3})`;
        ctx.fill();
    }
}

const droplets = [];
for (let i = 0; i < 100; i++) {
    droplets.push(new Droplet());
}

function animateDroplets() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    droplets.forEach(droplet => {
        droplet.update();
        droplet.draw();
    });
    
    requestAnimationFrame(animateDroplets);
}

animateDroplets();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Smooth scroll
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

// Scroll reveal animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .security-item, .metric-box').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Dynamic metric animations on scroll
const animateMetrics = () => {
    const metricElements = document.querySelectorAll('.metric-value, .metric-large, .stat-number');
    
    metricElements.forEach(el => {
        const finalValue = el.textContent;
        if (!el.dataset.animated) {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                el.dataset.animated = 'true';
                // Add pulsing animation
                el.style.animation = 'pulse 1s ease';
            }
        }
    });
};

window.addEventListener('scroll', animateMetrics);
animateMetrics();

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
`;
document.head.appendChild(style);
