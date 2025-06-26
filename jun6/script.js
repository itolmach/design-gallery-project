document.addEventListener('DOMContentLoaded', () => {
    const galleryContainer = document.getElementById('gallery-container');
    const directionSelector = document.getElementById('direction-selector');
    const currentDirectionTitle = document.getElementById('current-direction-title');
    const styleDescription = document.getElementById('style-description');
    const soundsContainer = document.getElementById('sounds-container');

    const soundFiles = [
        "Cash.wav", "Click1.wav", "Click2.wav", "Intro.wav", "Notification.wav",
        "Received.wav", "Sent.wav", "approvedL.wav", "approvedM.wav",
        "approvedS.wav", "signing.wav", "tap.wav"
    ];

    const designDirections = {
        BoringPlush: {
            images: [
                "Logo.png",
                "Intro.png",
                "Home.png",
                "Big Visual.png",
                "Calculator.png",
                "Loader.png",
                "uxcollector.png",
                "visuals.png",
                "Calculator screen.png"
            ],
            description: "1. Плюшевый комфорт\n\nЭто направление подчеркивает максимальную заботу и эмоциональное тепло. Здесь акцентируется защищенность, чувство уютного, мягкого пространства, где можно расслабиться и перестать тревожиться о денежных нюансах. Пользователь ощущает спокойствие и безопасность, словно укутан мягким покрывалом финансовой поддержки. Поиск ощущения скуки и полного доверия бренду. Метрики: клиент пользуется редко, но не перестает, не удаляет\n\nВопросы для клиентов:\n\nНасколько важно вам чувствовать, что ваши деньги находятся в полной безопасности?\n\nКакие дополнительные финансовые инструменты, помимо зарплатного аванса, вам было бы комфортно использовать?\n\nЧто вызывает у вас чувство финансовой тревоги и как вы справляетесь с ней?\n\nПредпочитаете ли вы общаться с финансовыми сервисами в дружественной, тёплой или нейтрально-деловой атмосфере?\n\nКак вы относитесь к идее финансового приложения, которое символически «обнимает» вас в трудные моменты?\n\nКакие ассоциации у вас возникают со словом «плюшевый» в контексте финансов?\n\nЧто ещё, помимо безопасности и комфорта, вы цените в финансовых сервисах?"
        },
        FunTiffany: {
            images: [
                "Logo.png",
                "Intro.png",
                "Home.png",
                "Big Visual.png",
                "Calculator.png",
                "Loader.png",
                "uxcollector.png",
                "visuals.png"
            ],
            description: "2. Радость новых горизонтов\n\nЭто направление символизирует оптимизм и открытие новых возможностей. Финансовая гибкость позволяет пользователям смело идти навстречу своим мечтам и целям. Здесь яркость, движение вперед и воодушевление от новых перспектив становятся центром внимания. Успех: мы знаем, что человек падок до покупок и даем ему выгодные предложения изнутри приложения\n\nВопросы для клиентов:\n\nКакие цели вы хотели бы достичь с помощью финансовых инструментов?\n\nНасколько важно вам испытывать радость и вдохновение, пользуясь финансовым приложением?\n\nКакие покупки или расходы вызывают у вас наибольший восторг?\n\nКак часто вы используете финансы для того, чтобы открыть для себя что-то новое?\n\nХотели бы вы видеть в финансовом приложении элементы, вдохновляющие на достижение больших целей?\n\nКакое настроение должно передавать приложение, чтобы вы чувствовали мотивацию двигаться вперед?\n\nКакие эмоции вы испытываете, когда успешно достигаете финансовых целей?"
        },
        CoolBeans: {
            images: [
                "Grey-Logo.png",
                "Intro.png",
                "Home.png",
                "Big Visual.png",
                "Calculator.png",
                "Loader.png",
                "Calculator2.png",
                "Grey-Big Visual.png",
                "Grey-Calculator.png",
                "Grey-Calculator2.png",
                "Grey-Home.png",
                "Grey-Intro.png",
                "Grey-Loader.png"
            ],
            description: "3. Сдержанность и спокойствие, когда всё под контролем\n\nЭто направление олицетворяет уверенность, стабильность и минималистичную элегантность. Клиент ощущает себя в контроле над собственной жизнью и финансами. Здесь главенствуют прозрачность, ясность условий и отсутствие неприятных сюрпризов. Он как неприметный офис в центре города, где тебя с пониманием примут без лишнего шума, дадут нужные средства, и не спросят о том, на что он хочет деньги тратить. Просто и со вкусом. Ничего лишнего. Успех: нас советуют друзьям.\n\nВопросы для клиентов:\n\nЧто заставляет вас чувствовать контроль над финансовой ситуацией?\n\nКак вы относитесь к дополнительным вопросам в финансовых приложениях?\n\nКакие элементы интерфейса помогают вам лучше контролировать свои финансы?\n\nНасколько важна для вас прозрачность условий использования финансовых услуг?\n\nКакие именно аспекты финансового контроля вы хотите видеть в приложении?\n\nВ каких ситуациях вам особенно важно сохранять финансовое спокойствие?\n\nКакие финансовые решения вы предпочитаете принимать самостоятельно, а какие доверяете сервисам или консультантам?"
        }
    };

    function getImagePath(direction, filename) {
        return `images/${direction}/${filename}`;
    }

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
        
        const descriptionParts = directionData.description.split('\n\n');
        const title = descriptionParts.shift();
        let descriptionHTML = `<h1>${title}</h1>`;
        descriptionParts.forEach(p_text => {
            if (p_text.startsWith('Вопросы для клиентов:')) {
                descriptionHTML += `<p><strong>${p_text}</strong></p>`;
            } else {
                descriptionHTML += `<p>${p_text}</p>`;
            }
        });
        styleDescription.innerHTML = descriptionHTML;

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

    function loadSounds() {
        soundsContainer.innerHTML = '';
        soundFiles.forEach(filename => {
            const button = document.createElement('button');
            button.classList.add('sound-button');
            button.textContent = filename.replace('.wav', '');
            button.onclick = () => {
                const audio = new Audio(`sounds/${filename}`);
                audio.play();
            };
            soundsContainer.appendChild(button);
        });
    }

    function showSection(direction) {
        if (direction === 'Sounds') {
            styleDescription.classList.add('hidden');
            galleryContainer.classList.add('hidden');
            soundsContainer.classList.remove('hidden');
            currentDirectionTitle.textContent = 'Sounds';
        } else {
            styleDescription.classList.remove('hidden');
            galleryContainer.classList.remove('hidden');
            soundsContainer.classList.add('hidden');
            loadImages(direction);
        }
    }

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

            showSection(selectedDirection);
        }
    });

    loadSounds(); // Pre-load sound buttons

    const initialActiveButton = directionSelector.querySelector('button.active');
    if (initialActiveButton) {
        showSection(initialActiveButton.dataset.direction);
    } else if (directionSelector.firstElementChild && directionSelector.firstElementChild.tagName === 'BUTTON') {
        const firstButton = directionSelector.firstElementChild;
        firstButton.classList.add('active');
        showSection(firstButton.dataset.direction);
    }
}); 