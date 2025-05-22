function salvarPedidoFirestore(pedido) {
  const user = firebase.auth().currentUser;
  if (user) {
    const db = firebase.firestore();
    db.collection("pedidos").add({
      uid: user.uid,
      email: user.email,
      data: new Date(),
      itens: pedido
    }).then(() => {
      mostrarToastPixLike("Pedido salvo no Firestore!", "#1D2D44");
    }).catch((error) => {
      mostrarToastPixLike("Erro ao salvar pedido: ", "#1D2D44", error);
    });
  } else {
    mostrarToastPixLike("Usuário não está logado.", "#1D2D44");
  }
}
