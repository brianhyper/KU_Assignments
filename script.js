// main.js - Complete Interactive Functionality for SME Kenya Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Tab functionality for Solutions section
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Scroll animation for all sections
    const animateOnScroll = () => {
        const elements = document.querySelectorAll(
            '.importance-card, .challenge-card, .case-study-card, ' +
            '.video-wrapper, .conclusion-content, .intro-content, ' +
            '.support-card, .hero-content'
        );
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
    };

    // Initialize animations on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', () => {
        animateOnScroll();
        // Activate first tab by default
        if (tabBtns.length > 0) {
            tabBtns[0].click();
        }
    });

    // Smooth scrolling for anchor links with offset for fixed header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Support Cards Interactive Effects
    const supportCards = document.querySelectorAll('.support-card');
    supportCards.forEach(card => {
        // Add hover effect with delay
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'all 0.3s ease-out';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transition = 'all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)';
        });

        // Click to expand details (for mobile)
        card.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const details = this.querySelector('.support-details');
                details.style.display = details.style.display === 'block' ? 'none' : 'block';
            }
        });
    });

    // Video Lazy Loading
    const videoWrappers = document.querySelectorAll('.video-wrapper');
    const lazyLoadVideos = () => {
        videoWrappers.forEach(wrapper => {
            if (wrapper.getBoundingClientRect().top < window.innerHeight + 200) {
                const iframe = wrapper.querySelector('iframe');
                if (iframe && !iframe.src) {
                    // Replace with actual YouTube embed URLs
                    const videoId = wrapper.classList.contains('video-1') ? 'VIDEO_ID_1' :
                                  wrapper.classList.contains('video-2') ? 'VIDEO_ID_2' : 'VIDEO_ID_3';
                    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0`;
                }
            }
        });
    };

    window.addEventListener('scroll', lazyLoadVideos);
    window.addEventListener('load', lazyLoadVideos);

    // Responsive adjustments
    function handleResponsiveChanges() {
        // Adjust support card details display
        const supportDetails = document.querySelectorAll('.support-details');
        if (window.innerWidth <= 768) {
            supportDetails.forEach(detail => {
                detail.style.display = 'none';
            });
        } else {
            supportDetails.forEach(detail => {
                detail.style.display = 'block';
            });
        }
    }

    window.addEventListener('resize', handleResponsiveChanges);
    handleResponsiveChanges();
});

// Floating elements animation for hero section
function animateFloatingElements() {
    const elements = document.querySelectorAll('.floating-element');
    let time = 0;
    
    elements.forEach((el, index) => {
        // Stagger animations
        setTimeout(() => {
            el.style.animation = `float ${4 + index}s ease-in-out infinite`;
        }, time);
        time += 300;
    });
}

// Initialize hero animations
animateFloatingElements();