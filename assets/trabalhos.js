// Filtro de categorias
  document.querySelectorAll('.filtro-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
      this.classList.add('ativo');
      const filtro = this.dataset.filtro;
      document.querySelectorAll('.projeto-card').forEach(card => {
        if (filtro === 'todos' || card.dataset.categoria === filtro) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
