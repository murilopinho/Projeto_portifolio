/* ── E-MAIL ANTI-SCRAPING: montado via JS, nunca no HTML estático ── */
  (function mountEmail() {
    const u = 'mmurilo.pinho';
    const d = 'gmail.com';
    const addr = u + '@' + d;
    const channel = document.getElementById('email-channel');
    const display = document.getElementById('email-display');
    const footer  = document.getElementById('footer-email');
    if (channel) channel.href = 'mailto:' + addr;
    if (display) display.textContent = addr;
    if (footer)  { footer.href = 'mailto:' + addr; footer.textContent = 'E-mail'; }
  })();

  /* ── CONTADOR DE CARACTERES DA TEXTAREA ── */
  (function initCharCount() {
    const ta    = document.getElementById('mensagem');
    const count = document.getElementById('char-count');
    if (!ta || !count) return;
    ta.addEventListener('input', () => {
      const len = ta.value.length;
      count.textContent = len + ' / 500';
      count.classList.toggle('warn', len > 400);
    });
  })();

  /* ── FORMULÁRIO COM VALIDAÇÃO REAL ── */
  document.getElementById('contato-form').addEventListener('submit', function(e) {
    e.preventDefault();

    /* Honeypot: se preenchido, é bot — abandonar silenciosamente */
    if (document.getElementById('honeypot').value) return;

    const nome     = document.getElementById('nome').value.trim();
    const empresa  = document.getElementById('empresa').value.trim();
    const email    = document.getElementById('email').value.trim();
    const whatsapp = document.getElementById('whatsapp').value.trim();
    const servico  = document.getElementById('servico').value;
    const mensagem = document.getElementById('mensagem').value.trim();

    /* Limpar estados de erro anteriores */
    ['nome','email'].forEach(id => {
      document.getElementById(id).classList.remove('invalid');
    });
    document.getElementById('erro-nome').classList.remove('show');
    document.getElementById('erro-email').classList.remove('show');

    let valid = true;

    /* Validação: nome obrigatório */
    if (!nome) {
      document.getElementById('nome').classList.add('invalid');
      document.getElementById('erro-nome').classList.add('show');
      valid = false;
    }

    /* Validação: email real (regex RFC5322 simplificado) */
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById('email').classList.add('invalid');
      document.getElementById('erro-email').classList.add('show');
      valid = false;
    }

    if (!valid) return;

    /* Sanitização: remover tags HTML antes de montar a mensagem */
    const strip = str => str.replace(/[<>"'&]/g, '').slice(0, 500);

    const texto = encodeURIComponent(
      'Olá Murilo! Me chamo ' + strip(nome) +
      (empresa ? ' — ' + strip(empresa) : '') + '.\n\n' +
      'E-mail: ' + email + '\n' +
      (whatsapp ? 'WA: ' + whatsapp + '\n' : '') +
      (servico  ? 'Assunto: ' + servico + '\n' : '') +
      (mensagem ? '\n' + strip(mensagem) : '')
    );

    /* Desabilitar botão para evitar double-submit */
    const btn = document.getElementById('btn-submit');
    btn.disabled = true;
    btn.textContent = 'Abrindo WhatsApp...';

    window.open('https://wa.me/5561998332564?text=' + texto, '_blank');

    /* Mostrar tela de sucesso */
    this.style.display = 'none';
    document.getElementById('form-success').classList.add('show');
  });
