document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for sidebar links
    const sidebarLinks = document.querySelectorAll('.nav-links a');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Highlight active link on scroll
    const sections = document.querySelectorAll('.doc-section');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            // Offset a bit to trigger earlier
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
