document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle');
    const mainStyle = document.getElementById('main-style');
    const toggleBtn = document.getElementById('toggle-section-btn');
    const sectionToHide = document.getElementById('section-to-hide');

    if (themeBtn && mainStyle) {
        themeBtn.onclick = () => {
            if (mainStyle.getAttribute('href').includes('red.css')) {
                mainStyle.setAttribute('href', 'green.css');
                themeBtn.style.backgroundColor = '#2e8b57';
            } else {
                mainStyle.setAttribute('href', 'red.css');
                themeBtn.style.backgroundColor = '#dc2626';
            }
        };
    }

    if (toggleBtn && sectionToHide) {
        toggleBtn.onclick = () => {
            if (sectionToHide.style.display === 'none') {
                sectionToHide.style.display = 'block';
                toggleBtn.textContent = 'Ukryj sekcję';
            } else {
                sectionToHide.style.display = 'none';
                toggleBtn.textContent = 'Pokaż sekcję';
            }
        };
    }
});