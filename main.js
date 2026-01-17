// Helper function to fix Google Drive URLs
function fixDriveUrl(url) {
    if (!url) return '';
    if (url.includes('drive.google.com')) {
        let fileId = '';
        if (url.includes('id=')) {
            fileId = url.split('id=')[1].split('&')[0];
        } else if (url.includes('/d/')) {
            fileId = url.split('/d/')[1].split('/')[0];
        }
        return fileId ? `https://lh3.googleusercontent.com/d/${fileId}` : url;
    }
    return url;
}

// Master Data - Checks localStorage first for Admin Changes
const defaultGames = [
    // Range 149
    { name: "Sekiro: Shadows Die Twice", price: 149, oldPrice: 3999, range: "149", platform: "PC / PS", image: "https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg", badge: "POPULAR" },
    { name: "Days Gone", price: 149, oldPrice: 2999, range: "149", platform: "PC / PS", image: "https://upload.wikimedia.org/wikipedia/en/a/a3/Days_Gone_cover_art.jpg" },
    { name: "The Witcher 3: Wild Hunt", price: 149, oldPrice: 1999, range: "149", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/0/0b/Witcher_3_cover_art.jpg", badge: "GOTY" },
    { name: "God of War 4", price: 149, oldPrice: 3299, range: "149", platform: "PC / PS", image: "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg", badge: "BEST SELLER" },
    { name: "Detroit: Become Human", price: 149, oldPrice: 2499, range: "149", platform: "PC / PS", image: "https://upload.wikimedia.org/wikipedia/en/a/a7/Detroit_Become_Human_cover_art.jpg" },
    { name: "Cricket 24", price: 149, oldPrice: 3999, range: "149", platform: "PC / PS / Xbox", image: "https://m.media-amazon.com/images/I/81B-8-09-WL._SL1500_.jpg", badge: "NEW" },
    { name: "WWE 2K23", price: 149, oldPrice: 3499, range: "149", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/6/60/WWE_2K23_cover_art.jpg" },
    { name: "Resident Evil Village", price: 149, oldPrice: 2999, range: "149", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/2/2c/Resident_Evil_Village_cover_art.png" },
    { name: "Far Cry 5", price: 149, oldPrice: 2999, range: "149", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/0/0a/Far_Cry_5_cover_art.jpg" },
    { name: "Far Cry 6", price: 149, oldPrice: 3999, range: "149", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/3/35/Far_Cry_6_cover_art.jpg", badge: "OFFER" },
    { name: "Hitman 3", price: 149, oldPrice: 3499, range: "149", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/4/4b/Hitman_3_Packshot.jpg" },
    { name: "Motel Manager Simulator", price: 149, oldPrice: 899, range: "149", platform: "PC", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2660100/capsule_616x353.jpg", badge: "HOT" },
    { name: "Assassin's Creed Valhalla", price: 149, oldPrice: 3999, range: "149", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/f/ff/Assassins_Creed_Valhalla_cover.jpg" },
    { name: "Forza Horizon 4", price: 149, oldPrice: 3299, range: "149", platform: "PC / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/8/87/Forza_Horizon_4_cover.jpg" },
    { name: "Assassin's Creed Origins", price: 149, oldPrice: 2999, range: "149", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/4/4a/Assassin%27s_Creed_Origins_Cover_Art.png" },
    { name: "Assassin's Creed Odyssey", price: 149, oldPrice: 3499, range: "149", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/9/9d/Assassin%27s_Creed_Odyssey_Cover_Art.png" },

    // Range 199
    { name: "Black Myth: Wukong", price: 199, oldPrice: 4999, range: "199", platform: "PC / PS5", image: "https://upload.wikimedia.org/wikipedia/en/2/2f/Black_Myth_Wukong_cover_art.jpg", badge: "PREMIUM" },
    { name: "The Last of Us Part II", price: 199, oldPrice: 3999, range: "199", platform: "PS4 / PS5", image: "https://upload.wikimedia.org/wikipedia/en/4/4f/TLOU_Part_II_cover_art.png" },
    { name: "Spider-Man 2 Deluxe", price: 199, oldPrice: 5999, range: "199", platform: "PS5", image: "https://i.redd.it/d4g4k0x2w15b1.jpg", badge: "DELUXE" },
    { name: "The First Berserker: Khazan", price: 199, oldPrice: 4499, range: "199", platform: "PC / PS5 / Xbox", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2124490/capsule_616x353.jpg", badge: "UPCOMING" },
    { name: "Ghost of Tsushima", price: 199, oldPrice: 4499, range: "199", platform: "PC / PS4 / PS5", image: "https://static.wikia.nocookie.net/ghost-of-tsushima/images/8/86/Ghost_of_Tsushima_Boxart.jpeg", badge: "TOP RATED" },
    { name: "God of War Ragnarök", price: 199, oldPrice: 4999, range: "199", platform: "PC / PS4 / PS5", image: "https://m.media-amazon.com/images/I/81u72y-8jWL._SL1500_.jpg" },
    { name: "Alan Wake 2", price: 199, oldPrice: 3499, range: "199", platform: "PC / PS5 / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/e/ed/Alan_Wake_2_box_art.jpg" },
    { name: "EA Sports FC 25", price: 199, oldPrice: 4499, range: "199", platform: "PC / PS / Xbox", image: "https://images.immediate.co.uk/production/volatile/sites/3/2024/07/FC-25-cover-5b722d7.jpg", badge: "NEW" },
    { name: "Grand Theft Auto V", price: 199, oldPrice: 2499, range: "199", platform: "PC / PS / Xbox", image: "https://www.gtaboom.com/wp-content/uploads/2013/04/GTA-V-Boxart.jpg", badge: "MUST HAVE" },
    { name: "Red Dead Redemption 2", price: 199, oldPrice: 3999, range: "199", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg", badge: "CLASSIC" },
    { name: "Elden Ring + DLC", price: 199, oldPrice: 5499, range: "199", platform: "PC / PS / Xbox", image: "https://i.redd.it/z31d044p5x4b1.jpg", badge: "EXTENDED" },
    { name: "Resident Evil 4 Remake", price: 199, oldPrice: 3999, range: "199", platform: "PC / PS / Xbox", image: "https://upload.wikimedia.org/wikipedia/en/d/df/Resident_Evil_4_remake_cover_art.jpg" },
    { name: "Horizon Forbidden West", price: 199, oldPrice: 3999, range: "199", platform: "PC / PS4 / PS5", image: "https://upload.wikimedia.org/wikipedia/en/6/69/Horizon_Forbidden_West_cover_art.jpg" },
    { name: "Warhammer 40K: Space Marine 2", price: 199, oldPrice: 4999, range: "199", platform: "PC / PS5 / Xbox", image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1544020/capsule_616x353.jpg", badge: "TRENDING" }
];

const gamesData = JSON.parse(localStorage.getItem('nexplayy_games')) || defaultGames;
const heroData = JSON.parse(localStorage.getItem('nexplayy_hero')) || { title: "LEVEL UP YOUR <br><span style='color: var(--primary-color)'>GAMING LIBRARY</span>", sub: "NexPlayy Store provides 100% genuine games for PC & Console at prices that will blow your mind." };

// Sync initial data to localStorage for first-time admin use
if (!localStorage.getItem('nexplayy_games')) {
    localStorage.setItem('nexplayy_games', JSON.stringify(defaultGames));
}

// Update Hero Section on Load
function updateHeroDOM() {
    const heroH1 = document.querySelector('.hero h1');
    const heroP = document.querySelector('.hero p');
    if (heroH1) heroH1.innerHTML = heroData.title;
    if (heroP) heroP.textContent = heroData.sub;
}

// Elements
const gamesGrid = document.getElementById('gamesGrid');
const gameSearch = document.getElementById('gameSearch');
const filterBtns = document.querySelectorAll('.filter-btn');
const navbar = document.getElementById('navbar');

// Render Games
function renderGames(filter = 'all', search = '') {
    gamesGrid.innerHTML = '';

    const filteredGames = gamesData.filter(game => {
        const matchesFilter = filter === 'all' || game.range === filter;
        const matchesSearch = game.name.toLowerCase().includes(search.toLowerCase()) ||
            game.platform.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (filteredGames.length === 0) {
        gamesGrid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-dim);">No games found matching your search.</div>';
        return;
    }

    filteredGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card glass';

        const imageUrl = fixDriveUrl(game.image);
        const badgeHtml = game.badge ? `<div class="offer-badge">${game.badge}</div>` : '';
        const oldPriceHtml = game.oldPrice ? `<span class="game-old-price">₹${game.oldPrice}</span>` : '';

        card.innerHTML = `
            <div class="game-img-container">
                ${badgeHtml}
                <img src="${imageUrl}" class="game-img" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80'">
            </div>
            <div class="game-info">
                <span class="game-platform">${game.platform}</span>
                <h3 class="game-name" title="${game.name}">${game.name}</h3>
                <div class="game-price-tag">
                    <span class="game-price">₹${game.price}</span>
                    ${oldPriceHtml}
                </div>
                <p class="game-desc">Full access digital license. Verified original game. Order via DM.</p>
                <a href="https://ig.me/m/nexplayy.store?text=I%20want%20to%20buy%20${encodeURIComponent(game.name)}" class="btn btn-primary" style="width: 100%;">DM To Buy</a>
            </div>
        `;

        gamesGrid.appendChild(card);
    });
}

// Events
gameSearch.addEventListener('input', (e) => {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    renderGames(activeFilter, e.target.value);
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGames(btn.dataset.filter, gameSearch.value);
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Scroll Reveal
const revealOnScroll = () => {
    const elements = document.querySelectorAll('.glass, .section-title, .game-card, .step-card');
    const triggerBottom = window.innerHeight * 0.9;
    elements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }
    });
};

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
    updateHeroDOM();
    renderGames();
    revealOnScroll();
});
