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

    const form = document.getElementById('feedback-form');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            const fields = [
                { id: 'name', errId: 'name-error', label: 'Imię' },
                { id: 'surname', errId: 'surname-error', label: 'Nazwisko' },
                { id: 'email', errId: 'email-error', label: 'E-mail' },
                { id: 'message', errId: 'message-error', label: 'Wiadomość' }
            ];

            fields.forEach(field => {
                const input = document.getElementById(field.id);
                const errorSpan = document.getElementById(field.errId);
                const val = input.value.trim();
                
                input.classList.remove('invalid');
                errorSpan.textContent = "";

                if (!val) {
                    errorSpan.textContent = "Pole " + field.label + " jest wymagane.";
                    input.classList.add('invalid');
                    isValid = false;
                } 
                else if ((field.id === 'name' || field.id === 'surname') && /\d/.test(val)) {
                    errorSpan.textContent = field.label + " nie może zawierać cyfr.";
                    input.classList.add('invalid');
                    isValid = false;
                }
                else if (field.id === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(val)) {
                        errorSpan.textContent = "Wprowadź poprawny adres e-mail.";
                        input.classList.add('invalid');
                        isValid = false;
                    }
                }
                else if (field.id === 'message' && val.length < 10) {
                    errorSpan.textContent = "Wiadomość musi mieć min. 10 znaków.";
                    input.classList.add('invalid');
                    isValid = false;
                }
            });

            if (isValid) {
                successMsg.style.display = 'block';
                form.reset();
                setTimeout(() => { successMsg.style.display = 'none'; }, 5000);
            }
        });
    }

    async function loadJsonData() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`Błąd sieci: ${response.status}`);
            }

            const data = await response.json();
            populateSkills(data.skills);
            populateProjects(data.projects);
        } catch (error) {
            console.error('Nie udało się wczytać danych JSON:', error);
        }
    }

    function populateSkills(skills) {
        const skillsList = document.getElementById('skills-list');
        if (!skillsList || !Array.isArray(skills)) return;

        skillsList.innerHTML = '';
        skills.forEach(skill => {
            const li = document.createElement('li');
            li.textContent = skill;
            skillsList.appendChild(li);
        });
    }

    function populateProjects(projects) {
        const projectsList = document.getElementById('projects-list');
        if (!projectsList || !Array.isArray(projects)) return;

        projectsList.innerHTML = '';
        projects.forEach(project => {
            const article = document.createElement('article');
            article.className = 'job';

            const title = document.createElement('h3');
            title.textContent = project.title;
            article.appendChild(title);

            const desc = document.createElement('p');
            desc.textContent = project.description;
            article.appendChild(desc);

            if (project.link) {
                const link = document.createElement('a');
                link.href = project.link;
                link.textContent = 'Zobacz projekt';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                article.appendChild(link);
            }

            projectsList.appendChild(article);
        });
    }

    loadJsonData();
});