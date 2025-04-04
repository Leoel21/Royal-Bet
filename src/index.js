        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
        
        // Modal functionality
        const loginBtn = document.querySelector('.login-btn');
        const registerBtn = document.querySelector('.register-btn');
        const loginModal = document.getElementById('loginModal');
        const closeModal = document.getElementById('closeModal');
        
        function openModal() {
            loginModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeModalFunc() {
            loginModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        loginBtn.addEventListener('click', openModal);
        registerBtn.addEventListener('click', openModal);
        closeModal.addEventListener('click', closeModalFunc);
        
        // Close modal when clicking outside
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeModalFunc();
            }
        });
        
        // Form submission
        const loginForm = document.getElementById('loginForm');
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // In a real app, you would send this data to a server
            console.log('Login attempt:', { email, password });
            
            // Show success message
            alert('¡Inicio de sesión simulado exitoso!');
            closeModalFunc();
        });
        
        // Game filtering
        const gameTabs = document.querySelectorAll('.game-tab');
        const gameGrid = document.getElementById('gameGrid');
        
        // Game data
        const games = [
            { id: 1, name: 'Super Jackpot', category: 'slots', image: '/api/placeholder/250/180' },
            { id: 2, name: 'Royal Blackjack', category: 'table', image: '/api/placeholder/250/180' },
            { id: 3, name: 'Premium Roulette', category: 'table', image: '/api/placeholder/250/180' },
            { id: 4, name: 'Golden Slots', category: 'slots', image: '/api/placeholder/250/180' },
            { id: 5, name: 'Live Poker', category: 'live', image: '/api/placeholder/250/180' },
            { id: 6, name: 'Diamond Fortune', category: 'slots', image: '/api/placeholder/250/180' },
            { id: 7, name: 'VIP Baccarat', category: 'live', image: '/api/placeholder/250/180' },
            { id: 8, name: 'Lucky Sevens', category: 'slots', image: '/api/placeholder/250/180' }
        ];
        
        // Function to create game cards
        function renderGames(category = 'all') {
            gameGrid.innerHTML = '';
            
            const filteredGames = category === 'all' 
                ? games 
                : games.filter(game => game.category === category);
            
            filteredGames.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.className = 'game-card';
                gameCard.innerHTML = `
                    <div class="game-img" style="background-image: url('${game.image}')"></div>
                    <div class="game-content">
                        <h3 class="game-title">${game.name}</h3>
                        <button class="game-play">Jugar Ahora</button>
                    </div>
                `;
                gameGrid.appendChild(gameCard);
                
                // Add click event to game buttons
                const playBtn = gameCard.querySelector('.game-play');
                playBtn.addEventListener('click', () => {
                    alert(`¡Esta es una demo! El juego ${game.name} se abriría aquí.`);
                });
            });
        }
        
        // Initialize with all games
        renderGames();
        
        // Add click events to tabs
        gameTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                gameTabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                tab.classList.add('active');
                
                // Render games based on category
                const category = tab.getAttribute('data-category');
                renderGames(category);
            });
        });
        
        // Slot machine mini-game
        const reel1 = document.getElementById('reel1');
        const reel2 = document.getElementById('reel2');
        const reel3 = document.getElementById('reel3');
        const spinButton = document.getElementById('spinButton');
        const slotResult = document.getElementById('slotResult');
        
        // Slot symbols
        const symbols = ['7', '🍒', '🍊', '🍋', '💎', '🔔'];
        
   // Spin animation
let spinning = false;

function spin() {
    if (spinning) return;
    spinning = true;
    
    // Disable button during spin
    spinButton.disabled = true;
    spinButton.textContent = "Girando...";
    slotResult.textContent = "";
    
    // Add animation class to reels
    reel1.classList.add('shimmer');
    reel2.classList.add('shimmer');
    reel3.classList.add('shimmer');
    
    // Generate random results with timing for each reel
    let results = [];
    
    // Spin each reel with increasing delay
    setTimeout(() => {
        // Stop first reel
        let symbolIndex1 = Math.floor(Math.random() * symbols.length);
        reel1.textContent = symbols[symbolIndex1];
        reel1.classList.remove('shimmer');
        results.push(symbols[symbolIndex1]);
        
        setTimeout(() => {
            // Stop second reel
            let symbolIndex2 = Math.floor(Math.random() * symbols.length);
            reel2.textContent = symbols[symbolIndex2];
            reel2.classList.remove('shimmer');
            results.push(symbols[symbolIndex2]);
            
            setTimeout(() => {
                // Stop third reel
                let symbolIndex3 = Math.floor(Math.random() * symbols.length);
                reel3.textContent = symbols[symbolIndex3];
                reel3.classList.remove('shimmer');
                results.push(symbols[symbolIndex3]);
                
                // Check results
                checkWin(results);
                
                // Re-enable button
                spinning = false;
                spinButton.disabled = false;
                spinButton.textContent = "Girar";
            }, 600); // Third reel stops after 600ms
        }, 500); // Second reel stops after 500ms
    }, 400); // First reel stops after 400ms
}

function checkWin(results) {
    // Check if all three symbols match
    if (results[0] === results[1] && results[1] === results[2]) {
        slotResult.textContent = `¡Ganaste! Triple ${results[0]}`;
        slotResult.style.color = "#ffd700"; // Gold color for win
    } 
    // Check if at least two symbols match
    else if (results[0] === results[1] || results[1] === results[2] || results[0] === results[2]) {
        slotResult.textContent = "¡Par coincidente! Pequeña victoria";
        slotResult.style.color = "#add8e6"; // Light blue for small win
    } 
    // No match
    else {
        slotResult.textContent = "Intenta otra vez";
        slotResult.style.color = "#ffffff"; // White for no win
    }
}

// Add event listener to spin button
spinButton.addEventListener('click', spin);

// Animation for gold elements
const goldElements = document.querySelectorAll('.logo, .section-title');
setInterval(() => {
    goldElements.forEach(element => {
        element.style.backgroundImage = `linear-gradient(${Math.random() * 360}deg, #b8860b, #ffd700, #b8860b)`;
    });
}, 3000);

// Intersection Observer for animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

// Observe feature cards and game cards
document.querySelectorAll('.feature-card, .game-card').forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Initialize tooltips
const tooltipElements = document.querySelectorAll('[data-tooltip]');
tooltipElements.forEach(element => {
    element.addEventListener('mouseenter', (e) => {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = e.target.getAttribute('data-tooltip');
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10 + window.scrollY}px`;
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        
        setTimeout(() => tooltip.style.opacity = 1, 10);
    });
    
    element.addEventListener('mouseleave', () => {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.style.opacity = 0;
            setTimeout(() => tooltip.remove(), 300);
        }
    });
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Offset for fixed header
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('show');
        }
    });
});

// Add notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Hide and remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(120%)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Demo notification
setTimeout(() => {
    showNotification('¡Bienvenido a Royal Bet! Este es un proyecto de demostración.');
}, 2000);

// Add CSS for notifications
const styleElement = document.createElement('style');
styleElement.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--primary);
        color: var(--secondary);
        padding: 12px 20px;
        border-radius: 5px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.3);
        transform: translateX(120%);
        transition: transform 0.3s ease;
        z-index: 1000;
        max-width: 300px;
    }
    
    .notification.success {
        background: #4caf50;
        color: white;
    }
    
    .notification.error {
        background: #f44336;
        color: white;
    }
    
    .tooltip {
        position: absolute;
        background: var(--dark);
        color: var(--light);
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.8rem;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s;
        z-index: 100;
        pointer-events: none;
    }
    
    .tooltip::after {
        content: '';
        position: absolute;
        bottom: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-top: 5px solid var(--dark);
    }
`;
document.head.appendChild(styleElement);

// Set win probability for the slot machine (for demo purposes)
const WIN_PROBABILITY = 0.3; // 30% chance for a match

// Modify the random generation to sometimes force matches
function getWeightedRandomSymbols() {
    if (Math.random() < WIN_PROBABILITY) {
        // Force a win by making at least two symbols match
        const winningSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        if (Math.random() < 0.4) { // 40% chance for a triple match
            return [winningSymbol, winningSymbol, winningSymbol];
        } else {
            // Double match - randomly decide which two slots match
            const nonMatchingSymbol = symbols.filter(s => s !== winningSymbol)[
                Math.floor(Math.random() * (symbols.length - 1))
            ];
            
            const pattern = Math.floor(Math.random() * 3);
            if (pattern === 0) {
                return [winningSymbol, winningSymbol, nonMatchingSymbol];
            } else if (pattern === 1) {
                return [winningSymbol, nonMatchingSymbol, winningSymbol];
            } else {
                return [nonMatchingSymbol, winningSymbol, winningSymbol];
            }
        }
    }
    
    // No match - all random
    return [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
    ];
}
