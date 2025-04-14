const produtos = [
    { nome: 'Maçã', preco: 3.00, categoria: 'frutas', imagem: '' },
    { nome: 'Morango', preco: 5.00, categoria: 'frutas', imagem: '' },
    { nome: 'Goiaba', preco: 4.00, categoria: 'frutas', imagem: '' },
    { nome: 'Tomate', preco: 6.00, categoria: 'verduras', imagem: 'tomate.jpg' },
    { nome: 'Alface', preco: 2.50, categoria: 'verduras', imagem: '' },
    { nome: 'Pão', preco: 4.00, categoria: 'artesanais', imagem: '' },
    { nome: 'Doce de leite', preco: 10.00, categoria: 'artesanais', imagem: '' }
  ];
  
  let carrinho = [];
  
  function renderizarProdutos() {
    produtos.forEach((p, index) => {
      const categoriaDiv = document.getElementById(p.categoria);
      if (!categoriaDiv) return; // segurança para evitar erros
      categoriaDiv.innerHTML += `
        <div class="col">
          <div class="card h-100">
            <img src="${p.imagem || 'https://via.placeholder.com/150'}" class="card-img-top produto-img" alt="${p.nome}">
            <div class="card-body">
              <h5 class="card-title">${p.nome}</h5>
              <p class="card-text">R$ ${p.preco.toFixed(2)}</p>
              <div class="input-group mb-2">
                <button class="btn btn-outline-secondary" onclick="alterarQuantidade(${index}, -1)">-</button>
                <input type="number" id="qtd-${index}" class="form-control text-center" value="1" min="1">
                <button class="btn btn-outline-secondary" onclick="alterarQuantidade(${index}, 1)">+</button>
              </div>
              <button class="btn btn-primary w-100" onclick="adicionarCarrinho(${index})">Adicionar ao Carrinho</button>
            </div>
          </div>
        </div>`;
    });
  }
  
  function alterarQuantidade(index, delta) {
    const input = document.getElementById(`qtd-${index}`);
    let valor = parseInt(input.value);
    valor = isNaN(valor) ? 1 : valor + delta;
    input.value = Math.max(1, valor);
  }
  
  function adicionarCarrinho(index) {
    const qtd = parseInt(document.getElementById(`qtd-${index}`).value);
    const item = produtos[index];
    const existente = carrinho.find(p => p.nome === item.nome);
    if (existente) {
      existente.quantidade += qtd;
    } else {
      carrinho.push({ nome: item.nome, preco: item.preco, quantidade: qtd });
    }
    atualizarCarrinho();
  }
  
  function atualizarCarrinho() {
    const div = document.getElementById('carrinho');
    div.innerHTML = '';
    let total = 0;
    carrinho.forEach(item => {
      const subtotal = item.preco * item.quantidade;
      total += subtotal;
      div.innerHTML += `<p>${item.nome} - ${item.quantidade} x R$ ${item.preco.toFixed(2)} = R$ ${subtotal.toFixed(2)}</p>`;
    });
    div.innerHTML += `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    const msg = carrinho.map(item => `- ${item.quantidade}x ${item.nome}`).join('%0A');
    document.getElementById('btnWhatsapp').href = `https://wa.me/5543998100215?text=Olá%2C%20gostaria%20de%20fazer%20um%20pedido:%0A${msg}`;
  }
  
  function finalizarCompraSite() {
    alert('Compra finalizada com sucesso! (Simulação)');
    carrinho = [];
    atualizarCarrinho();
  }
  
  function alternarCarrinho() {
    const painel = document.getElementById('painelCarrinho');
    painel.style.display = (painel.style.display === 'none' || painel.style.display === '') ? 'block' : 'none';
  }
  
  function rolarPara(id) {
    const destino = document.getElementById(id);
    destino.scrollIntoView({ behavior: 'smooth' });
  }
  
  document.addEventListener('DOMContentLoaded', renderizarProdutos);
  