// ===========================
// BLOG FILTER & SEARCH
// ===========================

const filterButtons = document.querySelectorAll('.filter-btn');
const blogCards = document.querySelectorAll('.blog-card');
const searchInput = document.getElementById('searchInput');
const noResults = document.getElementById('noResults');

// Filter functionality
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        filterCards(filterValue, searchInput.value.toLowerCase());
    });
});

// Search functionality
searchInput.addEventListener('keyup', () => {
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
    filterCards(activeFilter, searchInput.value.toLowerCase());
});

// Filter cards function
function filterCards(category, searchTerm) {
    let visibleCount = 0;
    
    blogCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        const title = card.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
        
        // Check category filter
        const categoryMatch = category === 'all' || cardCategory === category;
        
        // Check search filter
        const searchMatch = title.includes(searchTerm) || excerpt.includes(searchTerm);
        
        if (categoryMatch && searchMatch) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeIn 0.5s ease forwards';
            visibleCount++;
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
    
    // Show/hide no results message
    if (visibleCount === 0) {
        noResults.style.display = 'block';
    } else {
        noResults.style.display = 'none';
    }
}

// ===========================
// NEWSLETTER SUBSCRIPTION
// ===========================

const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Simple email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailRegex.test(email)) {
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing! Check your email for confirmation.');
            newsletterForm.reset();
        } else {
            alert('Please enter a valid email address.');
        }
    });
}

// ===========================
// SMOOTH SCROLL
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// READ MORE LINKS (PLACEHOLDER)
// ===========================

const readMoreLinks = document.querySelectorAll('.read-more');

readMoreLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        alert('This blog post will open when connected to backend. For now, this is a preview!');
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.5s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

blogCards.forEach(card => observer.observe(card));

// ===========================
// CONSOLE LOG
// ===========================

console.log('%cWelcome to my blog!', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cCheck out the latest articles on web development and programming.', 'color: #764ba2; font-size: 14px;');
