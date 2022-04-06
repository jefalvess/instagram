/* eslint-disable prettier/prettier */
const cloudant = require('./cloudant');
const instagram = require('./instagram');

var listaGanharSeguidores = [
    
];

// add usuario na fila de espera para ganhar seguidores
async function addListaPedidosSeguidores(user) {
    for (let i = 0; i < 5; i++) {
        listaGanharSeguidores.push(user);
    }
}

// add usuario na fila de espera para ganhar seguidores
async function get() {
    return listaGanharSeguidores
}

// Job para seguir contas de 1 em 1 minuto
async function job_seguidores() {

    for (let k = 0; k < 10000; k++) {

        console.log('RODAR JOB ', k);

        let usuarios = await buscar_usuarios();

        // Lista com todos os usuarios
        for (let i = 0; i < usuarios.length; i++) {
            let listaParaSeguir = await buscarPerfisNaLista(usuarios[i].userId);
            if (listaParaSeguir.length > 0) {
                usuarios[i]['ultimaAcao'] = Date.now();
                instagram.seguirPessoas(
                    usuarios[i].usuario,
                    usuarios[i].senha,
                    listaParaSeguir
                );
            }
        }

        await cloudant.bulkDocument(usuarios);

        await sleep(1000*60);
    }
}

// Buscar todos os usuarios
async function buscar_usuarios() {

    // puxar todos os usuarios
    const query = {
        selector: {},
    };
    let response = await cloudant.readDocument('proposals', query);

    response.docs.sort((a, b) => (a.ultimaAcao > b.ultimaAcao ? 1 : -1));

    return response.docs

}

// Puxar 5 contas para seguir
async function buscarPerfisNaLista(idUsuarioPrincipal) {
    let pefisParaSeguir = [];
    for (let index = 0; index < listaGanharSeguidores.length; index++) {
        if (
            pefisParaSeguir.indexOf(listaGanharSeguidores[index]) === -1 &&
            listaGanharSeguidores[index] !== null &&
            idUsuarioPrincipal !== listaGanharSeguidores[index]
        ) {
            pefisParaSeguir.push(listaGanharSeguidores[index]);
            listaGanharSeguidores[index] = null;
        }
        if (pefisParaSeguir.length > 4) {
            break;
        }
    }
    return pefisParaSeguir;
}


async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}



module.exports = {
    add: addListaPedidosSeguidores,
    get,
    job_seguidores
};
