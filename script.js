document.addEventListener('DOMContentLoaded', function() {
    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.section');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const searchBtn = document.querySelector('.search-btn');
    const searchOverlay = document.querySelector('.search-overlay');
    const closeSearch = document.querySelector('.close-search');
    const filterBtn = document.querySelector('.filter-btn');
    const filterContent = document.querySelector('.filter-content');
    const viewOptions = document.querySelectorAll('.view-options button');
    const gallery = document.querySelector('.gallery');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('active');
    });

    // Search overlay
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        searchOverlay.classList.add('active');
        searchOverlay.querySelector('input').focus();
    });

    closeSearch.addEventListener('click', function() {
        searchOverlay.classList.remove('active');
    });

    // Close search on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
            searchOverlay.classList.remove('active');
        }
    });

    // Filter dropdown
    filterBtn.addEventListener('click', function() {
        filterContent.classList.toggle('active');
    });

    // Close filter when clicking outside
    document.addEventListener('click', function(e) {
        if (!filterBtn.contains(e.target) && !filterContent.contains(e.target)) {
            filterContent.classList.remove('active');
        }
    });

    // View options (grid/list)
    viewOptions.forEach(option => {
        option.addEventListener('click', function() {
            viewOptions.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (this.classList.contains('list-view')) {
                gallery.classList.add('list-view');
            } else {
                gallery.classList.remove('list-view');
            }
        });
    });

    // Navigation handling
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');

            // Close mobile menu if open
            if (sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    });

    // Quick view functionality
    const quickViewBtns = document.querySelectorAll('.quick-view');
    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tileCard = this.closest('.tile-card');
            const tileName = tileCard.querySelector('h3').textContent;
            const tileImage = tileCard.querySelector('img').src;
            const tilePrice = tileCard.querySelector('.price').textContent;
            
            // Create and show quick view modal
            showQuickViewModal(tileName, tileImage, tilePrice);
        });
    });

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tileCard = this.closest('.tile-card');
            const tileName = tileCard.querySelector('h3').textContent;
            
            // Update cart count
            const cartCount = document.querySelector('.cart-count');
            cartCount.textContent = parseInt(cartCount.textContent) + 1;
            
            // Show notification
            showNotification(`${tileName} added to cart`);
        });
    });

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            if (email) {
                showNotification('Thank you for subscribing!');
                this.reset();
            }
        });
    }

    // Helper function to show quick view modal
    function showQuickViewModal(name, image, price) {
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <div class="modal-body">
                    <img src="${image}" alt="${name}">
                    <div class="modal-info">
                        <h2>${name}</h2>
                        <p class="price">${price}</p>
                        <div class="quantity">
                            <button class="quantity-btn minus">-</button>
                            <input type="number" value="1" min="1">
                            <button class="quantity-btn plus">+</button>
                        </div>
                        <button class="add-to-cart">Add to Cart</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('active'), 10);

        // Close modal functionality
        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        });

        // Quantity buttons
        const minusBtn = modal.querySelector('.minus');
        const plusBtn = modal.querySelector('.plus');
        const quantityInput = modal.querySelector('input[type="number"]');

        minusBtn.addEventListener('click', () => {
            if (quantityInput.value > 1) {
                quantityInput.value = parseInt(quantityInput.value) - 1;
            }
        });

        plusBtn.addEventListener('click', () => {
            quantityInput.value = parseInt(quantityInput.value) + 1;
        });
    }

    // Helper function to show notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add CSS for notifications and quick view modal
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: var(--secondary-color);
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            transform: translateY(100px);
            opacity: 0;
            transition: all 0.3s ease;
            z-index: 1000;
        }

        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }

        .quick-view-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        .quick-view-modal.active {
            opacity: 1;
        }

        .modal-content {
            background-color: white;
            padding: 30px;
            border-radius: 10px;
            max-width: 800px;
            width: 90%;
            position: relative;
            transform: translateY(50px);
            transition: transform 0.3s ease;
        }

        .quick-view-modal.active .modal-content {
            transform: translateY(0);
        }

        .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
        }

        .modal-body {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }

        .modal-body img {
            width: 100%;
            height: auto;
            border-radius: 5px;
        }

        .modal-info h2 {
            margin-bottom: 15px;
        }

        .quantity {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 20px 0;
        }

        .quantity-btn {
            width: 30px;
            height: 30px;
            border: 1px solid #ddd;
            background: none;
            cursor: pointer;
        }

        .quantity input {
            width: 50px;
            text-align: center;
            border: 1px solid #ddd;
            padding: 5px;
        }

        @media (max-width: 768px) {
            .modal-body {
                grid-template-columns: 1fr;
            }
        }
    `;
    document.head.appendChild(style);
}); 