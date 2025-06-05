document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const directionSelector = document.getElementById('direction-selector');
    const currentDirectionTitle = document.getElementById('current-direction-title');
    const styleDescription = document.getElementById('style-description');

    const designDirections = {
        BoringPlush: {
            images: [
                "Intro.png",
                "Home.png",
                "Big Visual.png",
                "Calculator.png",
                "Loader.png",
                "uxcollector.png",
                "visuals.png"
            ],
            description: "A minimalist and clean design with a focus on usability and readability. It uses a muted color palette and simple typography to create a professional and straightforward user experience."
        },
        FunTiffany: {
            images: [
                "Intro.png",
                "Home.png",
                "Big Visual.png",
                "Calculator.png",
                "Loader.png",
                "uxcollector.png",
                "visuals.png"
            ],
            description: "A vibrant and playful design that uses bright colors and bold graphics to create an engaging and energetic atmosphere. This style is perfect for brands that want to stand out and be remembered."
        },
        CoolBeans: {
            images: [
                "Intro.png",
                "Home.png",
                "Big Visual.png",
                "Calculator.png",
                "Loader.png"
            ],
            description: "A modern and trendy design that combines stylish typography with high-quality imagery. It's designed to be cool, casual, and appealing to a younger, tech-savvy audience."
        }
    };

    // --- IMPORTANT ---
    // This function constructs the path to the image.
    // It now expects: images/DIRECTION_NAME/FILENAME.png
    // For example: images/BoringPlush/Intro.png
    function getImagePath(direction, filename) {
        return `images/${direction}/${filename}`;
    }
    // --- IMPORTANT ---

    function loadImages(direction) {
        galleryContainer.innerHTML = ''; // Clear existing images
        currentDirectionTitle.textContent = direction; // Update the title

        const directionData = designDirections[direction];
        if (!directionData) {
            galleryContainer.innerHTML = `<p>No images found for ${direction}, or this direction is not defined.</p>`;
            styleDescription.innerHTML = '';
            return;
        }

        const imageFilenames = directionData.images;
        styleDescription.textContent = directionData.description;

        if (!imageFilenames || imageFilenames.length === 0) {
            galleryContainer.innerHTML = `<p>No images found for ${direction}.</p>`;
            return;
        }

        imageFilenames.forEach((filename, index) => {
            const img = document.createElement('img');
            const imagePath = getImagePath(direction, filename);
            img.src = imagePath;
            img.alt = `${direction} - ${filename.replace('.png', '')}`;
            img.classList.add('gallery-image');
            img.dataset.index = index; // Add index for navigation

            // Fallback to show a placeholder if an image fails to load
            img.onerror = function() {
                const placeholder = document.createElement('div');
                placeholder.classList.add('placeholder-image');
                placeholder.textContent = `${filename} (Not found at ${imagePath})`;
                if (this.parentNode) {
                    this.parentNode.replaceChild(placeholder, this);
                }
            };
            galleryContainer.appendChild(img);
        });
    }

    galleryContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('gallery-image')) {
            const index = parseInt(event.target.dataset.index, 10);
            openModal(index);
        }
    });

    let currentImageIndex = 0;
    let currentImageList = [];

    function openModal(index) {
        const direction = currentDirectionTitle.textContent;
        currentImageList = designDirections[direction].images;
        currentImageIndex = index;
    
        const modalOverlay = document.createElement('div');
        modalOverlay.classList.add('modal-overlay');
        modalOverlay.onclick = closeModal;
    
        const modalContent = document.createElement('img');
        modalContent.classList.add('modal-content');
        modalContent.onclick = (e) => e.stopPropagation(); // Prevent closing when clicking image
    
        const prevButton = document.createElement('button');
        prevButton.innerHTML = '&lsaquo;';
        prevButton.classList.add('modal-nav', 'prev');
        prevButton.onclick = (e) => { e.stopPropagation(); changeImage(-1); };
    
        const nextButton = document.createElement('button');
        nextButton.innerHTML = '&rsaquo;';
        nextButton.classList.add('modal-nav', 'next');
        nextButton.onclick = (e) => { e.stopPropagation(); changeImage(1); };
    
        modalOverlay.appendChild(prevButton);
        modalOverlay.appendChild(modalContent);
        modalOverlay.appendChild(nextButton);
        document.body.appendChild(modalOverlay);
        document.body.classList.add('modal-open');
    
        updateModalContent();
        addSwipeListeners(modalOverlay);
    }
    
    function updateModalContent() {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
            const direction = currentDirectionTitle.textContent;
            const filename = currentImageList[currentImageIndex];
            modalContent.src = getImagePath(direction, filename);
        }
    }
    
    function changeImage(direction) {
        currentImageIndex += direction;
        if (currentImageIndex >= currentImageList.length) currentImageIndex = 0;
        if (currentImageIndex < 0) currentImageIndex = currentImageList.length - 1;
        updateModalContent();
    }
    
    function closeModal() {
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            document.body.removeChild(modalOverlay);
            document.body.classList.remove('modal-open');
        }
    }
    
    function addSwipeListeners(element) {
        let touchstartX = 0;
        element.addEventListener('touchstart', e => {
            touchstartX = e.changedTouches[0].screenX;
        }, { passive: true });
    
        element.addEventListener('touchend', e => {
            const touchendX = e.changedTouches[0].screenX;
            if (touchendX < touchstartX - 50) changeImage(1); // Swipe Left
            if (touchendX > touchstartX + 50) changeImage(-1); // Swipe Right
        });
    }

    directionSelector.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const selectedDirection = event.target.dataset.direction;

            directionSelector.querySelectorAll('button').forEach(btn => btn.classList.remove('active'));
            event.target.classList.add('active');

            loadImages(selectedDirection);
        }
    });

    const initialActiveButton = directionSelector.querySelector('button.active');
    if (initialActiveButton) {
        loadImages(initialActiveButton.dataset.direction);
    } else if (directionSelector.firstElementChild && directionSelector.firstElementChild.tagName === 'BUTTON') {
        const firstButton = directionSelector.firstElementChild;
        firstButton.classList.add('active');
        loadImages(firstButton.dataset.direction);
    }
}); 