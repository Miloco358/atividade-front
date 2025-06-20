document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    // Verifica se os elementos existem antes de adicionar event listeners
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(event) {
            // Previne o comportamento padrão do clique, se houver
            event.preventDefault();
            event.stopPropagation(); // Impede a propagação do evento para elementos pais

            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fecha o menu ao clicar em um item do menu
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function(event) {
                // event.preventDefault(); // Comentado para permitir navegação
                // event.stopPropagation(); // Impede a propagação para evitar múltiplos fechamentos

                // Pequeno atraso para garantir que a navegação ocorra após o fechamento visual
                setTimeout(() => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }, 100); // 100ms é geralmente suficiente
            });
        });

        // Fecha o menu se clicar fora dele (apenas para mobile)
        // Isso é útil para quando o usuário abre o menu e toca na área escura do lado
        document.addEventListener('click', function(event) {
            // Verifica se o clique não foi no hamburger e não foi dentro do navMenu
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target) && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Atualizar ano no footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Validação do formulário
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;

            // Validar campos
            document.querySelectorAll('[required]').forEach(input => {
                const errorElement = document.getElementById(input.id + 'Error');
                if (!input.value.trim()) {
                    errorElement.textContent = 'Este campo é obrigatório';
                    errorElement.style.display = 'block';
                    isValid = false;
                } else {
                    errorElement.style.display = 'none';
                }
            });

            // Validar email
            const emailInput = document.getElementById('email');
            const emailError = document.getElementById('emailError');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (emailInput.value && !emailRegex.test(emailInput.value)) {
                emailError.textContent = 'Por favor, insira um email válido';
                emailError.style.display = 'block';
                isValid = false;
            }

            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';

                // Simular envio (substituir por form.submit() em produção)
                setTimeout(() => {
                    document.getElementById('successMessage').style.display = 'block';
                    this.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensagem';

                    // Para produção, descomente:
                    // this.submit();
                }, 1500);
            }
        });
    }

    // Efeito hover nos cards de habilidades
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        const icon = card.querySelector('.skill-icon');

        card.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });

        card.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0)';
        });
    });

    // Animação de scroll
    const animateElements = document.querySelectorAll('[data-anime]');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => observer.observe(el));
});
