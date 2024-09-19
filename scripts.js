document.addEventListener('DOMContentLoaded', () => {
    const scrollSections = [
        { container: '.projects-container', content: '.projects-content' },
        { container: '.certificates-container', content: '.certificates-content' }
    ];

    scrollSections.forEach(({ container, content }) => {
        const prevBtn = document.querySelector(`${container} .scroll-btn.prev`);
        const nextBtn = document.querySelector(`${container} .scroll-btn.next`);
        const contentElement = document.querySelector(content);

        if (!prevBtn || !nextBtn || !contentElement) return;

        let scrollAmount = 0;
        const scrollStep = 300; // Adjust to the width of the visible area

        nextBtn.addEventListener('click', () => {
            scrollAmount += scrollStep;
            if (scrollAmount > contentElement.scrollWidth - contentElement.clientWidth) {
                scrollAmount = contentElement.scrollWidth - contentElement.clientWidth;
            }
            contentElement.style.transform = `translateX(-${scrollAmount}px)`;
        });

        prevBtn.addEventListener('click', () => {
            scrollAmount -= scrollStep;
            if (scrollAmount < 0) {
                scrollAmount = 0;
            }
            contentElement.style.transform = `translateX(-${scrollAmount}px)`;
        });
    });
});
