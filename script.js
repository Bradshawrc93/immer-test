// Game state - v2.0 with categories and improvements
let gameState = {
    numPlayers: 4,
    numImposters: 1,
    currentPlayer: 1,
    word: '',
    category: '',
    selectedCategory: 'random',
    imposters: [],
    players: [],
    imposterWins: 0
};

// Word categories with their words
const WORD_CATEGORIES = {
    'Animals': [
        'Elephant', 'Giraffe', 'Penguin', 'Dolphin', 'Butterfly', 'Kangaroo', 'Octopus', 'Chameleon',
        'Rhinoceros', 'Flamingo', 'Chimpanzee', 'Seahorse', 'Platypus', 'Hedgehog', 'Leopard', 'Walrus',
        'Antelope', 'Jellyfish', 'Peacock', 'Crocodile', 'Mongoose', 'Koala', 'Pangolin', 'Iguana',
        'Beaver', 'Sloth', 'Toucan', 'Meerkat', 'Porcupine', 'Armadillo', 'Orangutan', 'Wolverine',
        'Chinchilla', 'Narwhal', 'Quokka', 'Manatee', 'Capybara', 'Axolotl', 'Fennec', 'Tapir',
        'Lemur', 'Cheetah', 'Gorilla', 'Zebra', 'Hippopotamus', 'Llama', 'Alpaca', 'Ostrich'
    ],
    'Food & Drinks': [
        'Pizza', 'Hamburger', 'Sandwich', 'Chocolate', 'Coffee', 'Spaghetti', 'Sushi', 'Tacos',
        'Croissant', 'Pancakes', 'Waffles', 'Burrito', 'Lasagna', 'Ramen', 'Bagel', 'Doughnut',
        'Pretzel', 'Cheesecake', 'Tiramisu', 'Macarons', 'Gelato', 'Smoothie', 'Cappuccino', 'Espresso',
        'Milkshake', 'Cupcake', 'Muffin', 'Brownies', 'Cookies', 'Pie', 'Strudel', 'Crepes',
        'Paella', 'Gazpacho', 'Kimchi', 'Curry', 'Tempura', 'Goulash', 'Risotto', 'Quesadilla',
        'Empanada', 'Falafel', 'Hummus', 'Baklava', 'Fondue', 'Ravioli', 'Gnocchi', 'Cannoli'
    ],
    'Places & Buildings': [
        'Castle', 'Library', 'Museum', 'Hospital', 'Cathedral', 'Palace', 'Mansion', 'Stadium',
        'University', 'Observatory', 'Lighthouse', 'Fortress', 'Bakery', 'Marketplace', 'Theater',
        'Aquarium', 'Planetarium', 'Gymnasium', 'Laboratory', 'Factory', 'Warehouse', 'Monastery',
        'Embassy', 'Courthouse', 'Skyscraper', 'Penthouse', 'Cottage', 'Cabin', 'Treehouse', 'Igloo',
        'Pyramid', 'Colosseum', 'Amphitheater', 'Basilica', 'Synagogue', 'Mosque', 'Temple', 'Shrine',
        'Airport', 'Subway', 'Harbor', 'Marina', 'Boardwalk', 'Promenade', 'Boulevard', 'Avenue'
    ],
    'Nature & Weather': [
        'Ocean', 'Mountain', 'Rainbow', 'Waterfall', 'Thunder', 'Garden', 'Fireworks', 'Sunset',
        'Volcano', 'Tornado', 'Blizzard', 'Hurricane', 'Glacier', 'Desert', 'Meadow', 'Avalanche',
        'Lightning', 'Cyclone', 'Typhoon', 'Aurora', 'Constellation', 'Galaxy', 'Nebula', 'Comet',
        'Asteroid', 'Meteorite', 'Eclipse', 'Solstice', 'Equinox', 'Tide', 'Tsunami', 'Geyser',
        'Canyon', 'Valley', 'Plateau', 'Peninsula', 'Island', 'Archipelago', 'Lagoon', 'Fjord',
        'Prairie', 'Savanna', 'Tundra', 'Rainforest', 'Jungle', 'Oasis', 'Delta', 'Estuary'
    ],
    'Transportation': [
        'Airplane', 'Spaceship', 'Submarine', 'Bicycle', 'Helicopter', 'Motorcycle', 'Sailboat',
        'Yacht', 'Cruise', 'Trolley', 'Monorail', 'Gondola', 'Rickshaw', 'Scooter', 'Skateboard',
        'Roller', 'Wheelchair', 'Ambulance', 'Firetruck', 'Bulldozer', 'Excavator', 'Tractor',
        'Steamboat', 'Catamaran', 'Kayak', 'Canoe', 'Surfboard', 'Jetski', 'Hovercraft', 'Blimp',
        'Glider', 'Parachute', 'Balloon', 'Rocket', 'Shuttle', 'Capsule', 'Rover', 'Satellite'
    ],
    'Entertainment & Arts': [
        'Guitar', 'Painting', 'Dancing', 'Circus', 'Carnival', 'Festival', 'Orchestra', 'Concert',
        'Theater', 'Opera', 'Ballet', 'Musical', 'Comedy', 'Drama', 'Sculpture', 'Gallery',
        'Exhibition', 'Performance', 'Recital', 'Symphony', 'Choir', 'Band', 'Jazz', 'Blues',
        'Rock', 'Classical', 'Country', 'Reggae', 'Salsa', 'Tango', 'Waltz', 'Flamenco',
        'Photography', 'Cinema', 'Documentary', 'Animation', 'Cartoon', 'Manga', 'Comic', 'Novel',
        'Poetry', 'Screenplay', 'Masterpiece', 'Artwork', 'Canvas', 'Palette', 'Easel', 'Studio'
    ],
    'Technology & Science': [
        'Telescope', 'Keyboard', 'Computer', 'Smartphone', 'Tablet', 'Headphones', 'Camera',
        'Microscope', 'Stethoscope', 'Calculator', 'Printer', 'Scanner', 'Projector', 'Microphone',
        'Speaker', 'Monitor', 'Laptop', 'Desktop', 'Server', 'Router', 'Modem', 'Antenna',
        'Satellite', 'Radar', 'Sonar', 'GPS', 'Bluetooth', 'WiFi', 'Internet', 'Website',
        'Software', 'Hardware', 'Database', 'Algorithm', 'Programming', 'Coding', 'Binary', 'Digital',
        'Virtual', 'Augmented', 'Artificial', 'Intelligence', 'Robot', 'Automation', 'Innovation'
    ],
    'Sports & Activities': [
        'Basketball', 'Football', 'Soccer', 'Tennis', 'Baseball', 'Hockey', 'Golf', 'Swimming',
        'Running', 'Cycling', 'Skiing', 'Snowboarding', 'Surfing', 'Climbing', 'Hiking', 'Camping',
        'Fishing', 'Hunting', 'Archery', 'Boxing', 'Wrestling', 'Gymnastics', 'Volleyball', 'Badminton',
        'Ping-pong', 'Cricket', 'Rugby', 'Polo', 'Lacrosse', 'Fencing', 'Judo', 'Karate',
        'Taekwondo', 'Yoga', 'Pilates', 'Aerobics', 'Zumba', 'Marathon', 'Triathlon', 'Olympics',
        'Championship', 'Tournament', 'Competition', 'Victory', 'Medal', 'Trophy', 'Award', 'Prize'
    ],
    'Objects & Tools': [
        'Treasure', 'Diamond', 'Emerald', 'Ruby', 'Sapphire', 'Pearl', 'Gold', 'Silver',
        'Crown', 'Scepter', 'Throne', 'Shield', 'Sword', 'Armor', 'Helmet', 'Compass',
        'Map', 'Globe', 'Clock', 'Watch', 'Calendar', 'Diary', 'Journal', 'Notebook',
        'Pencil', 'Pen', 'Marker', 'Crayon', 'Paintbrush', 'Scissors', 'Glue', 'Tape',
        'Stapler', 'Paperclip', 'Folder', 'Binder', 'Envelope', 'Package', 'Box', 'Container',
        'Bottle', 'Jar', 'Cup', 'Mug', 'Glass', 'Plate', 'Bowl', 'Spoon', 'Fork', 'Knife'
    ],
    'Clothing & Fashion': [
        'Dress', 'Shirt', 'Pants', 'Skirt', 'Jacket', 'Coat', 'Sweater', 'Hoodie',
        'Jeans', 'Shorts', 'Blouse', 'Cardigan', 'Blazer', 'Vest', 'Tie', 'Scarf',
        'Hat', 'Cap', 'Beanie', 'Helmet', 'Sunglasses', 'Shoes', 'Boots', 'Sandals',
        'Sneakers', 'Heels', 'Slippers', 'Socks', 'Gloves', 'Mittens', 'Belt', 'Purse',
        'Backpack', 'Suitcase', 'Wallet', 'Jewelry', 'Necklace', 'Bracelet', 'Ring', 'Earrings'
    ],
    'Emotions & Concepts': [
        'Happiness', 'Sadness', 'Anger', 'Fear', 'Surprise', 'Disgust', 'Love', 'Hate',
        'Joy', 'Sorrow', 'Excitement', 'Boredom', 'Curiosity', 'Wonder', 'Amazement', 'Confusion',
        'Confidence', 'Doubt', 'Hope', 'Despair', 'Courage', 'Cowardice', 'Pride', 'Shame',
        'Gratitude', 'Resentment', 'Forgiveness', 'Revenge', 'Peace', 'War', 'Freedom', 'Slavery',
        'Justice', 'Injustice', 'Truth', 'Lie', 'Beauty', 'Ugliness', 'Strength', 'Weakness'
    ],
    'Professions': [
        'Doctor', 'Teacher', 'Engineer', 'Lawyer', 'Artist', 'Musician', 'Writer', 'Chef',
        'Pilot', 'Scientist', 'Architect', 'Designer', 'Photographer', 'Journalist', 'Actor',
        'Director', 'Producer', 'Composer', 'Conductor', 'Dancer', 'Athlete', 'Firefighter',
        'Police', 'Soldier', 'Nurse', 'Dentist', 'Veterinarian', 'Pharmacist', 'Surgeon',
        'Psychologist', 'Therapist', 'Counselor', 'Librarian', 'Historian', 'Archaeologist',
        'Astronaut', 'Explorer', 'Detective', 'Judge', 'Mayor', 'President', 'Ambassador'
    ],
    'Miscellaneous': [
        'Adventure', 'Mystery', 'Secret', 'Surprise', 'Magic', 'Miracle', 'Legend', 'Myth',
        'Story', 'Tale', 'Fable', 'Epic', 'Saga', 'Chronicle', 'History', 'Memory',
        'Dream', 'Nightmare', 'Fantasy', 'Reality', 'Imagination', 'Creativity', 'Innovation',
        'Discovery', 'Invention', 'Revolution', 'Evolution', 'Progress', 'Development', 'Growth',
        'Change', 'Transformation', 'Metamorphosis', 'Rebirth', 'Renewal', 'Revival', 'Resurrection',
        'Beginning', 'End', 'Start', 'Finish', 'Journey', 'Destination', 'Path', 'Road',
        'Bridge', 'Door', 'Window', 'Gate', 'Portal', 'Entrance', 'Exit', 'Passage',
        'Tunnel', 'Cave', 'Cavern', 'Grotto', 'Chamber', 'Room', 'Hall', 'Corridor',
        'Staircase', 'Elevator', 'Escalator', 'Balcony', 'Terrace', 'Patio', 'Deck', 'Porch'
    ]
};

// Flatten all words into a single array for random selection
const WORD_LIST = Object.values(WORD_CATEGORIES).flat();

// DOM elements
const screens = {
    home: document.getElementById('home-screen'),
    instructions: document.getElementById('instructions-screen'),
    setup: document.getElementById('setup-screen'),
    player: document.getElementById('player-screen'),
    play: document.getElementById('play-screen'),
    voting: document.getElementById('voting-screen'),
    playAgain: document.getElementById('play-again-screen'),
    complete: document.getElementById('complete-screen')
};

const elements = {
    startGame: document.getElementById('start-game'),
    showInstructions: document.getElementById('show-instructions'),
    backToHomeFromInstructions: document.getElementById('back-to-home-from-instructions'),
    numPlayers: document.getElementById('num-players'),
    numImposters: document.getElementById('num-imposters'),
    playersDisplay: document.getElementById('players-display'),
    impostersDisplay: document.getElementById('imposters-display'),
    playersMinus: document.getElementById('players-minus'),
    playersPlus: document.getElementById('players-plus'),
    impostersMinus: document.getElementById('imposters-minus'),
    impostersPlus: document.getElementById('imposters-plus'),
    categorySelect: document.getElementById('category-select'),
    beginGame: document.getElementById('begin-game'),
    backToHome: document.getElementById('back-to-home'),
    playerTitle: document.getElementById('player-title'),
    playerReady: document.getElementById('player-ready'),
    viewRole: document.getElementById('view-role'),
    roleReveal: document.getElementById('role-reveal'),
    roleDisplay: document.getElementById('role-display'),
    categoryDisplay: document.getElementById('category-display'),
    tapToReveal: document.getElementById('tap-to-reveal'),
    nextPlayer: document.getElementById('next-player'),
    startDiscussion: document.getElementById('start-discussion'),
    impostersWon: document.getElementById('imposters-won'),
    impostersFound: document.getElementById('imposters-found'),
    categorySelectAgain: document.getElementById('category-select-again'),
    startNewRound: document.getElementById('start-new-round'),
    newGameSetup: document.getElementById('new-game-setup'),
    winsCount: document.getElementById('wins-count'),
    winsCountVoting: document.getElementById('wins-count-voting'),
    winsCountAgain: document.getElementById('wins-count-again'),
    gameWord: document.getElementById('game-word'),
    gamePlayers: document.getElementById('game-players'),
    gameImposters: document.getElementById('game-imposters'),
    newGame: document.getElementById('new-game'),
    backToGame: document.getElementById('back-to-game')
};

// Utility functions
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

function getRandomWord(selectedCategory = 'random') {
    if (selectedCategory === 'random') {
        return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
    } else {
        const categoryWords = WORD_CATEGORIES[selectedCategory];
        return categoryWords[Math.floor(Math.random() * categoryWords.length)];
    }
}

function getWordCategory(word) {
    for (const [category, words] of Object.entries(WORD_CATEGORIES)) {
        if (words.includes(word)) {
            return category;
        }
    }
    return 'Miscellaneous'; // fallback
}

function selectImposters(numPlayers, numImposters) {
    const imposters = [];
    while (imposters.length < numImposters) {
        const randomPlayer = Math.floor(Math.random() * numPlayers) + 1;
        if (!imposters.includes(randomPlayer)) {
            imposters.push(randomPlayer);
        }
    }
    return imposters.sort((a, b) => a - b);
}

function initializeGame() {
    gameState.numPlayers = parseInt(elements.numPlayers.value);
    gameState.numImposters = parseInt(elements.numImposters.value);
    gameState.selectedCategory = elements.categorySelect.value;
    gameState.currentPlayer = 1;
    gameState.word = getRandomWord(gameState.selectedCategory);
    gameState.category = getWordCategory(gameState.word);
    gameState.imposters = selectImposters(gameState.numPlayers, gameState.numImposters);
    gameState.players = [];
    
    // Validate inputs
    if (gameState.numImposters >= gameState.numPlayers) {
        alert('Number of imposters must be less than number of players!');
        return false;
    }
    
    updateWinsDisplay();
    return true;
}

function showPlayerScreen() {
    elements.playerTitle.textContent = `Pass to Player ${gameState.currentPlayer}`;
    elements.playerReady.style.display = 'block';
    elements.roleReveal.classList.add('hidden');
    showScreen('player');
}

function showPlayerRole() {
    elements.playerReady.style.display = 'none';
    elements.roleReveal.classList.remove('hidden');
    
    // Update title to show current player (not "Pass to")
    elements.playerTitle.textContent = `Player ${gameState.currentPlayer}`;
    
    const isImposter = gameState.imposters.includes(gameState.currentPlayer);
    
    // Prepare the role display content but keep it hidden
    if (isImposter) {
        elements.roleDisplay.textContent = 'IMPOSTER';
        elements.roleDisplay.className = 'imposter hidden';
    } else {
        elements.roleDisplay.textContent = gameState.word;
        elements.roleDisplay.className = 'word hidden';
    }
    
    // Set category display (separate from role display)
    elements.categoryDisplay.textContent = `Category: ${gameState.category}`;
    
    // Show tap-to-reveal box and disable next button
    elements.tapToReveal.style.display = 'flex';
    elements.nextPlayer.classList.add('disabled');
    
    // Update next player button text
    if (gameState.currentPlayer === gameState.numPlayers) {
        elements.nextPlayer.textContent = 'Continue';
    } else {
        elements.nextPlayer.textContent = 'Next Player';
    }
}

function nextPlayer() {
    if (gameState.currentPlayer === gameState.numPlayers) {
        showPlayScreen();
    } else {
        gameState.currentPlayer++;
        showPlayerScreen();
    }
}

function showPlayScreen() {
    updateWinsDisplay();
    showScreen('play');
}

function showVotingScreen() {
    updateWinsDisplay();
    showScreen('voting');
}

function showPlayAgainScreen() {
    updateWinsDisplay();
    // Copy current category selection
    elements.categorySelectAgain.value = gameState.selectedCategory;
    showScreen('playAgain');
}

function updateWinsDisplay() {
    if (elements.winsCount) elements.winsCount.textContent = gameState.imposterWins;
    if (elements.winsCountVoting) elements.winsCountVoting.textContent = gameState.imposterWins;
    if (elements.winsCountAgain) elements.winsCountAgain.textContent = gameState.imposterWins;
}

function handleTapToReveal() {
    // Hide the tap-to-reveal box
    elements.tapToReveal.style.display = 'none';
    
    // Show the actual role display
    elements.roleDisplay.classList.remove('hidden');
    
    // Enable the next player button
    elements.nextPlayer.classList.remove('disabled');
}

function impostersWon() {
    gameState.imposterWins++;
    showPlayAgainScreen();
}

function impostersFound() {
    // No increment for imposter wins
    showPlayAgainScreen();
}

function startNewRound() {
    // Use the selected category from the play again screen
    gameState.selectedCategory = elements.categorySelectAgain.value;
    gameState.currentPlayer = 1;
    gameState.word = getRandomWord(gameState.selectedCategory);
    gameState.category = getWordCategory(gameState.word);
    gameState.imposters = selectImposters(gameState.numPlayers, gameState.numImposters);
    showPlayerScreen();
}

function showGameComplete() {
    elements.gameWord.textContent = gameState.word;
    elements.gamePlayers.textContent = gameState.numPlayers;
    elements.gameImposters.textContent = `${gameState.numImposters} (Players: ${gameState.imposters.join(', ')})`;
    showScreen('complete');
}

function resetGame() {
    gameState = {
        numPlayers: 4,
        numImposters: 1,
        currentPlayer: 1,
        word: '',
        category: '',
        selectedCategory: 'random',
        imposters: [],
        players: [],
        imposterWins: 0
    };
    elements.numPlayers.value = 4;
    elements.numImposters.value = 1;
    elements.categorySelect.value = 'random';
    updateWinsDisplay();
    showScreen('home');
}

// Event listeners
elements.startGame.addEventListener('click', () => {
    showScreen('setup');
});

elements.showInstructions.addEventListener('click', () => {
    showScreen('instructions');
});

elements.backToHomeFromInstructions.addEventListener('click', () => {
    showScreen('home');
});

elements.beginGame.addEventListener('click', () => {
    if (initializeGame()) {
        showPlayerScreen();
    }
});

elements.backToHome.addEventListener('click', () => {
    showScreen('home');
});

elements.viewRole.addEventListener('click', () => {
    showPlayerRole();
});

elements.nextPlayer.addEventListener('click', () => {
    nextPlayer();
});

elements.startDiscussion.addEventListener('click', () => {
    showVotingScreen();
});

// Voting screen event listeners
elements.impostersWon.addEventListener('click', () => {
    impostersWon();
});

elements.impostersFound.addEventListener('click', () => {
    impostersFound();
});

// Play again screen event listeners
elements.startNewRound.addEventListener('click', () => {
    startNewRound();
});

elements.newGameSetup.addEventListener('click', () => {
    resetGame();
});

// Tap to reveal functionality
elements.tapToReveal.addEventListener('click', () => {
    handleTapToReveal();
});

elements.newGame.addEventListener('click', () => {
    resetGame();
});

elements.backToGame.addEventListener('click', () => {
    showScreen('home');
});

// Input validation
elements.numPlayers.addEventListener('input', () => {
    const players = parseInt(elements.numPlayers.value);
    const imposters = parseInt(elements.numImposters.value);
    
    if (imposters >= players) {
        elements.numImposters.value = Math.max(1, players - 1);
    }
});

elements.numImposters.addEventListener('input', () => {
    const players = parseInt(elements.numPlayers.value);
    const imposters = parseInt(elements.numImposters.value);
    
    if (imposters >= players) {
        elements.numImposters.value = Math.max(1, players - 1);
    }
});

// Counter functionality
function updatePlayerCount(change) {
    const current = parseInt(elements.numPlayers.value);
    const newCount = Math.max(3, Math.min(10, current + change));
    
    elements.numPlayers.value = newCount;
    elements.playersDisplay.textContent = newCount;
    gameState.numPlayers = newCount;
    
    // Validate imposters count
    const currentImposters = parseInt(elements.numImposters.value);
    if (currentImposters >= newCount) {
        const maxImposters = Math.max(1, newCount - 1);
        elements.numImposters.value = maxImposters;
        elements.impostersDisplay.textContent = maxImposters;
        gameState.numImposters = maxImposters;
    }
}

function updateImposterCount(change) {
    const current = parseInt(elements.numImposters.value);
    const playerCount = parseInt(elements.numPlayers.value);
    const maxImposters = Math.max(1, playerCount - 1);
    const newCount = Math.max(1, Math.min(maxImposters, current + change));
    
    elements.numImposters.value = newCount;
    elements.impostersDisplay.textContent = newCount;
    gameState.numImposters = newCount;
}

// Counter event listeners
elements.playersMinus.addEventListener('click', () => updatePlayerCount(-1));
elements.playersPlus.addEventListener('click', () => updatePlayerCount(1));
elements.impostersMinus.addEventListener('click', () => updateImposterCount(-1));
elements.impostersPlus.addEventListener('click', () => updateImposterCount(1));

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    showScreen('home');
    updateWinsDisplay();
    
    // Initialize counter displays
    elements.playersDisplay.textContent = gameState.numPlayers;
    elements.impostersDisplay.textContent = gameState.numImposters;
});
