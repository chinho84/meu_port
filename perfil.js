window.addEventListener('load', function() {
    setTimeout(function() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }, 400);
});

const btnTema = document.getElementById('btn-tema');
const btnTemaLateral = document.getElementById('btn-tema-lateral');

function aplicarTema(isDark) {
    document.body.classList.toggle('dark', isDark);
    const emoji = isDark ? '☀️' : '🌙';
    if (btnTema) btnTema.textContent = emoji;
    if (btnTemaLateral) btnTemaLateral.textContent = emoji;
}

function toggleTema() {
    const isDark = !document.body.classList.contains('dark');
    aplicarTema(isDark);
    localStorage.setItem('tema', isDark ? 'dark' : 'light');
}

const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'dark') {
    aplicarTema(true);
}

if (btnTema) btnTema.addEventListener('click', toggleTema);
if (btnTemaLateral) btnTemaLateral.addEventListener('click', toggleTema);

const btnMenu = document.getElementById('btn-menu');
const menuLateral = document.getElementById('menu-lateral');
const fecharMenuBtn = document.getElementById('fechar-menu');
const overlay = document.getElementById('overlay');

function fecharMenu() {
    if (menuLateral) menuLateral.classList.remove('aberto');
    if (overlay) overlay.classList.remove('activo');
}

if (btnMenu && menuLateral && overlay) {
    btnMenu.addEventListener('click', function() {
        menuLateral.classList.add('aberto');
        overlay.classList.add('activo');
    });
    if (fecharMenuBtn) fecharMenuBtn.addEventListener('click', fecharMenu);
    overlay.addEventListener('click', fecharMenu);
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') fecharMenu();
});

const elementos = document.querySelectorAll(
  'article, section h2, .artigo-keywords, .skill-card, .exp-card, .form-card'
);

const observador = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada) {
    if (entrada.isIntersecting) {
      entrada.target.classList.add('visivel');
    }
  });
}, { threshold: 0.1 });

elementos.forEach(function(el) {
  observador.observe(el);
});

const seccoes = document.querySelectorAll('section[id]');
const linksMenu = document.querySelectorAll('nav ul a, .menu-lateral a');

const observadorMenu = new IntersectionObserver(function(entradas) {
  entradas.forEach(function(entrada) {
    if (entrada.isIntersecting) {
      const id = entrada.target.getAttribute('id');
      linksMenu.forEach(function(link) {
        link.classList.toggle('activo', link.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.35 });

seccoes.forEach(function(seccao) {
  observadorMenu.observe(seccao);
});

const formContacto = document.getElementById('form-contacto');
const formAviso = document.getElementById('form-aviso');

if (formContacto) {
  formContacto.addEventListener('submit', function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (!nome || !email || !mensagem) {
      formAviso.hidden = false;
      formAviso.textContent = 'Preenche todos os campos.';
      return;
    }

    const assunto = encodeURIComponent('Contacto do portfólio — ' + nome);
    const corpo = encodeURIComponent(
      'Nome: ' + nome + '\nEmail: ' + email + '\n\n' + mensagem
    );

    window.location.href = 'mailto:inssaagostinho@gmail.com?subject=' + assunto + '&body=' + corpo;

    formAviso.hidden = false;
    formAviso.textContent = 'A abrir o teu email...';
  });
}