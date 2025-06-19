function validateContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Configurações do FormSubmit
    form.setAttribute('action', 'https://formsubmit.co/kauannikolaslemes@gmail.com');
    form.setAttribute('method', 'POST');
    
    // Elementos do formulário
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    // Elementos de erro
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');

    // Mensagem de sucesso
    const successMessage = document.getElementById('successMessage');

    // Validação em tempo real
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    subjectInput.addEventListener('input', validateSubject);
    messageInput.addEventListener('input', validateMessage);

    function validateName() {
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Por favor, insira seu nome';
            nameError.style.display = 'block';
            return false;
        }
        nameError.style.display = 'none';
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

    function validateSubject() {
        if (subjectInput.value.trim() === '') {
            subjectError.textContent = 'Por favor, insira um assunto';
            subjectError.style.display = 'block';
            return false;
        }
        subjectError.style.display = 'none';
        return true;
    }

    function validateMessage() {
        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Por favor, insira sua mensagem';
            messageError.style.display = 'block';
            return false;
        }
        messageError.style.display = 'none';
        return true;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isSubjectValid = validateSubject();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
            // Mostra mensagem de sucesso
            successMessage.style.display = 'block';
            
            // Envia o formulário
            form.submit();
            
            // Opcional: Resetar o formulário após 3 segundos
            setTimeout(() => {
                form.reset();
                successMessage.style.display = 'none';
            }, 3000);
        }
    });
}
