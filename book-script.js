document.addEventListener('DOMContentLoaded', function () {
    // DOM Elements
    const scrollbarThumb = document.querySelector('.scrollbar-thumb');
    const scrollbarLine = document.querySelector('.scrollbar-line');
    const customScrollbar = document.querySelector('.custom-scrollbar');
    const bookContent = document.getElementById('book-content');
    const chapterCatalogue = document.getElementById('chapter-catalogue');
    const chapterList = document.getElementById('chapter-list');
    const returnCatalogueBtn = document.getElementById('return-catalogue');
    const returnHomeBtn = document.getElementById('return-home');

    // Constants
    const decorationOffset = 0.05;
    const bookNumber = window.location.pathname.match(/book(\d+)\.html/)[1];

    // Chapter data for each book
    
    const bookChapters = {
        '1': [
            { title: "The Beginning", pdfFile: "vol1/chapter1.pdf" },
            { title: "The Journey", pdfFile: "chapter2.pdf" },
            { title: "The Climax", pdfFile: "chapter3.pdf" },
            { title: "The Resolution", pdfFile: "chapter4.pdf" },
            { title: "The Aftermath", pdfFile: "chapter5.pdf" },
            { title: "The Beginning", pdfFile: "chapter1.pdf" },
            { title: "The Journey", pdfFile: "chapter2.pdf" },
            { title: "The Climax", pdfFile: "chapter3.pdf" },{ title: "The Beginning", pdfFile: "chapter1.pdf" },
            { title: "The Journey", pdfFile: "chapter2.pdf" },
            { title: "The Climax", pdfFile: "chapter3.pdf" },
        ],
        '2': [
            { title: "The Beginning", pdfFile: "chapter1.pdf" },
            { title: "The Journey", pdfFile: "chapter2.pdf" },
            { title: "The Climax", pdfFile: "chapter3.pdf" },
        ],
        '3': [
        ]
    };

    const chapters = bookChapters[bookNumber];

    function populateChapters() {
        chapterList.innerHTML = '';
        chapters.forEach((chapter, index) => {
            const chapterElement = document.createElement('div');
            chapterElement.className = 'chapter-item';
            chapterElement.textContent = `Chapter ${index + 1}: ${chapter.title}`;
            chapterElement.addEventListener('click', () => loadChapter(index));
            chapterList.appendChild(chapterElement);
        });
    }

    function loadChapter(chapterIndex) {
        const chapter = chapters[chapterIndex];
        chapterCatalogue.style.display = 'none';
        bookContent.style.display = 'block';
        bookContent.innerHTML = '<div id="return-catalogue" class="nav-button"><img src="catalogue-icon.png"></div>';
        document.getElementById('return-catalogue').addEventListener('click', showCatalogue);
    
        pdfjsLib.getDocument(chapter.pdfFile).promise.then(function(pdf) {
            const numPages = pdf.numPages;
            let currentPage = 1;
    
            function renderPage(pageNum) {
                pdf.getPage(pageNum).then(function(page) {
                    // Calculate scale to fit window width with some padding
                    const viewport = page.getViewport({ scale: 1.0 });
                    const isMobile = window.innerWidth <= 768 || window.innerWidth / window.innerHeight < 1;
                    
                    // Calculate desired width (different for mobile and desktop)
                    const desiredWidth = isMobile ? 
                        window.innerWidth - 40 : // 20px padding on each side for mobile
                        Math.min(1200, window.innerWidth - 100); // max width for desktop
    
                    // Calculate scale
                    const scale = desiredWidth / viewport.width;
                    const scaledViewport = page.getViewport({ scale: scale });
    
                    // Create canvas
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    canvas.height = scaledViewport.height;
                    canvas.width = scaledViewport.width;
    
                    const renderContext = {
                        canvasContext: context,
                        viewport: scaledViewport
                    };
    
                    // Create a container for the canvas
                    const pageDiv = document.createElement('div');
                    pageDiv.className = 'pdf-page';
                    if (isMobile) {
                        pageDiv.style.margin = '0';
                        pageDiv.style.padding = '10px 0';
                    }
                    
                    // Add some basic hover effect for desktop
                    if (!isMobile) {
                        canvas.style.transition = 'transform 0.3s ease';
                        canvas.addEventListener('mouseenter', () => {
                            canvas.style.transform = 'scale(1.01)';
                        });
                        canvas.addEventListener('mouseleave', () => {
                            canvas.style.transform = 'scale(1)';
                        });
                    }
    
                    pageDiv.appendChild(canvas);
                    bookContent.appendChild(pageDiv);
    
                    page.render(renderContext).promise.then(() => {
                        if (currentPage < numPages) {
                            currentPage++;
                            renderPage(currentPage);
                        } else if (!isMobile) {
                            // Only show scrollbar for desktop
                            showScrollbar();
                        }
                    });
                });
            }
    
            renderPage(currentPage);
        }).catch(function(error) {
            console.error('Error loading PDF:', error);
            bookContent.innerHTML = '<div id="return-catalogue" class="nav-button"><img src="catalogue-icon.png"></div>';
            document.getElementById('return-catalogue').addEventListener('click', showCatalogue);
            const message = document.createElement('div');
            message.textContent = 'Chapter not found';
            message.style.color = 'white';
            message.style.textAlign = 'center';
            message.style.position = 'absolute';
            message.style.top = '50%';
            message.style.left = '50%';
            message.style.transform = 'translate(-50%, -50%)';
            message.style.fontSize = '2em';
            message.style.fontFamily = 'Cinzel, serif'; // Use the custom font
            bookContent.appendChild(message);
        });
    }
    
    // Add this function to handle window resizing
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 768 || window.innerWidth / window.innerHeight < 1;
        const scrollbar = document.querySelector('.custom-scrollbar');
        if (scrollbar) {
            scrollbar.style.display = isMobile ? 'none' : 'flex';
        }
    });

    function showCatalogue() {
        bookContent.style.display = 'none';
        chapterCatalogue.style.display = 'block';
        document.querySelector('.custom-scrollbar').style.display = 'none';
    }

    function showScrollbar() {
        console.log('Showing scrollbar');
        customScrollbar.style.display = 'flex';
        updateScrollbarPosition();
    }

    function hideScrollbar() {
        console.log('Hiding scrollbar');
        customScrollbar.style.display = 'none';
    }

    function updateScrollbarPosition() {
        const scrollPercentage = bookContent.scrollTop / (bookContent.scrollHeight - bookContent.clientHeight);
        const scrollbarHeight = scrollbarLine.clientHeight;
        const thumbHeight = scrollbarThumb.clientHeight;
        const scrollableRange = scrollbarHeight - thumbHeight - (scrollbarHeight * (decorationOffset * 2));
        const thumbPosition = (scrollPercentage * scrollableRange) + (scrollbarHeight * decorationOffset);
        scrollbarThumb.style.top = `${thumbPosition}px`;
    }

    bookContent.addEventListener('scroll', updateScrollbarPosition);

    window.addEventListener('resize', () => {
        if (bookContent.style.display !== 'none') {
            updateScrollbarPosition();
        }
    });

    scrollbarThumb.addEventListener('mousedown', (e) => {
        e.preventDefault();
        const startY = e.clientY - scrollbarThumb.getBoundingClientRect().top;
        const scrollbarRect = scrollbarLine.getBoundingClientRect();

        function onMouseMove(e) {
            const y = e.clientY - scrollbarRect.top - startY;
            const percentage = y / (scrollbarRect.height - scrollbarThumb.offsetHeight);
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
    });

    returnCatalogueBtn.addEventListener('click', showCatalogue);
    returnHomeBtn.addEventListener('click', () => {
        window.location.href = 'index.html#books';
    });

    // Initialize
    populateChapters();
    
    // Add hover effect to chapter items
    document.querySelectorAll('.chapter-item').forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            item.style.setProperty('--mouse-x', `${x}px`);
            item.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    console.log('Script loaded and initialized');
});