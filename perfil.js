// LOADING AUTOMÁTICO
window.addEventListener('load', function() {
    setTimeout(function() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }, 1000); // 1 segundo de loading
});

// MODO CLARO / ESCURO
const btnTema = document.getElementById('btn-tema');
const btnTemaLateral = document.getElementById('btn-tema-lateral');

function toggleTema() {
  document.body.classList.toggle('dark');

  const isDark = document.body.classList.contains('dark');
  const emoji = isDark ? '☀️' : '🌙';

  if (btnTema) btnTema.textContent = emoji;
  if (btnTemaLateral) btnTemaLateral.textContent = emoji;
}

if (btnTema) {
  btnTema.addEventListener('click', toggleTema);
}

if (btnTemaLateral) {
  btnTemaLateral.addEventListener('click', toggleTema);
}

// MENU LATERAL
const btnMenu = document.getElementById('btn-menu');
const menuLateral = document.getElementById('menu-lateral');
const fecharMenuBtn = document.getElementById('fechar-menu');
const overlay = document.getElementById('overlay');

if (btnMenu && menuLateral && overlay) {
  btnMenu.addEventListener('click', function() {
    menuLateral.classList.add('aberto');
    overlay.classList.add('activo');
  });

  if (fecharMenuBtn) {
    fecharMenuBtn.addEventListener('click', fecharMenu);
  }

  overlay.addEventListener('click', fecharMenu);
}

function fecharMenu() {
  if (menuLateral) {
    menuLateral.classList.remove('aberto');
  }
  if (overlay) {
    overlay.classList.remove('activo');
  }
}

// ANIMAÇÕES AO FAZER SCROLL
const elementos = document.querySelectorAll('article, section h2, .artigo-keywords');

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