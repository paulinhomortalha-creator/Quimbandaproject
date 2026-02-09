// =====================================================
// Quimbanda Congo - JavaScript Principal
// =====================================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // MENU MOBILE TOGGLE
    // =====================================================
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Anima o ícone do menu (transformar em X)
            this.classList.toggle('active');
        });
        
        // Fecha o menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }
    
    // =====================================================
    // SCROLL SUAVE PARA ÂNCORAS
    // =====================================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ignora links vazios (#)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                const offsetTop = targetElement.offsetTop - 80; // 80px para compensar o navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =====================================================
    // ANIMAÇÃO DE FADE-IN AO SCROLL
    // =====================================================
    const fadeElements = document.querySelectorAll('.fade-in-up');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const fadeObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
    
    // =====================================================
    // FORMULÁRIO DE CONTATO
    // =====================================================
    const contatoForm = document.getElementById('contatoForm');
    
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coleta os dados do formulário
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const assunto = document.getElementById('assunto').value;
            const mensagem = document.getElementById('mensagem').value.trim();
            
            // Validação básica
            if (!nome || !email || !telefone || !mensagem) {
                mostrarFeedback('Por favor, preencha todos os campos obrigatórios.', 'erro');
                return;
            }
            
            if (!validarEmail(email)) {
                mostrarFeedback('Por favor, insira um e-mail válido.', 'erro');
                return;
            }
            
            // Prepara mensagem para WhatsApp
            const mensagemWhatsApp = `*Nova Mensagem do Site*\n\n` +
                `*Nome:* ${nome}\n` +
                `*E-mail:* ${email}\n` +
                `*Telefone:* ${telefone}\n` +
                `*Assunto:* ${getAssuntoTexto(assunto)}\n\n` +
                `*Mensagem:*\n${mensagem}`;
            
            // Codifica a mensagem para URL
            const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
            
            // Abre WhatsApp com a mensagem
            const urlWhatsApp = `https://wa.me/5515996732324?text=${mensagemCodificada}`;
            window.open(urlWhatsApp, '_blank');
            
            // Mostra feedback de sucesso
            mostrarFeedback('Redirecionando para o WhatsApp... Envie a mensagem por lá!', 'sucesso');
            
            // Limpa o formulário após 2 segundos
            setTimeout(() => {
                contatoForm.reset();
            }, 2000);
        });
    }
    
    // =====================================================
    // FUNÇÕES AUXILIARES
    // =====================================================
    
    /**
     * Valida formato de e-mail
     */
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    /**
     * Converte o valor do assunto para texto legível
     */
    function getAssuntoTexto(valor) {
        const assuntos = {
            'consulta': 'Consulta ao Oráculo',
            'amoroso': 'Trabalho Amoroso',
            'protecao': 'Trabalho de Proteção',
            'outros': 'Outros Trabalhos',
            'duvidas': 'Dúvidas Gerais'
        };
        return assuntos[valor] || valor;
    }
    
    /**
     * Mostra feedback visual do formulário
     */
    function mostrarFeedback(mensagem, tipo) {
        const feedback = document.getElementById('formFeedback');
        const feedbackMessage = document.getElementById('feedbackMessage');
        
        if (feedback && feedbackMessage) {
            feedbackMessage.textContent = mensagem;
            feedback.style.display = 'block';
            
            // Ajusta a cor baseado no tipo
            if (tipo === 'erro') {
                feedback.style.background = 'rgba(220, 20, 60, 0.3)';
                feedback.style.borderColor = '#DC143C';
            } else {
                feedback.style.background = 'rgba(0, 200, 0, 0.2)';
                feedback.style.borderColor = '#00C800';
            }
            
            // Rola para o feedback
            feedback.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Esconde automaticamente após 5 segundos
            setTimeout(() => {
                feedback.style.display = 'none';
            }, 5000);
        }
    }
    
    // =====================================================
    // EFEITO DE PARALLAX NO HERO
    // =====================================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            const heroContent = hero.querySelector('.container');
            
            if (heroContent && scrollPosition < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                heroContent.style.opacity = 1 - (scrollPosition / (hero.offsetHeight * 0.8));
            }
        });
    }
    
    // =====================================================
    // MÁSCARA DE TELEFONE
    // =====================================================
    const telefoneInput = document.getElementById('telefone');
    
    if (telefoneInput) {
        telefoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length <= 11) {
                value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                value = value.replace(/(\d)(\d{4})$/, '$1-$2');
            }
            
            e.target.value = value;
        });
    }
    
    // =====================================================
    // ANIMAÇÃO DO BOTÃO WHATSAPP
    // =====================================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        // Adiciona pulso no botão a cada 5 segundos
        setInterval(() => {
            whatsappFloat.style.animation = 'none';
            setTimeout(() => {
                whatsappFloat.style.animation = 'float 3s ease-in-out infinite';
            }, 10);
        }, 5000);
    }
    
    // =====================================================
    // DETECÇÃO DE SCROLL PARA NAVBAR
    // =====================================================
    const navbar = document.querySelector('nav');
    let lastScroll = 0;
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            // Adiciona sombra ao navbar quando rolar
            if (currentScroll > 50) {
                navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.8)';
            } else {
                navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // =====================================================
    // CONSOLE LOG MÍSTICO
    // =====================================================
    console.log('%c⛧ QUIMBANDA CONGO ⛧', 'color: #DC143C; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);');
    console.log('%cSite desenvolvido com respeito às tradições ancestrais', 'color: #f5f5f5; font-size: 12px;');
    
});
