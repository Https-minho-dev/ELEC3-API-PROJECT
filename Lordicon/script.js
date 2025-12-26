
const icons = [
    { src: 'https://cdn.lordicon.com/slkvcfos.json', name: 'Heart Pulse', category: 'health' },
    { src: 'https://cdn.lordicon.com/gsqxdxog.json', name: 'Check', category: 'action' },
    { src: 'https://cdn.lordicon.com/xldupdup.json', name: 'Loader', category: 'utility' },
    { src: 'https://cdn.lordicon.com/ndydpcaq.json', name: 'Weather Sun', category: 'weather' },
    { src: 'https://cdn.lordicon.com/wloilxuq.json', name: 'Mail Send', category: 'communication' },
    { src: 'https://cdn.lordicon.com/msoeawqm.json', name: 'Search', category: 'utility' },
    { src: 'https://cdn.lordicon.com/hpivxauj.json', name: 'Shopping Cart', category: 'commerce' },
    { src: 'https://cdn.lordicon.com/eflqaalp.json', name: 'Bookmark', category: 'action' }
];

const iconFallbacks = {
    'Check': [
        'https://cdn.lordicon.com/gsqxdxog.json',
        'https://cdn.lordicon.com/rhvddzym.json',
        'https://cdn.lordicon.com/uflkzqsw.json',
        'https://cdn.lordicon.com/msetbiun.json'
    ],
    'Loader': [
        'https://cdn.lordicon.com/xldupdup.json',
        'https://cdn.lordicon.com/jvuhzmpu.json',
        'https://cdn.lordicon.com/wkdyhsge.json',
        'https://cdn.lordicon.com/ivhjpjsw.json',
        'https://cdn.lordicon.com/ymrqtsej.json'
    ],
    'Search': [
        'https://cdn.lordicon.com/msoeawqm.json',
        'https://cdn.lordicon.com/xqiwlwcq.json',
        'https://cdn.lordicon.com/zmhtxrnq.json',
        'https://cdn.lordicon.com/kjsfgcir.json',
        'https://cdn.lordicon.com/bhfjfgqz.json'
    ],
    'Bookmark': [
        'https://cdn.lordicon.com/eflqaalp.json',
        'https://cdn.lordicon.com/hjejciym.json',
        'https://cdn.lordicon.com/msetbiun.json',
        'https://cdn.lordicon.com/tdrtiskw.json'
    ]
};

const gallery = document.getElementById('gallery');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearch');
const iconCountEl = document.getElementById('iconCount');
const loadingState = document.getElementById('loadingState');
const noResults = document.getElementById('noResults');

let filteredIcons = [...icons];
let lordIconLoaded = false;


function waitForLordIcon() {
    return new Promise((resolve) => {

        if (customElements.get('lord-icon')) {
            lordIconLoaded = true;
            resolve();
            return;
        }

        if (typeof window.lordicon !== 'undefined') {
            lordIconLoaded = true;
            resolve();
            return;
        }

        const checkInterval = setInterval(() => {
            if (customElements.get('lord-icon') || typeof window.lordicon !== 'undefined') {
                lordIconLoaded = true;
                clearInterval(checkInterval);
                resolve();
            }
        }, 100);


        setTimeout(() => {
            clearInterval(checkInterval);
            resolve();
        }, 5000);
    });
}

function createCard(item) {
    const card = document.createElement('div');
    card.className = 'card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Icon: ${item.name}. Click to animate.`);

    const wrap = document.createElement('div');
    wrap.className = 'icon-wrap';

    const iconEl = document.createElement('lord-icon');
    iconEl.setAttribute('src', item.src);
    iconEl.setAttribute('trigger', 'hover');
    iconEl.setAttribute('colors', 'primary:#3b82f6,secondary:#8b5cf6');
    iconEl.setAttribute('style', 'width:100px;height:100px;display:block;visibility:visible;opacity:1');
    iconEl.setAttribute('aria-label', item.name);


    iconEl.style.visibility = 'visible';
    iconEl.style.opacity = '1';
    iconEl.style.display = 'block';


    iconEl.addEventListener('ready', () => {
        card.classList.add('icon-loaded');
    });


    let fallbackIndex = 0;
    let hasLoaded = false;

    const checkIconLoaded = () => {

        if (iconEl.shadowRoot && iconEl.shadowRoot.querySelector('svg')) {
            hasLoaded = true;
            return true;
        }
        if (iconEl.querySelector('svg')) {
            hasLoaded = true;
            return true;
        }

        if (iconEl.innerHTML && iconEl.innerHTML.trim() !== '') {
            hasLoaded = true;
            return true;
        }
        return false;
    };

    const tryFallback = () => {
        if (hasLoaded) return;

        const fallbacks = iconFallbacks[item.name];
        if (fallbacks && fallbackIndex < fallbacks.length) {
            console.log(`Trying fallback ${fallbackIndex + 1} for ${item.name}: ${fallbacks[fallbackIndex]}`);
            iconEl.setAttribute('src', fallbacks[fallbackIndex] + '?t=' + Date.now());
            fallbackIndex++;


            setTimeout(() => {
                if (!checkIconLoaded() && fallbackIndex < fallbacks.length) {
                    tryFallback();
                }
            }, 1500);
        } else {
            console.warn(`Failed to load icon: ${item.name} after all attempts`);

            wrap.innerHTML = `<div style="color: var(--text-muted); font-size: 0.875rem; text-align: center; padding: 1rem;">${item.name}</div>`;
        }
    };


    setTimeout(() => {
        if (!checkIconLoaded()) {
            console.log(`Icon ${item.name} not loaded, trying fallback...`);
            tryFallback();
        } else {
            console.log(`✓ Icon ${item.name} loaded successfully`);
        }
    }, 2000);


    iconEl.addEventListener('error', () => {
        if (!hasLoaded) {
            tryFallback();
        }
    });


    iconEl.addEventListener('ready', () => {
        hasLoaded = true;
    });


    const playAnimation = () => {
        if (typeof iconEl.play === 'function') {
            iconEl.play();
        } else if (iconEl.shadowRoot) {

            const svg = iconEl.shadowRoot.querySelector('svg');
            if (svg) {
                iconEl.setAttribute('trigger', 'click');
                setTimeout(() => {
                    iconEl.setAttribute('trigger', 'hover');
                }, 1000);
            }
        } else {

            iconEl.setAttribute('trigger', 'click');
            setTimeout(() => {
                iconEl.setAttribute('trigger', 'hover');
            }, 1000);
        }

        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    };


    card.addEventListener('click', playAnimation);
    iconEl.addEventListener('click', (e) => {
        e.stopPropagation();
        playAnimation();
    });

    card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playAnimation();
        }
    });


    card.addEventListener('mouseenter', () => {
        if (typeof iconEl.play === 'function') {

        }
    });

    wrap.appendChild(iconEl);

    const nameEl = document.createElement('div');
    nameEl.className = 'name';
    nameEl.textContent = item.name;

    card.appendChild(wrap);
    card.appendChild(nameEl);

    return card;
}

function renderGallery(iconsToRender = filteredIcons) {

    if (loadingState) {
        loadingState.style.display = 'none';
    }


    gallery.innerHTML = '';

    if (iconsToRender.length === 0) {
        if (noResults) {
            noResults.style.display = 'flex';
        }
        if (iconCountEl) {
            iconCountEl.textContent = '0 Icons';
        }
        return;
    }


    if (noResults) {
        noResults.style.display = 'none';
    }


    if (iconCountEl) {
        const count = iconsToRender.length;
        iconCountEl.textContent = `${count} ${count === 1 ? 'Icon' : 'Icons'}`;
    }

    iconsToRender.forEach((item, index) => {
        const card = createCard(item);
        gallery.appendChild(card);

        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

function filterIcons(searchTerm) {
    if (!searchTerm.trim()) {
        filteredIcons = [...icons];
    } else {
        const term = searchTerm.toLowerCase();
        filteredIcons = icons.filter(icon =>
            icon.name.toLowerCase().includes(term) ||
            icon.category.toLowerCase().includes(term)
        );
    }
    renderGallery(filteredIcons);
}


if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value;
        filterIcons(term);


        if (clearSearchBtn) {
            clearSearchBtn.style.display = term ? 'flex' : 'none';
        }
    });


    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', () => {
            searchInput.value = '';
            filterIcons('');
            clearSearchBtn.style.display = 'none';
            searchInput.focus();
        });
    }
}


async function init() {
    console.log('Initializing gallery...');


    if (loadingState) {
        loadingState.style.display = 'flex';
    }

    console.log('Waiting for Lordicon library...');
    await waitForLordIcon();
    console.log('Lordicon library loaded:', lordIconLoaded);

    await new Promise(resolve => setTimeout(resolve, 500));

    setTimeout(() => {
        console.log('Rendering gallery with', icons.length, 'icons');
        renderGallery();

        setTimeout(() => {
            const lordIcons = document.querySelectorAll('lord-icon');
            console.log('Checking', lordIcons.length, 'icons for loading status...');
            lordIcons.forEach((icon, index) => {
                const hasContent = icon.shadowRoot && icon.shadowRoot.querySelector('svg');
                if (!hasContent) {
                    const src = icon.getAttribute('src');
                    const iconName = icon.getAttribute('aria-label') || `Icon ${index + 1}`;
                    console.warn(`⚠ Icon ${iconName} not loaded, retrying:`, src);
                    if (src) {
                        icon.setAttribute('src', src.split('?')[0] + '?retry=' + Date.now());
                    }
                } else {
                    const iconName = icon.getAttribute('aria-label') || `Icon ${index + 1}`;
                    console.log(`✓ ${iconName} is loaded`);
                }
            });
        }, 3000);
    }, 100);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

window.addEventListener('load', () => {
    if (!lordIconLoaded) {
        waitForLordIcon().then(() => {
            if (filteredIcons.length > 0 && gallery.children.length === 0) {
                renderGallery();
            }
        });
    }
});
