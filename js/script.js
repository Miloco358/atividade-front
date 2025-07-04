document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile - Versão otimizada para Android
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
            document.addEventListener('DOMContentLoaded', function () {
                const hamburger = document.querySelector('.hamburger');
                const navMenu = document.querySelector('.nav-menu');
            
                if (hamburger && navMenu) {
                    // Alterna visibilidade do menu e bloqueia o scroll
                    const toggleMenu = () => {
                        hamburger.classList.toggle('active');
                        navMenu.classList.toggle('active');
            
                        if (navMenu.classList.contains('active')) {
                            document.body.classList.add('menu-open');
                        } else {
                            document.body.classList.remove('menu-open');
                        }
                    };
            
                    // Clica no botão hambúrguer → abre/fecha menu
                    hamburger.addEventListener('click', toggleMenu);
            
                    // Clica em um link → fecha o menu
                    document.querySelectorAll('.nav-menu a').forEach(link => {
                        link.addEventListener('click', () => {
                            hamburger.classList.remove('active');
                            navMenu.classList.remove('active');
                            document.body.classList.remove('menu-open');
                        });
                    });
                } else {
                    console.log('hamburger ou navMenu não encontrados');
                }
            });
            link.addEventListener('touchend', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
        
        // Fechar menu ao tocar fora (para Android)
        document.addEventListener('touchstart', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
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
