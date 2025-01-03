// animations.js

(function () {
        document.addEventListener('DOMContentLoaded', function () {
        function isMobileDevice() {
            return window.innerWidth <= 768 || window.innerWidth / window.innerHeight < 1;
        }
        
        // Initial check and redirect
        function checkAndRedirect() {
            if (isMobileDevice() && !window.location.href.includes('mobile.html')) {
                window.location.href = 'mobile.html';
                return;
            }
        }
        
        // Check on initial load
        checkAndRedirect();
        
        // Add resize listener
        window.addEventListener('resize', checkAndRedirect);
        
        // Add the mobile warning code here, before your existing code
        /*function checkMobileWarning() {
            const warning = document.getElementById('mobile-warning');
            const aspectRatio = window.innerWidth / window.innerHeight;
            
            if (window.innerWidth <= 768 || aspectRatio < 1) {
                warning.style.display = 'flex';
                document.body.classList.add('show-mobile-warning');
            } else {
                warning.style.display = 'none';
                document.body.classList.remove('show-mobile-warning');
            }
        }
    
        // Initial check
        checkMobileWarning(); 
        
        // Add resize listener
        window.addEventListener('resize', checkMobileWarning);*/

        // Add this function near the top of your DOMContentLoaded function in animation.js
        function hasChapters(bookNumber) {
            const bookChapters = {
                '1': [
                    { title: "The Beginning", pdfFile: "chapter1.pdf" },
                    { title: "The Journey", pdfFile: "chapter2.pdf" },
                    { title: "The Climax", pdfFile: "chapter3.pdf" },
                    { title: "The Resolution", pdfFile: "chapter4.pdf" },
                    { title: "The Aftermath", pdfFile: "chapter5.pdf" },
                ],
                '2': [
                    { title: "New Horizons", startPage: 1 },
                    { title: "The Challenge", startPage: 15 },
                    { title: "Unexpected Allies", startPage: 30 },
                    { title: "The Revelation", startPage: 45 },
                ],
                '3': []
            };
            
            return bookChapters[bookNumber] && bookChapters[bookNumber].length > 0;
        }

        // Replace your existing book cover click events with these:
        document.querySelectorAll('.book-container').forEach(bookContainer => {
            const bookCover = bookContainer.querySelector('.book-cover');
            const readNowBtn = bookContainer.querySelector('.read-now');
            const hasChaptersAvailable = bookContainer.dataset.chapters === "true";

            // Book cover click handler
            bookCover.addEventListener('click', function(e) {
                e.preventDefault();
                if (hasChaptersAvailable) {
                    const bookNumber = bookContainer.dataset.book;
                    window.location.href = `book${bookNumber}.html`;
                }
            });

            // Read Now button click handler
            if (readNowBtn) {
                readNowBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    if (hasChaptersAvailable) {
                        const bookNumber = bookContainer.dataset.book;
                        window.location.href = `book${bookNumber}.html`;
                    }
                });
            }
        });
    
        let musicStarted = false;
        const music = document.getElementById('background-music');
        const audioToggle = document.getElementById('audio-toggle');
        const bars = document.querySelectorAll('.audio-icon .bar');

        // Start playing music automatically after the first user interaction
        document.body.addEventListener('click', function () {
            if (!musicStarted) {
                music.play();
                music.volume = 0.5; // Set initial volume
                audioToggle.classList.add('playing');
                startVisualizer();
                musicStarted = true;
            }
        });

        // Toggle play/pause on audio toggle button click
        audioToggle.addEventListener('click', function (event) {
            event.stopPropagation(); // Prevent body click event from triggering
            if (music.paused) {
                music.play();
                audioToggle.classList.add('playing');
                startVisualizer();
            } else {
                music.pause();
                audioToggle.classList.remove('playing');
                stopVisualizer();
            }
        });

        // Placeholder functions for visualizer (Define actual implementations if needed)
        function startVisualizer() {
            // Initialize and start audio visualizer
            console.log('Visualizer started.');
        }

        function stopVisualizer() {
            // Stop and clean up audio visualizer
            console.log('Visualizer stopped.');
        }

        // Scroll Snap Functionality
        const sections = document.querySelectorAll('section');
        let isScrolling = false;
        let currentSectionIndex = 0;
        const scrollTimeout = 500; // Duration to wait before allowing another scroll (ms)

        function scrollToSection(index) {
            if (index < 0 || index >= sections.length) return;
            isScrolling = true;
            sections[index].scrollIntoView({ behavior: 'smooth' });
            currentSectionIndex = index;

            // Set timeout to reset isScrolling flag
            setTimeout(() => {
                isScrolling = false;
            }, scrollTimeout);
        }

        function handleScrollEvent(e) {
            if (isScrolling) return;

            e.preventDefault(); // Prevent default scrolling behavior

            const delta = e.deltaY;

            if (delta > 0) {
                // Scroll Down
                if (currentSectionIndex < sections.length - 1) {
                    scrollToSection(currentSectionIndex + 1);
                }
            } else if (delta < 0) {
                // Scroll Up
                if (currentSectionIndex > 0) {
                    scrollToSection(currentSectionIndex - 1);
                }
            }
        }

        // Scroll event listener without throttle/debounce
        window.addEventListener('wheel', handleScrollEvent, { passive: false });

        // Keyboard Navigation
        window.addEventListener('keydown', function (e) {
            if (isScrolling) return;

            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                if (currentSectionIndex < sections.length - 1) {
                    scrollToSection(currentSectionIndex + 1);
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                if (currentSectionIndex > 0) {
                    scrollToSection(currentSectionIndex - 1);
                }
            }
        });

        // Get all sections and navbar links
    const navLinks = document.querySelectorAll('#navbar a');

    // Function to update active section and navbar link
    function updateActiveSection() {
    let currentSectionId = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
        currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSectionId) {
        link.classList.add('active');
        }
    });
    }

    // Call updateActiveSection on page load and scroll
    window.addEventListener('load', updateActiveSection);
    window.addEventListener('scroll', updateActiveSection);

        // Touch Navigation for Mobile Devices
        let touchStartY = 0;
        let touchEndY = 0;

        window.addEventListener('touchstart', function (e) {
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        window.addEventListener('touchend', function (e) {
            touchEndY = e.changedTouches[0].screenY;
            handleGesture();
        }, { passive: true });

        function handleGesture() {
            if (isScrolling) return;
            const deltaY = touchStartY - touchEndY;
            if (deltaY > 50) {
                // Swipe Up - Scroll Down
                if (currentSectionIndex < sections.length - 1) {
                    scrollToSection(currentSectionIndex + 1);
                }
            } else if (deltaY < -50) {
                // Swipe Down - Scroll Up
                if (currentSectionIndex > 0) {
                    scrollToSection(currentSectionIndex - 1);
                }
            }
        }

        // Update currentSectionIndex on scroll (for direct scrolls)
        window.addEventListener('scroll', function () {
            if (isScrolling) return;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= -window.innerHeight / 2 && rect.top < window.innerHeight / 2) {
                    currentSectionIndex = index;
                }
            });
        });

        // Smooth scroll for navbar links
        document.querySelectorAll('#navbar a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    const targetIndex = Array.from(sections).indexOf(targetSection);
                    if (targetIndex !== -1 && !isScrolling) {
                        scrollToSection(targetIndex);
                    }
                }
            });
        });

// Book Cover Click Event
        document.querySelectorAll('.book-cover').forEach(bookCover => {
            bookCover.addEventListener('click', function(e) {
                e.preventDefault();
                const bookContainer = this.closest('.book-container');
                const bookNumber = bookContainer.dataset.book;
                
                if (hasChapters(bookNumber)) {
                    window.location.href = `book${bookNumber}.html`;
                }
            });
        });

        // Read Now Button Click Event
        document.querySelectorAll('.read-now').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const bookContainer = this.closest('.book-container');
                const bookNumber = bookContainer.dataset.book;
                
                if (hasChapters(bookNumber)) {
                    window.location.href = `book${bookNumber}.html`;
                }
            });
        });

        // Intersection Observer to animate books and characters
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const animationObserver = new IntersectionObserver(observerCallback, observerOptions);
        document.querySelectorAll('section').forEach(section => {
            animationObserver.observe(section);
        });

        function observerCallback(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;

                    // Trigger character animations
                    if (section.id === 'characters') {
                        const characterImg = section.querySelector('.character-full-img');
                        const characterName = section.querySelector('#character-name');
                        const characterIntro = section.querySelector('#character-intro');
                        const characterDesc = section.querySelector('#character-desc');

                        // Remove existing classes and add animation classes
                        characterImg.classList.remove('slide-in-blurred-right');
                        characterName.classList.remove('tracking-in-expand');
                        characterIntro.classList.remove('tracking-in-expand-top');
                        characterDesc.classList.remove('tracking-in-expand-top');

                        // Force reflow
                        void characterImg.offsetWidth;
                        void characterName.offsetWidth;
                        void characterIntro.offsetWidth;
                        void characterDesc.offsetWidth;

                        // Add animation classes
                        characterImg.classList.add('slide-in-blurred-right');
                        characterName.classList.add('tracking-in-expand');
                        characterIntro.classList.add('tracking-in-expand-top');
                        characterDesc.classList.add('tracking-in-expand-top');
                    }

                    // Trigger book animations
                    if (section.id === 'books') {
                        const books = section.querySelectorAll('.book-up, .book-down');
                        books.forEach(book => {
                            book.classList.remove('visible', 'animate');
                            // Force reflow
                            void book.offsetWidth;
                            book.classList.add('visible', 'animate');
                        });
                    }
                }
            });
        }

        // Media Gallery Fullscreen Functionality
        const mediaItems = document.querySelectorAll('.media-item img');
        const fullscreenOverlay = document.getElementById('fullscreen-overlay');
        const fullscreenImage = document.getElementById('fullscreen-image');
        const closeBtn = document.querySelector('.close-btn');

        function openFullscreen(src) {
            fullscreenImage.src = src;
            fullscreenOverlay.style.display = 'flex';
            document.body.classList.add('no-scroll', 'hide-scrollbar'); // Add both classes
        }

        function closeFullscreen() {
            fullscreenOverlay.style.display = 'none';
            document.body.classList.remove('no-scroll', 'hide-scrollbar'); // Remove both classes
        }

        mediaItems.forEach(item => {
            item.addEventListener('click', function () {
                openFullscreen(this.src);
            });
        });

        closeBtn.addEventListener('click', closeFullscreen);

        fullscreenOverlay.addEventListener('click', function (e) {
            if (e.target === this) {
                closeFullscreen();
            }
        });

        // Selected Character Tracking
        let selectedCharacterId = 'character1'; // Set initial selected character

        // Character Data and Functions
        const charactersData = {
            "Singularity": [
                {
                    id: "character1",
                    name: "Luca Hendrix",
                    intro: "A Memokeeper of the Garden of Recollection. A mysterious and elegant soothsayer.",
                    desc: "She often wears a warm smile and is willing to patiently listen to the words of others, thus using such means as a pretext to enter 'memories' and gain omniscience over certain matters. A lady passionate about collecting unique memories, yet the thoughts that guide her are hard to glean.",
                    img: "characters/luca design.png",
                    thumb: "test.jpg"
                },
                {
                    id: "character2",
                    name: "Eli Aphelion",
                    intro: "Intro of Character 2.",
                    desc: "Description of Character 2.",
                    img: "characters/eli new design seraph.png",
                    thumb: "test.jpg"
                },
                {
                    id: "character3",
                    name: "Rae Estelle",
                    intro: "A Memokeeper of the Garden of Recollection. A mysterious and elegant soothsayer.",
                    desc: "She often wears a warm smile and is willing to patiently listen to the words of others, thus using such means as a pretext to enter 'memories' and gain omniscience over certain matters. A lady passionate about collecting unique memories, yet the thoughts that guide her are hard to glean.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                },
                {
                    id: "character4",
                    name: "Nox",
                    intro: "Intro of Character 4.",
                    desc: "Description of Character 4.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                },
                {
                    id: "character5",
                    name: "Black Swan 5",
                    intro: "A Memokeeper of the Garden of Recollection. A mysterious and elegant soothsayer.",
                    desc: "She often wears a warm smile and is willing to patiently listen to the words of others, thus using such means as a pretext to enter 'memories' and gain omniscience over certain matters. A lady passionate about collecting unique memories, yet the thoughts that guide her are hard to glean.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                },
                {
                    id: "character6",
                    name: "Character 6",
                    intro: "Intro of Character 6.",
                    desc: "Description of Character 6.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                },
                {
                    id: "character7",
                    name: "Black Swan 7",
                    intro: "A Memokeeper of the Garden of Recollection. A mysterious and elegant soothsayer.",
                    desc: "She often wears a warm smile and is willing to patiently listen to the words of others, thus using such means as a pretext to enter 'memories' and gain omniscience over certain matters. A lady passionate about collecting unique memories, yet the thoughts that guide her are hard to glean.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                },
                {
                    id: "character8",
                    name: "Character 8",
                    intro: "Intro of Character 8.",
                    desc: "Description of Character 8.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                }
            ],
            "Valkyria": [
                {
                    id: "character9",
                    name: "Grayson Exton",
                    intro: "Intro of Character 9.",
                    desc: "Description of Character 9.",
                    img: "characters/grayson design.png",
                    thumb: "test.jpg"
                },
                {
                    id: "character10",
                    name: "Ivan",
                    intro: "Intro of Character 10.",
                    desc: "Description of Character 10.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                },
                {
                    id: "character11",
                    name: "Maeve",
                    intro: "Intro of Character 10.",
                    desc: "Description of Character 10.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                }
            ],
            "Unknown": [
                {
                    id: "Character12",
                    name: "Xander",
                    intro: "Intro of Character 11.",
                    desc: "Description of Character 11.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                },
                {
                    id: "Character13",
                    name: "Linus",
                    intro: "Intro of Character 11.",
                    desc: "Description of Character 11.",
                    img: "test.jpg",
                    thumb: "test.jpg"
                }
            ]
        };

        let organizationIndex = 0;
        let characterIndex = 0;

        function scrollOrganizations(direction) {
            const organizations = Object.keys(charactersData);
            organizationIndex = (organizationIndex + direction + organizations.length) % organizations.length;
            updateOrganizations(direction, true); // Pass 'true' to indicate selection update
        }

        function updateOrganizations(direction, selectFirstCharacter = false) {
            const organizations = Object.keys(charactersData);
            const orgList = document.querySelector('.organization-list');

            // Determine slide-out class based on direction
            if (direction === 1) { // Scrolling down
                orgList.classList.add('slide-out-up');
            } else if (direction === -1) { // Scrolling up
                orgList.classList.add('slide-out-down');
            }

            // After the slide-out animation ends, update the list and slide-in
            setTimeout(() => {
                // Update the list
                orgList.innerHTML = '';

                // Display three organizations: previous, current, next
                for (let i = -1; i <= 1; i++) {
                    const index = (organizationIndex + i + organizations.length) % organizations.length;
                    const org = organizations[index];
                    const orgDiv = document.createElement('div');
                    orgDiv.classList.add('organization');
                    if (i === 0) orgDiv.classList.add('active');
                    orgDiv.innerHTML = `
                        <img src="test.jpg" alt="${org} Logo" loading="lazy">
                        <div class="organization-name">${org}</div>
                    `;
                    orgDiv.addEventListener('click', () => centerOrganization(index));
                    orgList.appendChild(orgDiv);
                }

                // Remove slide-out class and add slide-in class based on direction
                if (direction === 1) { // Scrolling down
                    orgList.classList.remove('slide-out-up');
                    orgList.classList.add('slide-in-down');
                } else if (direction === -1) { // Scrolling up
                    orgList.classList.remove('slide-out-down');
                    orgList.classList.add('slide-in-up');
                }

                // After slide-in animation, remove the slide-in class
                setTimeout(() => {
                    if (direction === 1) {
                        orgList.classList.remove('slide-in-down');
                    } else if (direction === -1) {
                        orgList.classList.remove('slide-in-up');
                    }
                }, 300); // Duration should match the CSS animation duration

                // If a new organization is selected, update the selected character
                if (selectFirstCharacter) {
                    const currentOrganization = organizations[organizationIndex];
                    const firstCharacter = charactersData[currentOrganization][0];
                    if (firstCharacter) {
                        selectedCharacterId = firstCharacter.id;
                        characterIndex = 0;
                        updateCharacterList(); // Update without animation
                    }
                }
            }, 300); // Duration should match the CSS animation duration

            // No need to call updateCharacterList() here since it's handled above
        }

        function centerOrganization(index) {
            if (index === organizationIndex) return; // Already centered

            const organizations = Object.keys(charactersData);
            const direction = (index > organizationIndex) ? 1 : -1;
            organizationIndex = index;
            updateOrganizations(direction, true); // Pass 'true' to indicate selection update
        }

        function scrollCharacters(direction) {
            const organizations = Object.keys(charactersData);
            const currentOrganization = organizations[organizationIndex];
            const characters = charactersData[currentOrganization];
            const totalCharacters = characters.length;

            // Update characterIndex by direction * 5
            characterIndex += direction * 5;

            // Ensure characterIndex stays within bounds
            if (characterIndex < 0) {
                characterIndex = 0;
            } else if (characterIndex >= totalCharacters) {
                characterIndex = Math.max(totalCharacters - 5, 0); // Ensure at least 5 characters are shown
            }

            updateCharacterList(direction);
            document.querySelector('.character-selection').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        function updateCharacterList(direction = 0) {
            const organizations = Object.keys(charactersData);
            const currentOrganization = organizations[organizationIndex];
            const characters = charactersData[currentOrganization];
            const totalCharacters = characters.length;

            const characterList = document.getElementById('character-list');

            // Determine slide-out class based on direction
            if (direction === 1) { // Scrolling to next 5 characters
                characterList.classList.add('slide-out-left');
            } else if (direction === -1) { // Scrolling to previous 5 characters
                characterList.classList.add('slide-out-right');
            }

            // After the slide-out animation ends, update the list and slide-in
            setTimeout(() => {
                // Clear existing list
                characterList.innerHTML = '';

                // Calculate the range of characters to display
                const startIndex = Math.floor(characterIndex / 5) * 5;
                const endIndex = Math.min(startIndex + 5, totalCharacters);

                for (let i = startIndex; i < endIndex; i++) {
                    const character = characters[i];
                    const charDiv = document.createElement('div');
                    charDiv.classList.add('character-thumbnail');
                    if (character.id === selectedCharacterId) charDiv.classList.add('active'); // Only the selected character
                    charDiv.innerHTML = `<img src="${character.thumb}" alt="${character.name}" loading="lazy">`;
                    charDiv.addEventListener('click', () => selectCharacter(character.id));
                    characterList.appendChild(charDiv);
                }

                // Remove slide-out class and add slide-in class based on direction
                if (direction === 1) { // Scrolling to next
                    characterList.classList.remove('slide-out-left');
                    characterList.classList.add('slide-in-right');
                } else if (direction === -1) { // Scrolling to previous
                    characterList.classList.remove('slide-out-right');
                    characterList.classList.add('slide-in-left');
                }

                // After slide-in animation, remove the slide-in class
                setTimeout(() => {
                    if (direction === 1) {
                        characterList.classList.remove('slide-in-right');
                    } else if (direction === -1) {
                        characterList.classList.remove('slide-in-left');
                    }
                }, 300); // Duration should match the CSS animation duration

                // Update character details if the selected character is in the current list
                const visibleCharacters = characters.slice(startIndex, endIndex);
                if (visibleCharacters.some(char => char.id === selectedCharacterId)) {
                    const selectedCharacter = characters.find(char => char.id === selectedCharacterId);
                    updateCharacterDetails(selectedCharacter);
                }
            }, 300); // Duration should match the CSS animation duration
        }

        function selectCharacter(characterId) {
            selectedCharacterId = characterId; // Update the selected character

            const organizations = Object.keys(charactersData);
            const currentOrganization = organizations[organizationIndex];
            const characters = charactersData[currentOrganization];

            // Remove 'active' class from all thumbnails
            const characterThumbnails = document.querySelectorAll('.character-thumbnail');
            characterThumbnails.forEach(thumbnail => {
                thumbnail.classList.remove('active');
            });

            // Add 'active' class to the selected thumbnail if it's in the current visible list
            const currentVisibleStart = Math.floor(characterIndex / 5) * 5;
            const relativeIndex = characters.findIndex(char => char.id === characterId) - currentVisibleStart;

            if (relativeIndex >= 0 && relativeIndex < 5) { // Ensure within current visible set
                const selectedThumbnail = characterThumbnails[relativeIndex];
                if (selectedThumbnail) {
                    selectedThumbnail.classList.add('active');
                }
            }

            // Update character details
            const selectedCharacter = characters.find(char => char.id === characterId);
            if (selectedCharacter) {
                updateCharacterDetails(selectedCharacter);
            }
        }

        function updateCharacterDetails(character) {
            const characterImg = document.querySelector('.character-full-img');
            const characterName = document.getElementById('character-name');
            const characterIntro = document.getElementById('character-intro');
            const characterDesc = document.getElementById('character-desc');

            // Exit animations
            characterImg.classList.add('slide-out-blurred-left');
            characterName.classList.add('tracking-out-contract');
            characterIntro.classList.add('tracking-out-contract-top');
            characterDesc.classList.add('tracking-out-contract-top');

            // After exit animations, update content and apply entrance animations
            setTimeout(() => {
                characterImg.src = character.img;
                characterName.innerText = character.name;
                characterIntro.innerText = character.intro;
                characterDesc.innerText = character.desc;

                // Remove exit classes and add entrance classes
                characterImg.classList.remove('slide-out-blurred-left');
                characterName.classList.remove('tracking-out-contract');
                characterIntro.classList.remove('tracking-out-contract-top');
                characterDesc.classList.remove('tracking-out-contract-top');

                characterImg.classList.add('slide-in-blurred-right');
                characterName.classList.add('tracking-in-expand');
                characterIntro.classList.add('tracking-in-expand-top');
                characterDesc.classList.add('tracking-in-expand-top');
            }, 400); // Adjust timing as needed
        }

        // Initialize
        updateOrganizations(0, true); // Initial load with selecting the first character

        // Event listeners for arrows
        document.querySelector('.arrow.up').addEventListener('click', () => {
            if (!isScrolling) scrollOrganizations(-1);
        });
        document.querySelector('.arrow.down').addEventListener('click', () => {
            if (!isScrolling) scrollOrganizations(1);
        });
        document.querySelector('.arrow.left').addEventListener('click', () => {
            if (!isScrolling) scrollCharacters(-1);
        });
        document.querySelector('.arrow.right').addEventListener('click', () => {
            if (!isScrolling) scrollCharacters(1);
        });

        // Listen to scroll events to update current section index
        window.addEventListener('scroll', function () {
            if (isScrolling) return;
            sections.forEach((section, index) => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= -window.innerHeight / 2 && rect.top < window.innerHeight / 2) {
                    currentSectionIndex = index;
                }
            });
        });

        // Prevent default scrolling behavior during snap
        window.addEventListener('touchmove', function (e) {
            if (isScrolling) {
                e.preventDefault();
            }
        }, { passive: false });
    });
})();

