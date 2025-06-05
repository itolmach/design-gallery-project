document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const directionSelector = document.getElementById('direction-selector');
    const currentDirectionTitle = document.getElementById('current-direction-title');

    const designDirections = {
        BoringPlush: [
            "Intro.png",
            "Home.png",
            "Big Visual.png",
            "Calculator.png",
            "Loader.png"
        ],
        FunTiffany: [
            "Intro.png",
            "Home.png",
            "Big Visual.png",
            "Calculator.png",
            "Loader.png"
        ],
        CoolBeans: [
            "Intro.png",
            "Home.png",
            "Big Visual.png",
            "Calculator.png",
            "Loader.png"
        ]
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

        const imageFilenames = designDirections[direction];
        if (!imageFilenames || imageFilenames.length === 0) {
            galleryContainer.innerHTML = `<p>No images found for ${direction}, or this direction is not defined.</p>`;
            return;
        }

        imageFilenames.forEach(filename => {
            const img = document.createElement('img');
            const imagePath = getImagePath(direction, filename);
            img.src = imagePath;
            img.alt = `${direction} - ${filename.replace('.png', '')}`;
            img.classList.add('gallery-image');

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