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
});