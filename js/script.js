    <footer>
        <div class="container">
            <p>&copy; <span id="year"></span> Kauan Lemes. Todos os direitos reservados.</p>
            <a href="https://github.com/Miloco358" aria-label="GitHub" target="_blank">
                <img src="imagens/logo_github.png" alt="GitHub" class="github-logo">
            </a>
        </div>
    </footer>

    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Menu Mobile
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            const toggleMenu = () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.classList.toggle('menu-open', navMenu.classList.contains('active'));
            };
            hamburger.addEventListener('click', toggleMenu);
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                });
            });
            document.addEventListener('click', (e) => {
                if (navMenu.classList.contains('active') && 
                    !navMenu.contains(e.target) && 
                    !hamburger.contains(e.target)) {
                    toggleMenu();
                }
            });
        }

        // Atualizar ano no footer
        const yearElement = document.getElementById('year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }

        // Validação e envio do formulário com AJAX
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                let isValid = true;

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

                const emailInput = document.getElementById('email');
                const emailError = document.getElementById('emailError');
                const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

                if (emailInput.value && !emailRegex.test(emailInput.value)) {
                    emailError.textContent = 'Por favor, insira um email válido';
                    emailError.style.display = 'block';
                    isValid = false;
                }

                if (isValid) {
                    const submitBtn = this.querySelector('button[type="submit"]');
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Enviando...';

                    const formData = new FormData(contactForm);
                    try {
                        const response = await fetch(contactForm.action, {
                            method: 'POST',
                            body: formData,
                            headers: { 'Accept': 'application/json' }
                        });

                        if (response.ok) {
                            contactForm.style.display = 'none';
                            document.getElementById('successMessage').style.display = 'block';
                        } else {
                            alert("Erro ao enviar. Tente novamente mais tarde.");
                        }
                    } catch (error) {
                        alert("Erro de conexão. Tente novamente.");
                    }

                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Enviar Mensagem';
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
    </script>
</body>
</html>
