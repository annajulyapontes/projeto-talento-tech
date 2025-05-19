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
      alert("Pedido salvo no Firestore!");
    }).catch((error) => {
      console.error("Erro ao salvar pedido: ", error);
    });
  } else {
    alert("Usuário não está logado.");
  }
}
