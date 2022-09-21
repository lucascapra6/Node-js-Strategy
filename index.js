class Usuario {
    retornarDadosUsuario(callback) {
        setTimeout(() => {
            return callback({ nome: "Erick Wendel" });
        });
    }
}

let usuario = new Usuario();
usuario.retornarDadosUsuario((resultado) => {
    console.log(resultado);
    console.log('oi')
});
