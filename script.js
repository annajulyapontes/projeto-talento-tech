import { auth, db, salvarPedidoFirestore } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

console.log("Script.js carregado com sucesso");

const produtos = [
  { nome: 'Maçã', preco: 13.98, categoria: 'frutas', imagem: 'img/maça.jpg', unidade: 'kg' },
  { nome: 'Laranja', preco: 6.98, categoria: 'frutas', imagem: 'img/laranja.jpg', unidade: 'kg' },
  { nome: 'Caqui', preco: 9.98, categoria: 'frutas', imagem: 'img/caqui.jpg', unidade: 'kg' },
  { nome: 'Manga', preco: 9.98, categoria: 'frutas', imagem: 'img/manga.jpg', unidade: 'kg' },
  { nome: 'Abacaxi', preco: 8.98, categoria: 'frutas', imagem: 'img/abacaxi.jpg', unidade: 'un' },
  { nome: 'Pepino', preco: 5.98, categoria: 'verduras', imagem: 'img/pepino.jpg', unidade: 'kg' },
  { nome: 'Pepino Japonês', preco: 5.98, categoria: 'verduras', imagem: 'img/pepino japonês.jpg', unidade: 'kg' },
  { nome: 'Pitaya', preco: 16.98, categoria: 'frutas', imagem: 'img/pitaya.jpg', unidade: 'kg' },
  { nome: 'Ponkan', preco: 5.98, categoria: 'frutas', imagem: 'img/ponkan.jpg', unidade: 'kg' },
  { nome: 'Goiaba', preco: 4.00, categoria: 'frutas', imagem: 'img/goiaba.jpg', unidade: 'kg' },
  { nome: 'Limão', preco: 5.50, categoria: 'frutas', imagem: 'img/limão.jpg', unidade: 'kg' },
  { nome: 'Tomate', preco: 9.98, categoria: 'verduras', imagem: 'img/tomate.jpg', unidade: 'kg' },

  { nome: 'Alface', preco: 2.50, categoria: 'verduras', imagem: '', unidade: 'kg' },

  { nome: 'Chuchu', preco: 6.98, categoria: 'verduras', imagem: 'img/chuchu.jpg', unidade: 'kg' },
  { nome: 'Inhame', preco: 9.98, categoria: 'verduras', imagem: 'img/inhame.jpg', unidade: 'kg' },
  { nome: 'Beterraba', preco: 5.98, categoria: 'verduras', imagem: 'img/beterraba.jpg', unidade: 'kg' },
  { nome: 'Cebola', preco: 3.98, categoria: 'verduras', imagem: 'img/cebola.jpg', unidade: 'kg' },
  { nome: 'Repolho', preco: 3.98, categoria: 'verduras', imagem: 'img/repolho.jpg', unidade: 'kg' },
  { nome: 'Batata', preco: 7.98, categoria: 'verduras', imagem: 'img/batata.jpg', unidade: 'kg' },
  { nome: 'Cenoura', preco: 5.98, categoria: 'verduras', imagem: 'img/cenoura.jpg', unidade: 'kg' },

  { nome: 'Pão', preco: 4.00, categoria: 'artesanais', imagem: '', unidade: 'un' },
  { nome: 'Doce de leite', preco: 10.00, categoria: 'artesanais', imagem: '', unidade: 'un' },
  { nome: 'Maracujá', preco: 5.98, categoria: 'frutas', imagem: 'img/maracuja.jpg', unidade: 'kg' },
  { nome: 'Acerola', preco: 5.98, categoria: 'frutas', imagem: 'img/acerola.jpg', unidade: 'kg' },
  { nome: 'Bolo Red Velvet', preco: 35, categoria: 'artesanais', imagem: 'img/bolo red velvet.jpg', unidade: 'un' },
  { nome: 'Bolo de Cenoura com cobertura de chocolate', preco: 35, categoria: 'artesanais', imagem: 'img/bolo de cenoura com cobertura de chocolate.jpg', unidade: 'un' },
  { nome: 'Bolo de Limão', preco: 35, categoria: 'artesanais', imagem: 'img/bolo de limão.jpg', unidade: 'un' },
  { nome: 'Bolo', preco: 35, categoria: 'artesanais', imagem: 'img/bolo.jpg', unidade: 'un' },
  { nome: 'Brigadeiro Cremoso', preco: 5.98, categoria: 'artesanais', imagem: 'img/brigadeiro cremoso.jpg', unidade: 'un' },
  { nome: 'Pé de Moça Cremoso', preco: 5.98, categoria: 'artesanais', imagem: 'img/pé de moça cremoso.jpg', unidade: 'un' },
  { nome: 'Doce de Abóbora', preco: 5.98, categoria: 'artesanais', imagem: 'img/doce de abobora.jpg', unidade: '200g' },
  { nome: 'Uva', preco: 5.98, categoria: 'frutas', imagem: 'img/uva.jpg', unidade: 'kg' },
  { nome: 'Morango', preco: 5.98, categoria: 'frutas', imagem: 'img/morango.jpg', unidade: 'kg' },
  { nome: 'Pera', preco: 5.98, categoria: 'frutas', imagem: 'img/pera.jpg', unidade: 'kg' },
  { nome: 'Quiabo', preco: 5.98, categoria: 'verduras', imagem: 'img/quiabo.jpg', unidade: 'kg' },
  { nome: 'Melancia Inteira', preco: 5.98, categoria: 'frutas', imagem: 'img/melancia inteira.jpg', unidade: 'un' },
  { nome: '1/4 da Melancia', preco: 5.98, categoria: 'frutas', imagem: 'img/melancia 1 parte.jpg', unidade: 'un' },
  { nome: 'Berinjela', preco: 4.00, categoria: 'verduras', imagem: 'img/berinjela.jpg', unidade: 'kg' },
  { nome: 'Coco', preco: 4.00, categoria: 'frutas', imagem: 'img/coco.jpg', unidade: 'kg' },
  { nome: 'Abobrinha', preco: 4.00, categoria: 'verduras', imagem: 'img/abobrinha.jpg', unidade: 'kg' },
  { nome: 'Alho', preco: 4.00, categoria: 'verduras', imagem: 'img/alho.jpg', unidade: 'kg' },
  { nome: 'Banana', preco: 4.00, categoria: 'frutas', imagem: 'img/banana.jpg', unidade: 'kg' },
];

let carrinho = [];

function renderizarProdutos() {
  console.log("Função renderizarProdutos chamada");
  produtos.forEach((p, index) => {
    const categoriaDiv = document.getElementById(p.categoria);
    if (!categoriaDiv) return;

    categoriaDiv.innerHTML += `
      <div class="col">
        <div class="card h-100">
          <img src="${p.imagem || 'https://via.placeholder.com/150'}" class="card-img-top produto-img" alt="${p.nome}">
          <div class="card-body">
            <h5 class="card-title">${p.nome}</h5>
            <p class="card-text">
              R$ ${p.preco.toFixed(2)} <span class="unidade">${p.unidade || 'kg'}</span>
            </p>
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
  console.log('Adicionando produto ao carrinho:', produtos[index]);

  const qtd = parseInt(document.getElementById(`qtd-${index}`).value);
  const item = produtos[index];
  const existente = carrinho.find(p => p.nome === item.nome);

  if (existente) {
    existente.quantidade += qtd;
  } else {
    carrinho.push({
      nome: item.nome,
      preco: item.preco,
      imagem: item.imagem,
      unidade: item.unidade,
      quantidade: qtd
    });
  }

  atualizarCarrinho();
}


function atualizarCarrinho() {
  const div = document.getElementById('listaCarrinho');
  div.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;

div.innerHTML += `
  <div class="item-carrinho">
    <button class="remove-btn" onclick="removerItemCarrinho(${index})">&times;</button>
    <img src="${item.imagem || 'https://via.placeholder.com/60'}" alt="${item.nome}">
    
    <div class="item-carrinho-conteudo">
      <div class="item-carrinho-info">
        <h6>${item.nome}</h6>
        <p>${item.quantidade} x R$ ${item.preco.toFixed(2)}</p>
      </div>
      <div class="item-carrinho-controls">
        <button onclick="alterarQuantidadeCarrinho(${index}, -1)">−</button>
        <span>${item.quantidade}</span>
        <button onclick="alterarQuantidadeCarrinho(${index}, 1)">+</button>
      </div>
    </div>
  </div>`;

  
  });

  document.getElementById('valorTotal').innerText = `R$ ${total.toFixed(2)}`;
  const msg = carrinho.map(item => `- ${item.quantidade}x ${item.nome}`).join('%0A');
  document.getElementById('btnWhatsapp').href =
    `https://wa.me/5543998100215?text=Olá%2C%20gostaria%20de%20fazer%20um%20pedido:%0A${msg}`;
}


function alterarQuantidadeCarrinho(index, delta) {
  let item = carrinho[index];
  item.quantidade += delta;
  if (item.quantidade < 1) item.quantidade = 1;
  atualizarCarrinho();
}

function removerItemCarrinho(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

async function finalizarCompraSite() {
  const user = auth.currentUser;

  if (!user) {
    alert("Você precisa estar logado para finalizar a compra.");
    window.location.href = "login.html";
    return;
  }

  const total = carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  const pedido = {
    data: new Date().toISOString(),
    total: total,
    itens: carrinho.map(item => ({
      nome: item.nome,
      quantidade: item.quantidade,
      preco: item.preco,
      imagem: item.imagem,
      unidade: item.unidade
    }))
  };

  try {
    await salvarPedidoFirestore(pedido); // salva no Firestore
    document.getElementById("valorPixModal").innerText = `R$ ${total.toFixed(2)}`;
    const modal = new bootstrap.Modal(document.getElementById('modalPix'));
    modal.show();
    carrinho = [];
    atualizarCarrinho();
  } catch (error) {
    console.error("Erro ao salvar pedido:", error);
    alert("Erro ao registrar o pedido. Tente novamente.");
  }
}

async function finalizarCompraWhatsapp() {
  // Garante que o usuário está logado
  const user = auth.currentUser;

  if (!user) {
    alert("Você precisa estar logado para finalizar a compra.");
    window.location.href = "login.html";
    return;
  }

  // Prepara o pedido
  const pedido = {
    data: new Date().toISOString(),
    total: carrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0),
    itens: carrinho.map(item => ({
      nome: item.nome,
      quantidade: item.quantidade,
      preco: item.preco,
      imagem: item.imagem,
      unidade: item.unidade
    }))
  };

  try {
    // Salva no Firestore
    await salvarPedidoFirestore(pedido);
    console.log("Pedido salvo com sucesso no Firebase (WhatsApp)");

    // Monta a mensagem do WhatsApp
    const msg = pedido.itens.map(i => `- ${i.quantidade}x ${i.nome}`).join('%0A');
    const total = pedido.total.toFixed(2).replace('.', ',');
    const url = `https://wa.me/5543998100215?text=Olá%2C%20gostaria%20de%20fazer%20um%20pedido:%0A${msg}%0ATotal:%20R$%20${total}`;

    // Limpa o carrinho
    carrinho = [];
    atualizarCarrinho();

    // Abre o WhatsApp
    window.open(url, '_blank');
  } catch (error) {
    console.error("Erro ao salvar o pedido:", error);
    alert("Erro ao salvar o pedido. Tente novamente.");
  }
}


function alternarCarrinho() {
  const painel = document.getElementById('painelCarrinho');
  painel.style.display = (painel.style.display === 'none' || painel.style.display === '') ? 'block' : 'none';
}

function rolarPara(id) {
  const destino = document.getElementById(id);
  destino.scrollIntoView({ behavior: 'smooth' });
}

document.addEventListener('DOMContentLoaded', function () {
  const btnLogin = document.getElementById('btnLogin');
if (btnLogin) {
  btnLogin.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
}

  renderizarProdutos();

  // Categorias
  document.querySelectorAll('.categoria-link').forEach(link => {
    link.addEventListener('click', function () {
      document.querySelectorAll('.categoria-link').forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Busca
  const lupaBtn = document.getElementById('btnLupa');
  const campoBusca = document.getElementById('campoBusca');
  if (lupaBtn && campoBusca) {
    lupaBtn.addEventListener('click', () => {
      campoBusca.classList.toggle('d-none');
      campoBusca.focus();
    });

    campoBusca.addEventListener('input', function (e) {
      const termo = e.target.value.toLowerCase();
      document.querySelectorAll('.card').forEach(card => {
        const titulo = card.querySelector('.card-title').textContent.toLowerCase();
        card.style.display = titulo.includes(termo) ? 'block' : 'none';
      });
    });
  }

  // Carrinho
  const btnCarrinho = document.getElementById('btnCarrinho');
  if (btnCarrinho) {
    btnCarrinho.addEventListener('click', () => {
      alternarCarrinho();
    });
  }

  // Menu lateral
  const abrirMenu = document.getElementById('abrirMenu');
  if (abrirMenu) {
    abrirMenu.addEventListener('click', function () {
      const menu = new bootstrap.Offcanvas(document.getElementById('menuLateral'));
      menu.show();
    });
  }
});

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

onAuthStateChanged(auth, (user) => {
  const btnLogin = document.getElementById('btnLogin');
  const btnPedidos = document.querySelector('a[href="login.html"]');

  if (user) {
    // Mostrar email e mudar link do botão de Pedidos
    if (btnLogin) {
      btnLogin.innerHTML = `<i class="bi bi-person-circle me-1"></i> <span class="email-pequeno">${user.email}</span>`;
    }
    if (btnPedidos) {
      btnPedidos.href = "pedidos.html"; // redireciona corretamente
    }
  } else {
    // Redireciona para login se estiver na pedidos.html
    if (window.location.pathname.includes("pedidos.html")) {
      window.location.href = "login.html";
    }
  }
});

window.copiarCodigoPix = function () {
  const textarea = document.getElementById("codigoPix");
  navigator.clipboard.writeText(textarea.value)
    .then(() => {
      const toast = document.getElementById("toastPix");
      toast.style.display = "block";
      setTimeout(() => {
        toast.style.display = "none";
      }, 2500); // duração do toast
    })
    .catch(err => {
      console.error("Erro ao copiar:", err);
    });
}


// Torna as funções disponíveis globalmente
window.adicionarCarrinho = adicionarCarrinho;
window.alterarQuantidade = alterarQuantidade;
window.atualizarCarrinho = atualizarCarrinho;
window.alterarQuantidadeCarrinho = alterarQuantidadeCarrinho;
window.removerItemCarrinho = removerItemCarrinho;
window.finalizarCompraSite = finalizarCompraSite;
window.alternarCarrinho = alternarCarrinho;
window.finalizarCompraWhatsapp = finalizarCompraWhatsapp;
