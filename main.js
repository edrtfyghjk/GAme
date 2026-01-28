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
        // Use the Google Drive 'uc' endpoint which works for images and videos when the file is shared publicly
        return fileId ? `https://drive.google.com/uc?export=view&id=${fileId}` : url;
    }
    return url;
}

function isVideoUrl(url) {
    if (!url) return false;
    const videoExt = ['.mp4', '.webm', '.ogg', '.mov'];
    try {
        const lower = url.split('?')[0].toLowerCase();
        return videoExt.some(ext => lower.endsWith(ext));
    } catch (e) { return false; }
}

function mediaHtmlFor(url, cls = 'game-img') {
    const u = fixDriveUrl(url);
    if (isVideoUrl(u)) {
        return `<video class="${cls}" controls playsinline preload="metadata"><source src="${u}"></video>`;
    }
    return `<img src="${u}" class="${cls}" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80'">`;
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

// Ranges and Bundles (admin controllable)
const defaultRanges = ['149', '199'];
const rangesData = JSON.parse(localStorage.getItem('nexplayy_ranges')) || defaultRanges;
const bundlesData = JSON.parse(localStorage.getItem('nexplayy_bundles')) || [];

// Sync initial data to localStorage for first-time admin use
if (!localStorage.getItem('nexplayy_games')) {
    localStorage.setItem('nexplayy_games', JSON.stringify(defaultGames));
}
if (!localStorage.getItem('nexplayy_ranges')) {
    localStorage.setItem('nexplayy_ranges', JSON.stringify(defaultRanges));
}
if (!localStorage.getItem('nexplayy_bundles')) {
    localStorage.setItem('nexplayy_bundles', JSON.stringify(bundlesData));
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
const filterTabsContainer = document.querySelector('.filter-tabs');
const bundlesContainer = document.getElementById('bundlesContainer');
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

        // click to open detail modal
        card.addEventListener('click', () => showGameDetail(game));

        const badgeHtml = game.badge ? `<div class="offer-badge">${game.badge}</div>` : '';
        const oldPriceHtml = game.oldPrice ? `<span class="game-old-price">₹${game.oldPrice}</span>` : '';
        const descHtml = game.description ? `<p class="game-desc">${game.description}</p>` : `<p class="game-desc">Full access digital license. Verified original game. Order via DM.</p>`;
        const mediaHtml = mediaHtmlFor(game.image, 'game-img');

        card.innerHTML = `
            <div class="game-img-container">
                ${badgeHtml}
                ${mediaHtml}
            </div>
            <div class="game-info">
                <span class="game-platform">${game.platform}</span>
                <h3 class="game-name" title="${game.name}">${game.name}</h3>
                <div class="game-price-tag">
                    <span class="game-price">₹${game.price}</span>
                    ${oldPriceHtml}
                </div>
                ${descHtml}
                <a href="https://ig.me/m/nexplayy.store?text=I%20want%20to%20buy%20${encodeURIComponent(game.name)}" class="btn btn-primary" style="width: 100%;">DM To Buy</a>
            </div>
        `;

        gamesGrid.appendChild(card);
    });
}

// Featured carousel (uses first 4 games or ones with badge)
function renderFeaturedCarousel() {
    const container = document.getElementById('featuredCarousel');
    if (!container) return;
    container.innerHTML = '';
    // read featured from localStorage if present
    const featuredRaw = JSON.parse(localStorage.getItem('nexplayy_featured')) || [];
    const featuredNames = featuredRaw.map(f => f.name);
    const use = featuredNames.length ? featuredNames.map(n => gamesData.find(g=>g.name===n)).filter(Boolean) : gamesData.filter(g => ['HOT','OFFER','POPULAR','BEST SELLER','DELUXE','PREMIUM'].includes((g.badge||'').toUpperCase())).slice(0,4);

    use.forEach((g, idx) => {
        const el = document.createElement('div');
        el.className = 'feature-slide glass';
        el.style.backgroundImage = `linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2)), url('${fixDriveUrl(g.image)}')`;
        const note = (featuredRaw[idx] && featuredRaw[idx].note) ? featuredRaw[idx].note : '';
        el.innerHTML = `<div class="feature-info"><h2>${g.name}</h2><p>${note || g.description || ''}</p><div class="feature-actions"><span class="price">₹${g.price}</span><a href="https://ig.me/m/nexplayy.store?text=I%20want%20to%20buy%20${encodeURIComponent(g.name)}" class="btn btn-primary">DM To Buy</a></div></div>`;
        el.addEventListener('click', () => showGameDetail(g));
        container.appendChild(el);
    });

    // autoplay support
    const settings = JSON.parse(localStorage.getItem('nexplayy_settings')) || { autoplay: true, autoplayInterval: 5000, animations: true, showBundles: true };
    clearInterval(window.__featuredAutoplay);
    if (settings.autoplay && use.length > 1) {
        let idx = 0;
        window.__featuredAutoplay = setInterval(() => {
            idx = (idx + 1) % use.length;
            const children = Array.from(container.children);
            children.forEach((c,i)=> c.style.display = i===idx ? 'block' : 'none');
        }, settings.autoplayInterval || 5000);
        // initialize visibility
        Array.from(container.children).forEach((c,i)=> c.style.display = i===0 ? 'block' : 'none');
    }
}

// Game Detail Modal
function showGameDetail(game) {
    const overlay = document.createElement('div');
    overlay.className = 'detail-overlay';
    overlay.innerHTML = `
        <div class="detail-card glass">
            <div class="detail-left">${mediaHtmlFor(game.image,'detail-img')}</div>
            <div class="detail-right">
                <h2>${game.name}</h2>
                <div class="detail-meta"><span class="game-platform">${game.platform}</span><span class="game-price">₹${game.price}</span>${game.oldPrice?`<span class="game-old-price">₹${game.oldPrice}</span>`:''}</div>
                <p class="game-desc" style="-webkit-line-clamp:6;">${game.description||'Full access digital license. Verified original game. Order via DM.'}</p>
                <div style="display:flex;gap:12px;margin-top:18px;"><a class="btn btn-primary" href="https://ig.me/m/nexplayy.store?text=I%20want%20to%20buy%20${encodeURIComponent(game.name)}" target="_blank">DM To Buy</a><button class="btn btn-outline" id="closeDetailBtn">Close</button></div>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#closeDetailBtn').addEventListener('click', () => document.body.removeChild(overlay));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) document.body.removeChild(overlay); });
}

// Events
gameSearch.addEventListener('input', (e) => {
    const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
    renderGames(activeFilter, e.target.value);
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Render dynamic range filter buttons (based on admin-controlled ranges)
function renderRangeFilters() {
    if (!filterTabsContainer) return;
    filterTabsContainer.innerHTML = '';
    const allBtn = document.createElement('button');
    allBtn.className = 'filter-btn active';
    allBtn.dataset.filter = 'all';
    allBtn.innerText = 'All';
    filterTabsContainer.appendChild(allBtn);

    rangesData.forEach(r => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = r;
        btn.innerText = `₹${r} Range`;
        filterTabsContainer.appendChild(btn);
    });

    // attach events
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderGames(btn.dataset.filter, gameSearch.value);
        });
    });
}

// Bundles UI on homepage
function renderBundlesSection() {
    if (!bundlesContainer) return;
    bundlesContainer.innerHTML = '';
    if (!bundlesData || bundlesData.length === 0) return;
    const title = document.createElement('h3');
    title.className = 'section-title';
    title.innerText = 'Bundles';
    bundlesContainer.appendChild(title);

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '12px';
    row.style.flexWrap = 'wrap';

    bundlesData.forEach((b, idx) => {
        const btn = document.createElement('button');
        btn.className = 'btn btn-outline';
        btn.innerText = b.name;
        btn.title = b.description || '';
        btn.addEventListener('click', () => showBundleDetail(idx));
        row.appendChild(btn);
    });

    bundlesContainer.appendChild(row);
}

function showBundleDetail(index) {
    const bundle = bundlesData[index];
    if (!bundle) return;
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.left = 0;
    overlay.style.top = 0;
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.zIndex = 5000;
    overlay.style.overflow = 'auto';
    overlay.innerHTML = `
        <div style="max-width:1100px;margin:40px auto;padding:20px;">
            <div style="display:flex;justify-content:space-between;align-items:center;color:#fff;margin-bottom:12px;">
                <h2>${bundle.name}</h2>
                <div><button class="btn btn-outline" id="closeBundleBtn">Close</button></div>
            </div>
            <p style="color:var(--text-dim);">${bundle.description || ''}</p>
            <div id="bundleGamesList" class="games-grid" style="margin-top:16px;"></div>
        </div>
    `;
    document.body.appendChild(overlay);
    document.getElementById('closeBundleBtn').addEventListener('click', () => document.body.removeChild(overlay));

    const list = overlay.querySelector('#bundleGamesList');
    const bundleGames = gamesData.filter(g => bundle.gameIds && bundle.gameIds.includes(g.name));
    if (bundleGames.length === 0) {
        list.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 50px; color: var(--text-dim);">No games in this bundle.</div>';
        return;
    }
    bundleGames.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card glass';
        const oldPriceHtml = game.oldPrice ? `<span class="game-old-price">₹${game.oldPrice}</span>` : '';
        const descHtml = game.description ? `<p class="game-desc">${game.description}</p>` : '';
        const mediaHtml = mediaHtmlFor(game.image, 'game-img');
        card.innerHTML = `
            <div class="game-img-container">
                ${mediaHtml}
            </div>
            <div class="game-info">
                <span class="game-platform">${game.platform}</span>
                <h3 class="game-name" title="${game.name}">${game.name}</h3>
                <div class="game-price-tag"><span class="game-price">₹${game.price}</span>${oldPriceHtml}</div>
                ${descHtml}
            </div>
        `;
        list.appendChild(card);
    });
}

// Listen for admin changes (localStorage sync across tabs)
window.addEventListener('storage', (e) => {
    if (e.key === 'nexplayy_games') {
        try { const d = JSON.parse(e.newValue); if (Array.isArray(d)) { gamesData.length = 0; d.forEach(g => gamesData.push(g)); } } catch (err) {}
        renderGames(document.querySelector('.filter-btn.active')?.dataset.filter || 'all', gameSearch.value);
    }
    if (e.key === 'nexplayy_hero') {
        try { const h = JSON.parse(e.newValue); if (h) { heroData.title = h.title; heroData.sub = h.sub; updateHeroDOM(); } } catch (err) {}
    }
    if (e.key === 'nexplayy_ranges') {
        try { const r = JSON.parse(e.newValue); if (Array.isArray(r)) { rangesData.length = 0; r.forEach(x => rangesData.push(x)); renderRangeFilters(); } } catch (err) {}
    }
    if (e.key === 'nexplayy_bundles') {
        try { const b = JSON.parse(e.newValue); if (Array.isArray(b)) { bundlesData.length = 0; b.forEach(x => bundlesData.push(x)); renderBundlesSection(); } } catch (err) {}
    }
    if (e.key === 'nexplayy_featured') {
        renderFeaturedCarousel();
    }
    if (e.key === 'nexplayy_settings') {
        try { const s = JSON.parse(e.newValue); if (s) { if (!s.animations) document.body.classList.add('no-animations'); else document.body.classList.remove('no-animations'); renderFeaturedCarousel(); renderBundlesSection(); } } catch (err) {}
    }
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
    renderRangeFilters();
    renderGames();
    renderBundlesSection();
    renderFeaturedCarousel();
    revealOnScroll();
});
