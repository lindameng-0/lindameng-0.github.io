document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const bookContent = document.getElementById('book-content');
    const chapterCatalogue = document.getElementById('chapter-catalogue');
    const chapterList = document.getElementById('chapter-list');
    const returnHomeBtn = document.getElementById('return-home');

    // Constants
    const decorationOffset = 0.05;
    let bookNumber;
    
    try {
        bookNumber = window.location.pathname.match(/book(\d+)\.html/)[1];
    } catch (error) {
        console.error('Error parsing book number:', error);
        bookNumber = '1'; // Default to book 1 if parsing fails
    }

    // Chapter data for each book
    const bookChapters = {
        '1': [
            { title: "The Beginning", mdFile: "chapters/vol1/chapter1.md" },
            { title: "The Journey", mdFile: "chapters/vol1/chapter2.md" },
            { title: "The Climax", mdFile: "chapters/vol1/chapter3.md" },
            { title: "The Resolution", mdFile: "chapters/vol1/chapter4.md" },
            { title: "The Aftermath", mdFile: "chapters/vol1/chapter5.md" }
        ],
        '2': [
            { title: "The Beginning", mdFile: "chapters/vol2/chapter1.md" },
            { title: "The Journey", mdFile: "chapters/vol2/chapter2.md" },
            { title: "The Climax", mdFile: "chapters/vol2/chapter3.md" }
        ],
        '3': []
    };

    const chapters = bookChapters[bookNumber] || bookChapters['1'];

    function initScrollbar() {
        const scrollbarThumb = document.querySelector('.scrollbar-thumb');
        const scrollbarLine = document.querySelector('.scrollbar-line');
        const customScrollbar = document.querySelector('.custom-scrollbar');
        
        if (!scrollbarThumb || !scrollbarLine || !customScrollbar) return;

        // Remove existing listeners to prevent duplicates
        bookContent.removeEventListener('scroll', updateScrollbarPosition);
        scrollbarThumb.removeEventListener('mousedown', initDragScroll);

        // Add scroll event listener
        bookContent.addEventListener('scroll', updateScrollbarPosition);

        // Add drag functionality
        scrollbarThumb.addEventListener('mousedown', initDragScroll);

        // Show scrollbar if not mobile
        const isMobile = window.innerWidth <= 768 || window.innerWidth / window.innerHeight < 1;
        customScrollbar.style.display = isMobile ? 'none' : 'flex';
    }

    function initDragScroll(e) {
        e.preventDefault();
        const scrollbarThumb = e.target;
        const scrollbarLine = document.querySelector('.scrollbar-line');
        const startY = e.clientY - scrollbarThumb.getBoundingClientRect().top;
        const scrollbarRect = scrollbarLine.getBoundingClientRect();

        function onMouseMove(e) {
            const y = e.clientY - scrollbarRect.top - startY;
            const scrollbarHeight = scrollbarLine.clientHeight;
            const thumbHeight = scrollbarThumb.clientHeight;
            const scrollableRange = scrollbarHeight - thumbHeight - (scrollbarHeight * (decorationOffset * 2));
            
            // Constrain the thumb position
            let position = Math.max(scrollbarHeight * decorationOffset, 
                                 Math.min(y, scrollableRange + scrollbarHeight * decorationOffset));
            
            // Calculate scroll percentage
            const percentage = (position - scrollbarHeight * decorationOffset) / scrollableRange;
            const scrollPosition = percentage * (bookContent.scrollHeight - bookContent.clientHeight);
            
            bookContent.scrollTop = scrollPosition;
            updateScrollbarPosition();
        }

        function onMouseUp() {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    }

    function updateScrollbarPosition() {
        const scrollbarThumb = document.querySelector('.scrollbar-thumb');
        const scrollbarLine = document.querySelector('.scrollbar-line');
        if (!scrollbarThumb || !scrollbarLine) return;

        const scrollPercentage = bookContent.scrollTop / (bookContent.scrollHeight - bookContent.clientHeight);
        const scrollbarHeight = scrollbarLine.clientHeight;
        const thumbHeight = scrollbarThumb.clientHeight;
        const scrollableRange = scrollbarHeight - thumbHeight - (scrollbarHeight * (decorationOffset * 2));
        const thumbPosition = (scrollPercentage * scrollableRange) + (scrollbarHeight * decorationOffset);
        
        scrollbarThumb.style.top = `${thumbPosition}px`;
    }

    async function loadChapter(chapterIndex) {
        const chapter = chapters[chapterIndex];
        chapterCatalogue.style.display = 'none';
        bookContent.style.display = 'block';
        
        // Reset the content and add necessary elements
        bookContent.innerHTML = `
            <div id="return-catalogue" class="nav-button">
                <img src="catalogue-icon.png">
            </div>
            <div id="chapter-content" class="chapter-content"></div>
        `;
        
        // Add return to catalogue event listener
        document.getElementById('return-catalogue').addEventListener('click', showCatalogue);
        
        try {
            const response = await fetch(chapter.mdFile);
            if (!response.ok) throw new Error('Chapter not found');
            
            const markdown = await response.text();
            const chapterContent = document.getElementById('chapter-content');
            chapterContent.innerHTML = marked.parse(markdown);
            
            // Make sure scrollbar is visible if not mobile
            const isMobile = window.innerWidth <= 768 || window.innerWidth / window.innerHeight < 1;
            const customScrollbar = document.querySelector('.custom-scrollbar');
            
            if (!isMobile && customScrollbar) {
                customScrollbar.style.display = 'flex';
                
                // Force recalculation of scroll dimensions
                setTimeout(() => {
                    if (bookContent.scrollHeight > bookContent.clientHeight) {
                        initScrollbar();
                        updateScrollbarPosition();
                    } else {
                        customScrollbar.style.display = 'none';
                    }
                }, 100);
            }
            
        } catch (error) {
            console.error('Error loading chapter:', error);
            showError('Chapter not found');
        }
    }

    function showError(errorMessage) {
        bookContent.innerHTML = '<div id="return-catalogue" class="nav-button"><img src="catalogue-icon.png"></div>';
        document.getElementById('return-catalogue').addEventListener('click', showCatalogue);
        const messageElement = document.createElement('div');
        messageElement.textContent = errorMessage;
        messageElement.style.color = 'white';
        messageElement.style.textAlign = 'center';
        messageElement.style.position = 'absolute';
        messageElement.style.top = '50%';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translate(-50%, -50%)';
        messageElement.style.fontSize = '2em';
        messageElement.style.fontFamily = 'Cinzel, serif';
        messageElement.style.width = '80%';  // Add width
        messageElement.style.maxWidth = '600px';  // Add max-width
        bookContent.appendChild(messageElement);
    }

    function showCatalogue() {
        bookContent.style.display = 'none';
        chapterCatalogue.style.display = 'block';
        const customScrollbar = document.querySelector('.custom-scrollbar');
        if (customScrollbar) {
            customScrollbar.style.display = 'none';
        }
    }

    function populateChapters() {
        if (!chapterList) return;
        
        chapterList.innerHTML = '';
        chapters.forEach((chapter, index) => {
            const chapterElement = document.createElement('div');
            chapterElement.className = 'chapter-item';
            chapterElement.textContent = `Chapter ${index + 1}: ${chapter.title}`;
            chapterElement.addEventListener('click', () => loadChapter(index));
            chapterList.appendChild(chapterElement);
        });
    }

    // Event Listeners
    window.addEventListener('resize', () => {
        const isMobile = window.innerWidth <= 768 || window.innerWidth / window.innerHeight < 1;
        const customScrollbar = document.querySelector('.custom-scrollbar');
        if (customScrollbar) {
            customScrollbar.style.display = isMobile ? 'none' : 
                (bookContent.style.display !== 'none' ? 'flex' : 'none');
        }
        if (!isMobile && bookContent.style.display !== 'none') {
            updateScrollbarPosition();
        }
    });

    if (returnHomeBtn) {
        returnHomeBtn.addEventListener('click', () => {
            window.location.href = 'index.html#books';
        });
    }

    // Initialize
    populateChapters();
});