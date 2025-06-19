function updateYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

function validateContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    const successMessage = document.getElementById('successMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Por favor, insira seu nome';
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameError.style.display = 'none';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Por favor, insira seu email';
            emailError.style.display = 'block';
            isValid = false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Por favor, insira um email válido';
            emailError.style.display = 'block';
            isValid = false;
        } else {
            emailError.style.display = 'none';
        }

        if (subjectInput.value.trim() === '') {
            subjectError.textContent = 'Por favor, insira um assunto';
            subjectError.style.display = 'block';
            isValid = false;
        } else {
            subjectError.style.display = 'none';
        }

        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Por favor, insira sua mensagem';
            messageError.style.display = 'block';
            isValid = false;
        } else {
            messageError.style.display = 'none';
        }

        if (isValid) {
            const formData = {
                name: nameInput.value.trim(),
                email: emailInput.value.trim(),
                subject: subjectInput.value.trim(),
                message: messageInput.value.trim()
            };

            console.log('Formulário enviado:', formData);
            
            form.reset();
            
            successMessage.style.display = 'block';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        }
    });

    nameInput.addEventListener('input', () => {
        if (nameInput.value.trim() !== '') {
            nameError.style.display = 'none';
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.value.trim() !== '') {
            emailError.style.display = 'none';
        }
    });

    subjectInput.addEventListener('input', () => {
        if (subjectInput.value.trim() !== '') {
            subjectError.style.display = 'none';
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.value.trim() !== '') {
            messageError.style.display = 'none';
        }
    });
}

function setupScrollAnimation() {
    const animateElements = document.querySelectorAll('[data-anime]');
    
    if (animateElements.length > 0) {
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        animateElements.forEach(element => {
            animationObserver.observe(element);
        });
    }
}

function setupSkillCardsHover() {
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach(card => {
        const icon = card.querySelector('.skill-icon');
        
        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });
}

function setupProjectButtons() {
    const projectButtons = document.querySelectorAll('.view-project');
    
    projectButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectUrl = button.getAttribute('data-url');
            if (projectUrl) {
                window.open(projectUrl, '_blank');
            }
        });
        
        // Efeito hover nos botões
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = 'none';
        });
    });
}

document.addEventListener('DOMContentLoaded', function() {
    updateYear();
    setupMobileMenu();
    validateContactForm();
    setupScrollAnimation();
    setupSkillCardsHover();
    setupProjectButtons();
});