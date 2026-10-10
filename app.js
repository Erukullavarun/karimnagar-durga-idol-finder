// Main Frontend Application Logic for Karimnagar Durga Idol Finder

let currentSiteConfig = getSiteConfig();
let currentMandapams = getMandapams();
let currentAreas = getAreasList();

let activeCategoryFilter = "all";
let activeAreaFilter = "all";
let activeGalleryFilter = "all";
let searchQuery = "";
let userLocation = null;
let leafletMap = null;
let mapMarkers = [];
let autoScrollInterval = null;
let isAutoScrollPaused = false;

// Gallery and Lightbox State
let allGalleryPhotos = [];
let activeLightboxIndex = 0;

// Initialize on DOM load
document.addEventListener("DOMContentLoaded", () => {
  initApp();
  setupEventListeners();
  initAutoScroll();
  initLightboxKeyboard();
});

function initApp() {
  currentSiteConfig = getSiteConfig();
  currentMandapams = getMandapams();
  currentAreas = getAreasList();

  renderHeaderAndHero();
  renderStatsBar();
  renderMustVisitRail();
  renderMomentsGallery();
  renderAreaPills();
  renderMandapamsDirectory();
  renderCtaAndFooter();
  initLeafletMap();
  checkUrlForDirectIdol();
  initDeveloperPopup();
}

// Floating screen: Follow developer popup
function initDeveloperPopup() {
  setTimeout(() => {
    const modal = document.getElementById("developer-popup-modal");
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
  }, 450);
}

function closeDeveloperPopup() {
  const modal = document.getElementById("developer-popup-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

// 1. Render Header & Hero
function renderHeaderAndHero() {
  const cfg = currentSiteConfig;
  
  // Header
  document.querySelectorAll(".site-logo-text").forEach(el => el.textContent = cfg.header.siteName || "Karimnagar Durga Idol Finder");
  
  // Hero texts
  const chantEl = document.getElementById("hero-chant");
  if (chantEl) chantEl.innerHTML = `<span>🔱</span> ${cfg.hero.chantTelugu}`;

  const titleEl = document.getElementById("hero-title");
  if (titleEl) {
    titleEl.innerHTML = `${cfg.hero.mainTitle} <span class="block text-saffron-600">${cfg.hero.titleHighlight}</span>`;
  }

  const subtitleEl = document.getElementById("hero-subtitle");
  if (subtitleEl) subtitleEl.innerHTML = cfg.hero.subtitle.replace(/•/g, '<span class="text-saffron-500">•</span>');

  const descEl = document.getElementById("hero-desc");
  if (descEl) descEl.textContent = cfg.hero.description;

  const bannerBadgeEl = document.getElementById("hero-banner-badge");
  if (bannerBadgeEl) bannerBadgeEl.textContent = cfg.hero.bannerBadgeText;

  const floatTitleEl = document.getElementById("hero-float-title");
  if (floatTitleEl) floatTitleEl.textContent = cfg.hero.floatingCardTitle;

  const floatSubEl = document.getElementById("hero-float-sub");
  if (floatSubEl) floatSubEl.textContent = cfg.hero.floatingCardSubtitle;

  const heroImgEl = document.getElementById("hero-image-tag");
  if (heroImgEl && cfg.hero.heroImage) heroImgEl.src = cfg.hero.heroImage;
}

// 2. Render Stats Bar
function renderStatsBar() {
  const st = currentSiteConfig.stats;
  const verifiedCount = currentMandapams.length;
  const uniqueCount = currentMandapams.filter(m => m.categories && m.categories.includes("unique")).length;
  let photoCount = 0;
  currentMandapams.forEach(m => {
    if (m.photos) photoCount += m.photos.length;
  });

  const locCountEl = document.getElementById("stat-locations-count");
  if (locCountEl) locCountEl.textContent = verifiedCount || st.locationsCount;

  const themeCountEl = document.getElementById("stat-themes-count");
  if (themeCountEl) themeCountEl.textContent = uniqueCount || st.themesCount;

  const photoCountEl = document.getElementById("stat-photos-count");
  if (photoCountEl) photoCountEl.textContent = photoCount || st.photosCount;

  const homeLabelEl = document.getElementById("stat-home-label");
  if (homeLabelEl) homeLabelEl.textContent = st.locationLabel;

  const quoteTextEl = document.getElementById("stat-quote-text");
  if (quoteTextEl) quoteTextEl.innerHTML = st.quoteTelugu.replace(/“|”/g, '');
}

// 3. Render Must Visit Rail (Carousel)
function renderMustVisitRail() {
  const container = document.getElementById("must-visit-rail");
  if (!container) return;

  const mustVisitList = currentMandapams
    .filter(m => m.isMustVisit || m.priority <= 3)
    .sort((a, b) => (a.priority || 99) - (b.priority || 99));

  const countBadge = document.getElementById("must-visit-count");
  if (countBadge) countBadge.textContent = `${mustVisitList.length} Priority Pandals`;

  container.innerHTML = mustVisitList.map((item, idx) => {
    const photo = (item.photos && item.photos.length > 0) ? item.photos[0].url : "assets/images/hero-durga.jpg";
    const rank = item.priority || idx + 1;
    const reelsBadge = item.reelsCount > 0 
      ? `<span class="chip bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 text-white shadow-soft font-bold text-[10px]">
          🎬 ${item.reelsCount} Reel${item.reelsCount > 1 ? 's' : ''}
        </span>` : '';
    const igBadge = item.instagramHandle 
      ? `<span class="inline-flex items-center gap-1 rounded-md bg-cream-100 px-2 py-0.5 text-[10px] font-semibold text-ink-700 border border-cream-200">
          <span class="text-rose-600 font-bold">IG</span><span>${item.instagramHandle}</span>
        </span>` : '';

    return `
      <div class="group flex flex-col overflow-hidden rounded-2xl border border-cream-300/80 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift w-[78vw] sm:w-[280px] md:w-[310px] shrink-0 snap-start cursor-pointer" onclick="openMandapamModal('${item.id}')">
        <div class="relative aspect-[4/3.1] overflow-hidden bg-cream-100">
          <img src="${photo}" alt="${item.name}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='assets/images/hero-durga.jpg'" />
          <div class="absolute left-2.5 top-2.5 flex items-center gap-1.5">
            <span class="grid h-7 min-w-7 place-items-center rounded-full bg-crimson-700 px-1.5 text-[11px] font-bold tabular-nums text-white shadow-soft ring-2 ring-white/80">#${rank}</span>
            <span class="chip bg-amber-500 text-ink-900 font-extrabold">Priority</span>
          </div>
          <div class="absolute right-2.5 top-2.5">
            ${reelsBadge}
          </div>
        </div>
        <div class="flex flex-1 flex-col p-4">
          <h3 class="font-display text-[16px] font-bold leading-snug text-ink-900 group-hover:text-saffron-700 transition-colors">${item.name}</h3>
          <p class="mt-1 flex items-center gap-1 text-xs text-ink-600">
            <svg class="h-3.5 w-3.5 shrink-0 text-saffron-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            ${item.area}
          </p>
          <div class="mt-2 flex items-center gap-1.5 flex-wrap">
            ${igBadge}
          </div>
          <div class="mt-auto flex items-center justify-between pt-3 border-t border-cream-200 mt-3">
            <span class="text-[11px] font-medium text-ink-500 truncate max-w-[75%]">${item.address || item.area}</span>
            <span class="grid h-7 w-7 place-items-center rounded-full bg-cream-200 text-ink-700 transition-colors group-hover:bg-saffron-500 group-hover:text-white">
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M9 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// 4. Render Unique Rail
function renderUniqueRail() {
  const container = document.getElementById("unique-rail");
  if (!container) return;

  const uniqueList = currentMandapams.filter(m => m.categories && (m.categories.includes("unique") || m.categories.includes("special")));

  container.innerHTML = uniqueList.map(item => {
    const photo = (item.photos && item.photos.length > 0) ? item.photos[0].url : "assets/images/hero-durga.jpg";
    return `
      <div class="group relative aspect-[4/3] w-[60vw] sm:w-[220px] md:w-[260px] shrink-0 snap-start overflow-hidden rounded-2xl border border-cream-300 shadow-soft cursor-pointer" onclick="openMandapamModal('${item.id}')">
        <img src="${photo}" alt="${item.name}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/30 to-transparent p-3.5 flex flex-col justify-end">
          <span class="chip bg-saffron-500 text-white w-fit text-[10px] mb-1 font-bold">Special Alankaram</span>
          <h4 class="font-display text-sm font-bold text-white leading-tight">${item.name}</h4>
          <span class="text-[11px] text-cream-200">📍 ${item.area}</span>
        </div>
      </div>
    `;
  }).join("");
}

// 5. Render Navratri Photo Gallery & Download Center
function buildGalleryPhotosArray() {
  allGalleryPhotos = [];
  currentMandapams.forEach(m => {
    if (m.photos && Array.isArray(m.photos)) {
      m.photos.forEach((p, pIdx) => {
        const photoKey = `${m.id}_photo_${pIdx}`;
        allGalleryPhotos.push({
          key: photoKey,
          url: p.url || "assets/images/hero-durga.jpg",
          caption: p.caption || `${m.name} Sacred Darshan`,
          mandapamId: m.id,
          mandapamName: m.name,
          area: m.area,
          defaultLikes: (pIdx * 7) + 18
        });
      });
    }
  });
}

function renderMomentsGallery() {
  buildGalleryPhotosArray();

  const countBadge = document.getElementById("gallery-photo-count");
  if (countBadge) countBadge.textContent = `${allGalleryPhotos.length} Sacred Photos`;

  // Render Horizontal Feature Rail
  const railContainer = document.getElementById("moments-rail");
  if (railContainer) {
    railContainer.innerHTML = allGalleryPhotos.slice(0, 10).map((photo, idx) => {
      const isLiked = isPhotoLiked(photo.key);
      const likesCount = getPhotoLikeCount(photo.key, photo.defaultLikes);
      
      return `
        <div class="group relative aspect-[4/3] w-[54vw] sm:w-[210px] md:w-[240px] shrink-0 snap-start overflow-hidden rounded-2xl border border-cream-300 shadow-soft bg-white">
          <img src="${photo.url}" alt="${photo.caption}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 cursor-pointer" onclick="openPhotoLightboxByIndex(${idx})" />
          
          <!-- Top Area Badge -->
          <div class="absolute top-2.5 left-2.5 pointer-events-none">
            <span class="px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-sm text-white font-bold text-[10px]">
              📍 ${photo.area}
            </span>
          </div>

          <!-- Bottom Action Strip -->
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-2.5 flex items-center justify-between text-white">
            <button onclick="handleCardLike('${photo.key}', ${photo.defaultLikes}, event)" class="flex items-center gap-1 text-[11px] font-bold px-2 py-1 rounded-full bg-black/40 hover:bg-rose-600/80 transition">
              <span id="rail-like-icon-${photo.key}">${isLiked ? '❤️' : '🤍'}</span>
              <span id="rail-like-count-${photo.key}">${likesCount}</span>
            </button>

            <button onclick="triggerPhotoDownload('${photo.url}', '${sanitizeFileName(photo.mandapamName + '_' + photo.area)}'); event.stopPropagation();" title="Download Photo" class="h-7 w-7 rounded-full bg-saffron-500 hover:bg-saffron-600 text-white grid place-items-center text-xs shadow-soft transition">
              ⬇️
            </button>
          </div>
        </div>
      `;
    }).join("");
  }

  // Render Expanded Photo Grid
  renderGalleryGrid();
}

function filterGalleryPhotos(filterType) {
  activeGalleryFilter = filterType;

  // Update button active styles
  document.querySelectorAll(".gallery-filter-btn").forEach(btn => {
    btn.classList.remove("bg-saffron-500", "text-white");
    btn.classList.add("bg-white", "text-ink-700");
  });

  const activeBtn = document.getElementById(`gallery-filter-${filterType}`);
  if (activeBtn) {
    activeBtn.classList.add("bg-saffron-500", "text-white");
    activeBtn.classList.remove("bg-white", "text-ink-700");
  }

  renderGalleryGrid();
}

function renderGalleryGrid() {
  const gridContainer = document.getElementById("moments-grid");
  if (!gridContainer) return;

  let displayPhotos = [...allGalleryPhotos];

  if (activeGalleryFilter === "liked") {
    displayPhotos = displayPhotos
      .map(p => ({ ...p, currentLikes: getPhotoLikeCount(p.key, p.defaultLikes), isLiked: isPhotoLiked(p.key) }))
      .sort((a, b) => b.currentLikes - a.currentLikes);
  }

  gridContainer.innerHTML = displayPhotos.map((photo, idx) => {
    const isLiked = isPhotoLiked(photo.key);
    const likesCount = getPhotoLikeCount(photo.key, photo.defaultLikes);
    const originalIndex = allGalleryPhotos.findIndex(p => p.key === photo.key);

    return `
      <div class="group flex flex-col bg-white rounded-2xl overflow-hidden border border-cream-300 shadow-soft hover:shadow-card transition duration-300">
        <!-- Photo Thumbnail -->
        <div class="relative aspect-square w-full bg-cream-100 overflow-hidden cursor-pointer" onclick="openPhotoLightboxByIndex(${originalIndex >= 0 ? originalIndex : idx})">
          <img src="${photo.url}" alt="${photo.caption}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='assets/images/hero-durga.jpg'" />
          
          <div class="absolute top-2 left-2 pointer-events-none">
            <span class="px-2 py-0.5 rounded-full bg-ink-900/80 backdrop-blur text-white text-[10px] font-bold">
              ${photo.area}
            </span>
          </div>

          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <span class="px-3 py-1.5 rounded-full bg-white text-ink-900 font-bold text-xs shadow-lg">
              🔍 View HD
            </span>
          </div>
        </div>

        <!-- Info & Action Bar -->
        <div class="p-2.5 flex flex-col gap-1.5">
          <h4 class="font-display text-xs font-bold text-ink-900 truncate leading-tight">${photo.mandapamName}</h4>
          
          <div class="flex items-center justify-between pt-1.5 border-t border-cream-200 text-xs">
            <!-- Like Action -->
            <button onclick="handleCardLike('${photo.key}', ${photo.defaultLikes}, event)" class="flex items-center gap-1 text-ink-700 font-semibold hover:text-rose-600 transition px-1.5 py-0.5 rounded-md hover:bg-rose-50">
              <span id="grid-like-icon-${photo.key}">${isLiked ? '❤️' : '🤍'}</span>
              <span id="grid-like-count-${photo.key}" class="text-[11px]">${likesCount}</span>
            </button>

            <!-- Download Action -->
            <button onclick="triggerPhotoDownload('${photo.url}', '${sanitizeFileName(photo.mandapamName + '_' + photo.area)}'); event.stopPropagation();" class="flex items-center gap-1 text-[11px] font-bold text-saffron-700 bg-saffron-50 hover:bg-saffron-100 border border-saffron-200 px-2.5 py-1 rounded-full transition shadow-soft">
              <span>⬇️</span> Download
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function sanitizeFileName(name) {
  return (name || "Karimnagar_Durga").replace(/[^a-zA-Z0-9_-]/g, "_") + ".jpg";
}

function handleCardLike(photoKey, defaultLikes, event) {
  if (event) event.stopPropagation();
  const updated = togglePhotoLike(photoKey, defaultLikes);

  // Update Rail items if present
  const railIcon = document.getElementById(`rail-like-icon-${photoKey}`);
  const railCount = document.getElementById(`rail-like-count-${photoKey}`);
  if (railIcon) railIcon.textContent = updated.liked ? '❤️' : '🤍';
  if (railCount) railCount.textContent = updated.count;

  // Update Grid items if present
  const gridIcon = document.getElementById(`grid-like-icon-${photoKey}`);
  const gridCount = document.getElementById(`grid-like-count-${photoKey}`);
  if (gridIcon) gridIcon.textContent = updated.liked ? '❤️' : '🤍';
  if (gridCount) gridCount.textContent = updated.count;

  // If lightbox is open on this photo, update it too
  const currentPhoto = allGalleryPhotos[activeLightboxIndex];
  if (currentPhoto && currentPhoto.key === photoKey) {
    updateLightboxLikeUI(updated.liked, updated.count);
  }
}

// 6. Lightbox Controls
function openPhotoLightboxByIndex(index) {
  if (!allGalleryPhotos || allGalleryPhotos.length === 0) buildGalleryPhotosArray();
  if (index < 0 || index >= allGalleryPhotos.length) index = 0;

  activeLightboxIndex = index;
  const photo = allGalleryPhotos[activeLightboxIndex];
  if (!photo) return;

  const modal = document.getElementById("photo-lightbox-modal");
  const imgEl = document.getElementById("lightbox-img");
  const titleEl = document.getElementById("lightbox-title");
  const areaEl = document.getElementById("lightbox-area");
  const captionEl = document.getElementById("lightbox-caption");

  if (imgEl) imgEl.src = photo.url;
  if (titleEl) titleEl.textContent = photo.mandapamName;
  if (areaEl) areaEl.textContent = `📍 ${photo.area} • Karimnagar`;
  if (captionEl) captionEl.textContent = photo.caption;

  const isLiked = isPhotoLiked(photo.key);
  const likesCount = getPhotoLikeCount(photo.key, photo.defaultLikes);
  updateLightboxLikeUI(isLiked, likesCount);

  if (modal) {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  }
}

function updateLightboxLikeUI(isLiked, count) {
  const icon = document.getElementById("lightbox-like-icon");
  const countEl = document.getElementById("lightbox-like-count");
  if (icon) icon.textContent = isLiked ? '❤️' : '🤍';
  if (countEl) countEl.textContent = `${count} Likes`;
}

function closePhotoLightbox() {
  const modal = document.getElementById("photo-lightbox-modal");
  if (modal) {
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  }
}

function navigateLightbox(direction) {
  if (allGalleryPhotos.length === 0) return;
  activeLightboxIndex = (activeLightboxIndex + direction + allGalleryPhotos.length) % allGalleryPhotos.length;
  openPhotoLightboxByIndex(activeLightboxIndex);
}

function handleLightboxLike() {
  const photo = allGalleryPhotos[activeLightboxIndex];
  if (!photo) return;
  handleCardLike(photo.key, photo.defaultLikes, null);
}

function handleLightboxDownload() {
  const photo = allGalleryPhotos[activeLightboxIndex];
  if (!photo) return;
  triggerPhotoDownload(photo.url, sanitizeFileName(photo.mandapamName + '_' + photo.area));
}

function handleLightboxShare() {
  const photo = allGalleryPhotos[activeLightboxIndex];
  if (!photo) return;
  const websiteIdolUrl = getIdolWebsiteUrl(photo.mandapamId);
  const shareText = encodeURIComponent(`🔱 Sacred Darshan: ${photo.mandapamName} (${photo.area})\n\nView this Durga Idol on Karimnagar Durga Idol Finder:\n👉 ${websiteIdolUrl}`);
  window.open(`https://api.whatsapp.com/send?text=${shareText}`, "_blank");
}

function initLightboxKeyboard() {
  document.addEventListener("keydown", (e) => {
    const modal = document.getElementById("photo-lightbox-modal");
    if (!modal || modal.classList.contains("hidden")) return;
    if (e.key === "Escape") closePhotoLightbox();
    if (e.key === "ArrowLeft") navigateLightbox(-1);
    if (e.key === "ArrowRight") navigateLightbox(1);
  });
}

// 7. Render Area Pills
function renderAreaPills() {
  const container = document.getElementById("area-pills-container");
  if (!container) return;

  const areaCounts = {};
  currentMandapams.forEach(m => {
    const a = m.area || "Other";
    areaCounts[a] = (areaCounts[a] || 0) + 1;
  });

  container.innerHTML = `
    <button type="button" class="area-pill flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-medium text-ink-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-saffron-400 hover:text-saffron-700 ${activeAreaFilter === 'all' ? 'bg-saffron-50 border-saffron-500 text-saffron-700 font-bold' : ''}" onclick="filterByArea('all')">
      All Areas <span class="rounded-full bg-saffron-100 px-2 py-0.5 text-xs font-bold text-saffron-700">${currentMandapams.length}</span>
    </button>
  ` + currentAreas.map(area => {
    const count = areaCounts[area] || 0;
    const isActive = activeAreaFilter === area;
    return `
      <button type="button" class="area-pill flex items-center gap-2 rounded-full border border-cream-300 bg-white px-4 py-2 text-sm font-medium text-ink-700 shadow-soft transition-all hover:-translate-y-0.5 hover:border-saffron-400 hover:text-saffron-700 ${isActive ? 'bg-saffron-50 border-saffron-500 text-saffron-700 font-bold' : ''}" onclick="filterByArea('${area}')">
        ${area} <span class="rounded-full bg-saffron-50 px-2 py-0.5 text-xs font-bold text-saffron-700">${count}</span>
      </button>
    `;
  }).join("");
}

// 8. Render All Durga Pandals Directory
function renderMandapamsDirectory() {
  const container = document.getElementById("mandapams-grid");
  const countEl = document.getElementById("directory-count");
  if (!container) return;

  let filtered = currentMandapams.filter(item => {
    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = item.name && item.name.toLowerCase().includes(q);
      const matchTelugu = item.teluguName && item.teluguName.toLowerCase().includes(q);
      const matchArea = item.area && item.area.toLowerCase().includes(q);
      const matchAddr = item.address && item.address.toLowerCase().includes(q);
      const matchDesc = item.description && item.description.toLowerCase().includes(q);
      if (!matchName && !matchTelugu && !matchArea && !matchAddr && !matchDesc) return false;
    }

    // Category filter match
    if (activeCategoryFilter !== "all") {
      if (!item.categories || !item.categories.includes(activeCategoryFilter)) return false;
    }

    // Area filter match
    if (activeAreaFilter !== "all") {
      if (item.area !== activeAreaFilter) return false;
    }

    return true;
  });

  // Calculate distances if user location is known
  if (userLocation) {
    filtered.forEach(item => {
      if (item.latitude && item.longitude) {
        item.distanceKm = calculateDistance(userLocation.lat, userLocation.lng, item.latitude, item.longitude);
      } else {
        item.distanceKm = 9999;
      }
    });
    filtered.sort((a, b) => (a.distanceKm || 9999) - (b.distanceKm || 9999));
  } else {
    // Sort by priority rank
    filtered.sort((a, b) => (a.priority || 99) - (b.priority || 99));
  }

  if (countEl) {
    countEl.textContent = `${filtered.length} Pandals`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-12 text-center bg-white rounded-3xl border border-cream-300 p-8 shadow-soft">
        <span class="text-4xl block mb-2">🔍</span>
        <h3 class="font-display font-bold text-lg text-ink-900">No Durga Pandals found</h3>
        <p class="text-xs text-ink-500 mt-1 max-w-sm mx-auto">Try clearing your search query or choosing another colony from the area pills above.</p>
        <button onclick="clearAllFilters()" class="btn-primary text-xs mt-4 !py-2 !px-4">Clear All Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const photo = (item.photos && item.photos.length > 0) ? item.photos[0].url : "assets/images/hero-durga.jpg";
    const distanceBadge = (typeof item.distanceKm === 'number' && item.distanceKm < 999)
      ? `<span class="chip bg-emerald-600 text-white font-bold text-[10px]">📍 ${item.distanceKm.toFixed(1)} km away</span>`
      : '';

    return `
      <div class="group flex flex-col overflow-hidden rounded-2xl border border-cream-300/90 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift cursor-pointer" onclick="openMandapamModal('${item.id}')">
        <div class="relative aspect-[4/3] overflow-hidden bg-cream-100">
          <img src="${photo}" alt="${item.name}" loading="lazy" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.src='assets/images/hero-durga.jpg'" />
          <div class="absolute left-2.5 top-2.5 flex items-center gap-1.5">
            ${item.isMustVisit ? '<span class="chip bg-amber-500 text-ink-900 font-extrabold text-[10px]">★ Must Visit</span>' : ''}
            ${distanceBadge}
          </div>
        </div>
        <div class="flex flex-1 flex-col p-4">
          <h3 class="font-display text-[15px] font-bold leading-snug text-ink-900 group-hover:text-saffron-700 transition-colors">${item.name}</h3>
          ${item.teluguName ? `<p class="font-telugu text-xs text-saffron-700 mt-0.5 font-medium">${item.teluguName}</p>` : ''}
          <p class="mt-2 flex items-center gap-1.5 text-xs text-ink-600">
            <svg class="h-3.5 w-3.5 shrink-0 text-saffron-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
            ${item.area}
          </p>
          <p class="mt-2 text-xs text-ink-500 line-clamp-2 leading-relaxed">${item.description || item.address || 'Join the sacred darshan at this verified mandapam.'}</p>
          <div class="mt-auto flex items-center justify-between pt-3 border-t border-cream-200 mt-3">
            <span class="text-xs font-medium text-ink-500 truncate max-w-[70%]">${item.address || item.area}</span>
            <span class="grid h-7 w-7 place-items-center rounded-full bg-cream-200 text-ink-700 transition-colors group-hover:bg-saffron-500 group-hover:text-white">
              <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.4" d="M9 5l7 7-7 7"/></svg>
            </span>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// 9. Render CTA & Footer
function renderCtaAndFooter() {
  const cfg = currentSiteConfig;
  const ctaTitleEl = document.getElementById("cta-title");
  if (ctaTitleEl) ctaTitleEl.textContent = cfg.ctaSection.title;

  const ctaDescEl = document.getElementById("cta-desc");
  if (ctaDescEl) ctaDescEl.textContent = cfg.ctaSection.description;

  const ctaQuoteEl = document.getElementById("cta-quote");
  if (ctaQuoteEl) ctaQuoteEl.textContent = cfg.ctaSection.quoteText;

  const footerDevsEl = document.getElementById("footer-developers");
  if (footerDevsEl) {
    const devName = cfg.footer?.developerNames || "@chintuvarun_3008";
    footerDevsEl.textContent = devName.startsWith("@") ? devName : `@${devName}`;
    if (footerDevsEl.tagName === "A") {
      const handle = devName.replace("@", "");
      footerDevsEl.href = `https://instagram.com/${handle}`;
    }
  }

  const footerCopyEl = document.getElementById("footer-copyright");
  if (footerCopyEl) {
    footerCopyEl.textContent = cfg.footer?.copyrightText || "© 2026 Karimnagar Durga Idol Finder. All rights reserved.";
  }
}

// 10. Interactive Map Initialization
function initLeafletMap() {
  const mapContainer = document.getElementById("leaflet-map-container");
  if (!mapContainer) return;

  if (typeof L === "undefined") {
    console.error("Leaflet failed to load. Check the Leaflet CDN connection.");
    return;
  }

  if (typeof L.maplibreGL !== "function") {
    console.error("MapLibre-GL-Leaflet failed to load. Check the MapLibre CDN connection.");
    return;
  }

  if (leafletMap) {
    leafletMap.remove();
  }

  const mapConfig = currentSiteConfig?.mapSection || {};
  const centerCoords = Array.isArray(mapConfig.defaultCenter) && mapConfig.defaultCenter.length === 2
    ? mapConfig.defaultCenter
    : [18.4386, 79.1288];
  const defaultZoom = Number.isFinite(Number(mapConfig.defaultZoom))
    ? Number(mapConfig.defaultZoom)
    : 14;
  leafletMap = L.map('leaflet-map-container', {
    zoomControl: true,
    attributionControl: true
  }).setView(centerCoords, defaultZoom);

  // OpenFreeMap vector basemap.
  // The old OpenStreetMap raster endpoint was returning HTTP 403 because
  // the public OSM tile servers are not intended for unrestricted app traffic.
  L.maplibreGL({
    style: 'https://tiles.openfreemap.org/styles/liberty',
    interactive: false,
    padding: 0
  }).addTo(leafletMap);

  leafletMap.attributionControl.addAttribution(
    'OpenFreeMap © OpenMapTiles Data from OpenStreetMap'
  );

  // Force a size recalculation after the map is attached to the responsive layout.
  setTimeout(() => {
    if (leafletMap) leafletMap.invalidateSize({ pan: false });
  }, 250);

  // Custom Royal Saffron-Crimson & Temple Gold Pin Icon for Durga
  const customDurgaIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background: linear-gradient(135deg, #b8232e, #770e17); width: 34px; height: 34px; border-radius: 50%; display: grid; place-items: center; color: white; box-shadow: 0 4px 14px rgba(126,12,28,0.55); border: 2.5px solid #d4af37; font-size: 15px;">🔱</div>`,
    iconSize: [34, 34],
    iconAnchor: [17, 17]
  });

  mapMarkers = [];
  currentMandapams.forEach(item => {
    if (item.latitude && item.longitude) {
      const photo = (item.photos && item.photos.length > 0) ? item.photos[0].url : "assets/images/hero-durga.jpg";
      const popupHtml = `
        <div style="font-family: 'Inter', sans-serif; width: 220px;">
          ${photo ? `<img src="${photo}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />` : ''}
          <h4 style="font-weight: 700; font-size: 14px; margin: 0 0 4px 0; color: #140b0d;">${item.name}</h4>
          <p style="font-size: 11px; color: #961621; margin: 0 0 6px 0; font-weight: 600;">📍 ${item.area}</p>
          <p style="font-size: 11px; color: #655257; margin: 0 0 8px 0; line-height: 1.3;">${item.address || ''}</p>
          <div style="display: flex; gap: 6px;">
            <button onclick="openMandapamModal('${item.id}')" style="background: #b8232e; color: white; border: 1px solid #d4af37; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; cursor: pointer; flex: 1;">View Details</button>
            <a href="https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}" target="_blank" style="background: #ede5d8; color: #770e17; text-decoration: none; padding: 4px 8px; border-radius: 6px; font-size: 11px; font-weight: 600; display: inline-flex; align-items: center; justify-content: center;">GPS ↗</a>
          </div>
        </div>
      `;
      const marker = L.marker([item.latitude, item.longitude], { icon: customDurgaIcon })
        .addTo(leafletMap)
        .bindPopup(popupHtml);
      mapMarkers.push(marker);
    }
  });
}

// 11. Mandapam Detail Modal & Website Link Sharing
function getIdolWebsiteUrl(mandapamId) {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("idol", mandapamId);
    return url.toString();
  } catch (e) {
    const base = window.location.href.split('?')[0].split('#')[0];
    return base + "?idol=" + encodeURIComponent(mandapamId);
  }
}

function checkUrlForDirectIdol() {
  try {
    const params = new URLSearchParams(window.location.search);
    const idolId = params.get("idol") || params.get("pandal") || params.get("id");
    if (idolId) {
      const target = currentMandapams.find(m => m.id === idolId || m.slug === idolId);
      if (target) {
        setTimeout(() => {
          openMandapamModal(target.id, false);
          const dirSection = document.getElementById("directory-section");
          if (dirSection) dirSection.scrollIntoView({ behavior: "smooth" });
        }, 350);
      }
    }
  } catch (e) {
    console.warn("Direct idol URL check error:", e);
  }
}

function copyIdolWebsiteLink(id, event) {
  if (event) event.stopPropagation();
  const url = getIdolWebsiteUrl(id);
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(url).then(() => {
      showToast("🔗 Idol website link copied to clipboard!");
    }).catch(() => {
      prompt("Copy website link to view this Durga Idol:", url);
    });
  } else {
    prompt("Copy website link to view this Durga Idol:", url);
  }
}

function shareViaNativeApp(id, event) {
  if (event) event.stopPropagation();
  const mandapam = currentMandapams.find(m => m.id === id);
  if (!mandapam) return;
  const url = getIdolWebsiteUrl(id);
  const title = `${mandapam.name} - Karimnagar Durga Idol Finder`;
  const text = `🔱 Sacred Darshan: View ${mandapam.name} (${mandapam.area}) photos and details on Karimnagar Durga Idol Finder!`;

  if (navigator.share) {
    navigator.share({
      title: title,
      text: text,
      url: url
    }).catch(err => {
      console.log('Native share canceled or not supported:', err);
    });
  } else {
    copyIdolWebsiteLink(id, event);
  }
}

function showToast(message) {
  let toast = document.getElementById("app-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "app-toast";
    toast.className = "fixed bottom-6 left-1/2 -translate-x-1/2 z-[3000] px-5 py-3 rounded-full bg-ink-900/95 text-white text-xs font-bold shadow-2xl transition-all duration-300 transform translate-y-10 opacity-0 flex items-center gap-2 border border-saffron-400 backdrop-blur-md";
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="text-saffron-400 font-bold">🔱</span> <span>${message}</span>`;
  toast.classList.remove("translate-y-10", "opacity-0", "pointer-events-none");
  toast.classList.add("translate-y-0", "opacity-100");
  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-10", "opacity-0", "pointer-events-none");
  }, 3000);
}

function openMandapamModal(id, updateHistory = true) {
  const mandapam = currentMandapams.find(m => m.id === id);
  if (!mandapam) return;

  mandapam.views = (mandapam.views || 0) + 1;
  saveMandapams(currentMandapams);

  if (updateHistory && window.history && window.history.replaceState) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.set("idol", id);
      window.history.replaceState(null, '', url.toString());
    } catch(e) {}
  }

  const modalEl = document.getElementById("mandapam-detail-modal");
  const modalContentEl = document.getElementById("mandapam-modal-content");
  if (!modalEl || !modalContentEl) return;

  const photoList = (mandapam.photos && mandapam.photos.length > 0) 
    ? mandapam.photos 
    : [{ url: "assets/images/hero-durga.jpg", caption: mandapam.name }];

  const googleMapsUrl = (mandapam.latitude && mandapam.longitude)
    ? `https://www.google.com/maps/search/?api=1&query=${mandapam.latitude},${mandapam.longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mandapam.name + " " + mandapam.area + " Karimnagar")}`;

  // Direct Website link to view the idol on the website
  const websiteIdolUrl = getIdolWebsiteUrl(mandapam.id);

  const shareText = encodeURIComponent(`🔱 Sacred Darshan: Check out ${mandapam.name} (${mandapam.area}) on Karimnagar Durga Idol Finder!\n\nView idol photos, alankaram & details on website:\n👉 ${websiteIdolUrl}`);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  modalContentEl.innerHTML = `
    <div class="relative bg-white rounded-3xl overflow-hidden max-w-2xl w-full shadow-card border border-cream-300">
      <button onclick="closeMandapamModal()" class="absolute right-4 top-4 z-20 grid h-9 w-9 place-items-center rounded-full bg-ink-900/80 text-white shadow-lift backdrop-blur hover:bg-saffron-600 transition">
        ✕
      </button>

      <!-- Carousel / Main Image -->
      <div class="relative aspect-video w-full bg-cream-200 overflow-hidden">
        <img id="modal-active-img" src="${photoList[0].url}" alt="${mandapam.name}" class="h-full w-full object-cover" />
        
        <div class="absolute top-4 left-4 z-10 flex gap-2">
          <button onclick="triggerPhotoDownload(document.getElementById('modal-active-img').src, '${sanitizeFileName(mandapam.name)}')" class="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/90 text-white font-bold text-xs backdrop-blur transition flex items-center gap-1 shadow-lg">
            <span>⬇️</span> Download Photo
          </button>
        </div>

        <div class="absolute bottom-3 left-3 flex gap-1.5 z-10 overflow-x-auto max-w-[90%] pb-1">
          ${photoList.map((p, idx) => `
            <img src="${p.url}" onclick="document.getElementById('modal-active-img').src='${p.url}'" class="h-10 w-14 rounded-lg object-cover border-2 border-white cursor-pointer hover:scale-105 transition shadow-soft" />
          `).join('')}
        </div>
      </div>

      <!-- Details -->
      <div class="p-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="font-display text-2xl font-bold text-ink-900">${mandapam.name}</h2>
            ${mandapam.teluguName ? `<p class="font-telugu text-sm text-saffron-700 font-semibold mt-0.5">${mandapam.teluguName}</p>` : ''}
          </div>
          ${mandapam.priority <= 3 ? '<span class="chip bg-amber-400 text-ink-900 font-bold shrink-0 text-xs">Priority #'+mandapam.priority+'</span>' : ''}
        </div>

        <div class="mt-4 flex flex-wrap items-center gap-3 text-xs text-ink-600">
          <span class="flex items-center gap-1 bg-cream-100 px-3 py-1.5 rounded-xl font-semibold border border-cream-200">
            📍 ${mandapam.area}
          </span>
          ${mandapam.address ? `<span class="text-ink-500">${mandapam.address}</span>` : ''}
        </div>

        <p class="mt-4 text-sm leading-relaxed text-ink-700 bg-cream-50 p-4 rounded-2xl border border-cream-200">
          ${mandapam.description || 'Join thousands of devotees for divine darshan at this auspicious Karimnagar Durga mandapam.'}
        </p>

        <!-- Social & Reels Links -->
        ${mandapam.instagramHandle ? `
          <div class="mt-4 flex items-center justify-between p-3 rounded-2xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200 text-xs">
            <div class="flex items-center gap-2">
              <span class="text-base">📸</span>
              <span class="font-bold text-ink-800">Official Youth / Committee Instagram:</span>
              <span class="text-rose-700 font-bold">${mandapam.instagramHandle}</span>
            </div>
            ${mandapam.instagramUrl ? `<a href="${mandapam.instagramUrl}" target="_blank" class="font-bold text-rose-600 hover:underline">Visit Profile ↗</a>` : ''}
          </div>
        ` : ''}

        <!-- Action Buttons -->
        <div class="mt-6 flex flex-wrap gap-2.5 pt-4 border-t border-cream-200">
          <a href="${googleMapsUrl}" target="_blank" class="btn-primary flex-1 min-w-[140px] !py-3">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
            GPS Route
          </a>
          <a href="${whatsappUrl}" target="_blank" class="btn-outline flex-1 min-w-[150px] !py-3 !border-emerald-500 !text-emerald-700 hover:!bg-emerald-50 font-bold">
            <span>💬</span> Share Website Link
          </a>
          <button onclick="copyIdolWebsiteLink('${mandapam.id}', event)" title="Copy Website Link to view this idol" class="px-4 py-3 rounded-full border border-cream-300 bg-cream-100 hover:bg-saffron-50 text-ink-800 font-bold text-xs flex items-center gap-1.5 transition">
            <span>🔗</span> Copy Link
          </button>
        </div>
      </div>
    </div>
  `;

  modalEl.classList.remove("hidden");
  modalEl.classList.add("flex");
}

function closeMandapamModal() {
  const modalEl = document.getElementById("mandapam-detail-modal");
  if (modalEl) modalEl.classList.add("hidden");
  if (window.history && window.history.replaceState) {
    try {
      const url = new URL(window.location.href);
      url.searchParams.delete("idol");
      url.searchParams.delete("pandal");
      url.searchParams.delete("id");
      window.history.replaceState(null, '', url.pathname + (url.search ? url.search : ''));
    } catch(e) {}
  }
}

// 12. Community Submission Form (Add Durga with 3 Photo Upload Slots)
function openAddGaneshModal() {
  const modal = document.getElementById("add-ganesh-modal");
  if (modal) {
    modal.classList.remove("hidden");
    for (let i = 1; i <= 3; i++) {
      const hiddenInp = document.getElementById(`submit-photo-${i}`);
      const prev = document.getElementById(`submit-photo-preview-${i}`);
      if (hiddenInp) hiddenInp.value = "";
      if (prev) prev.classList.add("hidden");
    }
  }
}

function closeAddGaneshModal() {
  const modal = document.getElementById("add-ganesh-modal");
  if (modal) modal.classList.add("hidden");
}

function handleSubmitPhotoBrowse(event, slotIndex) {
  const file = event.target.files[0];
  if (!file) return;

  processImageFile(file, (dataUrl) => {
    const hiddenInp = document.getElementById(`submit-photo-${slotIndex}`);
    const prev = document.getElementById(`submit-photo-preview-${slotIndex}`);
    const hint = document.getElementById(`submit-photo-hint-${slotIndex}`);
    
    if (hiddenInp) hiddenInp.value = dataUrl;
    if (prev) {
      prev.src = dataUrl;
      prev.classList.remove("hidden");
    }
    if (hint) hint.textContent = file.name;
  });
}

function handleAddGaneshSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("submit-name").value.trim();
  const teluguName = document.getElementById("submit-telugu").value.trim();
  const area = document.getElementById("submit-area").value.trim();
  const address = document.getElementById("submit-address").value.trim();
  const desc = document.getElementById("submit-desc").value.trim();
  const instagramHandle = document.getElementById("submit-instagram").value.trim();
  const category = document.getElementById("submit-category").value || "traditional";

  const p1 = document.getElementById("submit-photo-1") ? document.getElementById("submit-photo-1").value.trim() : "";
  const p2 = document.getElementById("submit-photo-2") ? document.getElementById("submit-photo-2").value.trim() : "";
  const p3 = document.getElementById("submit-photo-3") ? document.getElementById("submit-photo-3").value.trim() : "";

  // Require at least 2 photos for approval
  if (!p1 || !p2) {
    alert("⚠️ Please upload at least 2 photos (Photo 1: Main Idol and Photo 2: Pandal View) to submit this Durga Idol for approval.");
    return;
  }

  const photos = [];
  photos.push({ url: p1, caption: `${name} Main Idol`, isPublished: true });
  photos.push({ url: p2, caption: `${name} Pandal View`, isPublished: true });
  if (p3) {
    photos.push({ url: p3, caption: `${name} Aarti & Alankaram`, isPublished: true });
  }

  const newMandapam = {
    id: "kd-" + Date.now(),
    slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name: name,
    teluguName: teluguName,
    area: area,
    address: address,
    latitude: 18.4386 + (Math.random() - 0.5) * 0.02,
    longitude: 79.1288 + (Math.random() - 0.5) * 0.02,
    description: desc,
    priority: 5,
    isVerified: true, // Auto-verified with 2 photos, with admin review option
    isMustVisit: false,
    categories: [category, "unique"],
    photos: photos,
    videoUrl: "",
    instagramUrl: instagramHandle ? `https://instagram.com/${instagramHandle.replace('@','')}` : "",
    instagramHandle: instagramHandle,
    reelsCount: 0,
    reels: [],
    views: 1
  };

  currentMandapams.unshift(newMandapam);
  saveMandapams(currentMandapams);

  alert("🔱 Thank you! Your Durga Mandapam with " + photos.length + " photos has been submitted and approved. It is now live on the map and directory!");
  closeAddGaneshModal();
  initApp();
}

// 13. Distance calculation & Geolocation
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function handleUseMyLocation() {
  const btn = document.getElementById("btn-use-location");
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser.");
    return;
  }

  if (btn) btn.innerHTML = `<span>⏳</span> Locating...`;

  navigator.geolocation.getCurrentPosition(
    (position) => {
      userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      if (btn) btn.innerHTML = `<span>📍</span> Location Active`;
      
      if (leafletMap) {
        leafletMap.setView([userLocation.lat, userLocation.lng], 15);
        L.marker([userLocation.lat, userLocation.lng], {
          icon: L.divIcon({
            className: 'user-location-pin',
            html: `<div style="background: #2563eb; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px rgba(37,99,235,0.6);"></div>`,
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          })
        }).addTo(leafletMap).bindPopup("<b>You Are Here</b>").openPopup();
      }

      renderMandapamsDirectory();
      document.getElementById("directory-section").scrollIntoView({ behavior: "smooth" });
    },
    (error) => {
      if (btn) btn.innerHTML = `<span>📍</span> Use My Location`;
      alert("Unable to retrieve your location. Showing default Karimnagar order.");
    }
  );
}

// 14. Event Listeners & Auto-Scroll
function setupEventListeners() {
  const searchForm = document.getElementById("main-search-form");
  const searchInput = document.getElementById("main-search-input");

  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      searchQuery = searchInput.value;
      renderMandapamsDirectory();
      document.getElementById("directory-section").scrollIntoView({ behavior: "smooth" });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderMandapamsDirectory();
    });
  }
}

function filterByCategory(category) {
  activeCategoryFilter = category;
  document.querySelectorAll(".category-btn").forEach(btn => {
    btn.classList.remove("active");
  });
  if (event && event.target) {
    event.target.classList.add("active");
  }
  renderMandapamsDirectory();
}

function filterByArea(area) {
  activeAreaFilter = area;
  renderAreaPills();
  renderMandapamsDirectory();
}

function clearAllFilters() {
  searchQuery = "";
  activeCategoryFilter = "all";
  activeAreaFilter = "all";
  const searchInput = document.getElementById("main-search-input");
  if (searchInput) searchInput.value = "";
  renderAreaPills();
  renderMandapamsDirectory();
}

function initAutoScroll() {
  const rail = document.getElementById("must-visit-rail");
  if (!rail) return;

  autoScrollInterval = setInterval(() => {
    if (!isAutoScrollPaused) {
      if (rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 10) {
        rail.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        rail.scrollBy({ left: 300, behavior: 'smooth' });
      }
    }
  }, 3500);

  rail.addEventListener("mouseenter", () => isAutoScrollPaused = true);
  rail.addEventListener("mouseleave", () => isAutoScrollPaused = false);
  rail.addEventListener("touchstart", () => isAutoScrollPaused = true);
  rail.addEventListener("touchend", () => isAutoScrollPaused = false);
}

function toggleAutoScroll() {
  isAutoScrollPaused = !isAutoScrollPaused;
  const btn = document.getElementById("btn-toggle-autoscroll");
  if (btn) {
    btn.innerHTML = isAutoScrollPaused 
      ? `<span class="h-2 w-2 rounded-full bg-rose-500"></span><span>Paused</span>`
      : `<span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span><span>Auto-Scroll</span>`;
  }
}

function scrollRail(direction) {
  const rail = document.getElementById("must-visit-rail");
  if (!rail) return;
  const offset = direction === 'left' ? -320 : 320;
  rail.scrollBy({ left: offset, behavior: 'smooth' });
}
