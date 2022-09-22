const getUsuario = () => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            // return reject(new Error('DEU RUIM DE VERDADE!'))
            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)

    })
}
const getEndereco = (usuario) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                rua:'dos bobos'
            })
        },2000)
    })
}

const getTelefone = (usuario) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({
                telefone:'28 99932-8989'
            })
        }, 2000)
    })
}

const callWithoutPromiseAll = async (usuario) => {
    try {
        console.time('calledWithoutPromiseAll')
        const usuario = await getUsuario()
        console.log('espera', usuario)
        const telefone = await getTelefone()
        const endereco = await getEndereco()
        console.log(endereco)
        console.log(telefone)
        console.timeEnd('calledWithoutPromiseAll')
    }
    catch (e) {
        console.log(e)
    }
}
const callWithPromiseAll = async () => {
    try {
        console.time('calledWithPromiseAll')
        const usuario = await getUsuario()
        const resultados = await Promise.all([
            getEndereco(),
            getTelefone()
        ])
        console.log('Resultado do PromiseAll - ', resultados)
        console.timeEnd('calledWithPromiseAll')
    }
    catch (e) {
        console.log(e)
    }
}
callWithoutPromiseAll()
callWithPromiseAll()