// Navegação suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 70, // Ajuste para o cabeçalho fixo
            behavior: 'smooth'
        });
    });
});

// Animação das barras de habilidades
function animateSkillBars() {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    skillLevels.forEach(level => {
        const width = level.style.width;
        level.style.width = '0';
        
        setTimeout(() => {
            level.style.width = width;
        }, 300);
    });
}

// Observador de interseção para animar as habilidades quando visíveis
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(skillsSection);
}

// Adicionar classe ativa aos links de navegação durante a rolagem
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 150) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Fechar menu ao clicar em um link (mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (menuToggle) {
                menuToggle.classList.remove('active');
            }
        }
    });
});

// Animação de fade-in para os cards de projetos
const projectCards = document.querySelectorAll('.project-card');

const fadeInOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const fadeInObserver = new IntersectionObserver((entries, fadeInObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('fade-in');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, fadeInOptions);

projectCards.forEach(card => {
    fadeInObserver.observe(card);
});

// Animação para as habilidades interpessoais
const softSkills = document.querySelectorAll('.soft-skill');

const slideInObserver = new IntersectionObserver((entries, slideInObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        } else {
            entry.target.classList.add('slide-in');
            slideInObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

softSkills.forEach(skill => {
    slideInObserver.observe(skill);
});

// Modo escuro (opcional)
const darkModeToggle = document.querySelector('.dark-mode-toggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Salvar preferência do usuário
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
    
    // Verificar preferência salva
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }
}

// Animação de digitação para o texto de introdução (opcional)
const introText = document.querySelector('.intro-text');
if (introText) {
    const text = introText.textContent;
    introText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            introText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    };
    
    // Iniciar animação quando o elemento estiver visível
    const introObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(typeWriter, 500);
                introObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    introObserver.observe(introText);
}
