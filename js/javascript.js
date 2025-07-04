document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile - Versão otimizada para dispositivos móveis
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const body = document.body;
    
    if (hamburger && navMenu) {
        let isMenuOpen = false;
        
        const toggleMenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            isMenuOpen = !isMenuOpen;
            hamburger.classList.toggle('active', isMenuOpen);
            navMenu.classList.toggle('active', isMenuOpen);
            body.classList.toggle('menu-open', isMenuOpen);
        };
        
        const closeMenu = () => {
            if (isMenuOpen) {
                isMenuOpen = false;
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            }
        };
        
        // Eventos para o hamburger
        hamburger.addEventListener('click', toggleMenu);
        hamburger.addEventListener('touchstart', (e) => {
            e.preventDefault();
            toggleMenu(e);
        }, { passive: false });
        
        // Fechar menu ao clicar nos links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            const handleLinkClick = (e) => {
                closeMenu();
            };
            
            link.addEventListener('click', handleLinkClick);
            link.addEventListener('touchend', handleLinkClick);
        });
        
        // Fechar menu ao tocar fora
        document.addEventListener('touchstart', (e) => {
            if (isMenuOpen && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Fechar menu ao clicar fora (desktop)
        document.addEventListener('click', (e) => {
            if (isMenuOpen && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Fechar menu ao redimensionar a tela
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        });
        
        // Prevenir scroll quando o menu estiver aberto
        document.addEventListener('touchmove', (e) => {
            if (isMenuOpen && !navMenu.contains(e.target)) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    // Atualizar ano no footer
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Validação do formulário com melhor UX mobile
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Limpar mensagens de erro ao focar nos campos
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                const errorElement = document.getElementById(input.id + 'Error');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
            
            // Validação em tempo real
            input.addEventListener('blur', () => {
                validateField(input);
            });
        });
        
        const validateField = (input) => {
            const errorElement = document.getElementById(input.id + 'Error');
            if (!errorElement) return true;
            
            let isValid = true;
            let errorMessage = '';
            
            if (input.hasAttribute('required') && !input.value.trim()) {
                isValid = false;
                errorMessage = 'Este campo é obrigatório';
            } else if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    errorMessage = 'Por favor, insira um email válido';
                }
            }
            
            if (!isValid) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
            } else {
                errorElement.style.display = 'none';
            }
            
            return isValid;
        };
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isFormValid = true;
            
            // Validar todos os campos
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isFormValid = false;
                }
            });
            
            if (isFormValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                
                submitBtn.disabled = true;
                submitBtn.textContent = 'Enviando...';
                submitBtn.style.opacity = '0.7';
                
                // Simular envio (substituir por form.submit() em produção)
                setTimeout(() => {
                    const successMessage = document.getElementById('successMessage');
                    if (successMessage) {
                        successMessage.style.display = 'block';
                        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                    
                    this.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                    submitBtn.style.opacity = '1';
                    
                    // Para produção, descomente:
                    // this.submit();
                }, 1500);
            } else {
                // Scroll para o primeiro campo com erro
                const firstError = contactForm.querySelector('.error-message[style*="block"]');
                if (firstError) {
                    const fieldWithError = firstError.closest('.form-group');
                    if (fieldWithError) {
                        fieldWithError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                }
            }
        });
    }
    
    // Efeito hover nos cards de habilidades (apenas para desktop)
    if (window.matchMedia('(hover: hover)').matches) {
        const skillCards = document.querySelectorAll('.skill-card');
        skillCards.forEach(card => {
            const icon = card.querySelector('.skill-icon');
            
            if (icon) {
                card.addEventListener('mouseenter', () => {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                });
                
                card.addEventListener('mouseleave', () => {
                    icon.style.transform = 'scale(1) rotate(0)';
                });
            }
        });
    }
    
    // Animação de scroll otimizada
    const animateElements = document.querySelectorAll('[data-anime]');
    
    if (animateElements.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Adicionar um pequeno delay para melhor efeito visual
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, 100);
                    
                    // Parar de observar o elemento após a animação
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        animateElements.forEach(el => {
            observer.observe(el);
        });
    }
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Otimização para dispositivos touch
    if ('ontouchstart' in window) {
        // Adicionar classe para dispositivos touch
        document.body.classList.add('touch-device');
        
        // Melhorar performance em dispositivos móveis
        const cards = document.querySelectorAll('.skill-card, .project-card');
        cards.forEach(card => {
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            card.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Lazy loading para imagens (se necessário)
    const images = document.querySelectorAll('img[data-src]');
    if (images.length > 0) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Prevenção de zoom duplo toque em iOS
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Melhorar performance do scroll
    let ticking = false;
    
    function updateScrollPosition() {
        // Aqui você pode adicionar efeitos baseados no scroll
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollPosition);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
});
