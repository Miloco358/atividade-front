// Função para validar e enviar o formulário
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

    // Validação em tempo real
    nameInput.addEventListener('input', () => validateField(nameInput, nameError, 'Nome'));
    emailInput.addEventListener('input', () => validateEmail());
    subjectInput.addEventListener('input', () => validateField(subjectInput, subjectError, 'Assunto'));
    messageInput.addEventListener('input', () => validateField(messageInput, messageError, 'Mensagem'));

    function validateField(input, errorElement, fieldName) {
        if (input.value.trim() === '') {
            errorElement.textContent = `Por favor, insira ${fieldName.toLowerCase()}`;
            errorElement.style.display = 'block';
            return false;
        }
        errorElement.style.display = 'none';
        return true;
    }

    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Por favor, insira seu email';
            emailError.style.display = 'block';
            return false;
        } else if (!emailRegex.test(emailInput.value)) {
            emailError.textContent = 'Por favor, insira um email válido';
            emailError.style.display = 'block';
            return false;
        }
        emailError.style.display = 'none';
        return true;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateField(nameInput, nameError, 'Nome');
        const isEmailValid = validateEmail();
        const isSubjectValid = validateField(subjectInput, subjectError, 'Assunto');
        const isMessageValid = validateField(messageInput, messageError, 'Mensagem');
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Mostra feedback visual
            successMessage.style.display = 'block';
            form.style.opacity = '0.7';
            
            // Envia o formulário
            form.submit();
            
            // Desabilita o botão para evitar múltiplos envios
            const submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Enviando...';
        }
    });
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    validateContactForm();
    // Outras funções de inicialização...
});
