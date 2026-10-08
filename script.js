// ========================================
// MAPA
// ========================================

const mapa = L.map("mapa").setView(
    [-7.8829, -40.0818],
    14
);


// OpenStreetMap
L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        attribution: "&copy; OpenStreetMap"
    }
).addTo(mapa);


// ========================================
// FUNÇÃO PARA ESCOLHER A COR
// ========================================

function escolherCor(sombra) {

    if (sombra === "Pouca sombra") {
        return "red";
    }

    if (sombra === "Sombra moderada") {
        return "orange";
    }

    if (sombra === "Boa sombra") {
        return "green";
    }

    return "red";
}


// ========================================
// LOCAIS DE EXEMPLO
// ========================================

const locais = [

    {
        id: 1,
        lat: -7.8829,
        lng: -40.0818,
        nome: "Centro",
        sombra: "Pouca sombra",
        arvores: "Poucas árvores"
    },

    {
        id: 2,
        lat: -7.8780,
        lng: -40.0780,
        nome: "Praça",
        sombra: "Sombra moderada",
        arvores: "Algumas árvores"
    },

    {
        id: 3,
        lat: -7.8870,
        lng: -40.0850,
        nome: "Área arborizada",
        sombra: "Boa sombra",
        arvores: "Muitas árvores"
    }

];


// Locais adicionados pelo usuário
let locaisCriados = [];


// ========================================
// MOSTRAR INFORMAÇÕES DO LOCAL
// ========================================

function mostrarInformacoes(marcador, local) {

    const cor = escolherCor(local.sombra);

    marcador.setStyle({
        color: cor,
        fillColor: cor
    });


    marcador.bindPopup(`

        <div style="min-width: 220px;">

            <h3>📍 ${local.nome}</h3>

            <br>

            <label>
                ☀️ <strong>Quantidade de sombra:</strong>
            </label>

            <br><br>

            <select
                id="sombra-${local.id}"
                style="
                    width: 100%;
                    padding: 8px;
                    border-radius: 6px;
                "
            >

                <option value="Pouca sombra"
                    ${local.sombra === "Pouca sombra" ? "selected" : ""}>
                    🔴 Pouca sombra
                </option>

                <option value="Sombra moderada"
                    ${local.sombra === "Sombra moderada" ? "selected" : ""}>
                    🟠 Sombra moderada
                </option>

                <option value="Boa sombra"
                    ${local.sombra === "Boa sombra" ? "selected" : ""}>
                    🟢 Boa sombra
                </option>

            </select>

            <br><br>

            <button
                onclick="salvarSombra(${local.id})"
                style="
                    width: 100%;
                    padding: 8px;
                    background: #176b35;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                "
            >
                💾 Salvar alteração
            </button>

            <br><br>

            <p>
                🌳 <strong>Árvores:</strong>
                ${local.arvores}
            </p>

            <br>

            <button
                onclick="excluirLocal(${local.id})"
                style="
                    width: 100%;
                    padding: 8px;
                    background: #c62828;
                    color: white;
                    border: none;
                    border-radius: 6px;
                    cursor: pointer;
                "
            >
                🗑️ Excluir local
            </button>

        </div>

    `);
}


// ========================================
// CRIAR MARCADORES DOS LOCAIS DE EXEMPLO
// ========================================

locais.forEach(function(local) {

    const cor = escolherCor(local.sombra);

    const marcador = L.circleMarker(
        [local.lat, local.lng],
        {
            radius: 10,
            color: cor,
            fillColor: cor,
            fillOpacity: 0.8
        }
    );


    marcador.addTo(mapa);


    local.marcador = marcador;


    mostrarInformacoes(
        marcador,
        local
    );

});


// ========================================
// ADICIONAR LOCAL
// ========================================

let adicionando = false;


function ativarAdicionar() {

    adicionando = true;

    alert(
        "Agora clique no mapa onde você deseja adicionar o local."
    );

}


// ========================================
// QUANDO CLICAR NO MAPA
// ========================================

mapa.on("click", function(event) {

    if (!adicionando) {
        return;
    }


    const latitude = event.latlng.lat;
    const longitude = event.latlng.lng;


    // Nome do local
    const nome = prompt(
        "Qual o nome deste local?"
    );


    if (!nome) {

        adicionando = false;

        return;
    }


    // ====================================
    // ESCOLHER SOMBRA
    // ====================================

    const sombra = prompt(
        "Escolha a quantidade de sombra:\n\n" +
        "1 - 🔴 Pouca sombra\n" +
        "2 - 🟠 Sombra moderada\n" +
        "3 - 🟢 Boa sombra"
    );


    let sombraEscolhida;


    if (sombra === "1") {

        sombraEscolhida = "Pouca sombra";

    }

    else if (sombra === "2") {

        sombraEscolhida = "Sombra moderada";

    }

    else if (sombra === "3") {

        sombraEscolhida = "Boa sombra";

    }

    else {

        alert(
            "Você precisa escolher 1, 2 ou 3."
        );

        adicionando = false;

        return;
    }


    // ====================================
    // QUANTIDADE DE ÁRVORES
    // ====================================

    const arvores = prompt(
        "Quantas árvores existem aproximadamente neste local?"
    );


    // ====================================
    // CRIAR O LOCAL
    // ====================================

    const novoLocal = {

        id: Date.now(),

        lat: latitude,

        lng: longitude,

        nome: nome,

        sombra: sombraEscolhida,

        arvores: arvores || "Não informado"

    };


    const cor = escolherCor(
        novoLocal.sombra
    );


    const marcador = L.circleMarker(
        [latitude, longitude],
        {
            radius: 10,

            color: cor,

            fillColor: cor,

            fillOpacity: 0.8
        }
    );


    marcador.addTo(mapa);


    novoLocal.marcador = marcador;


    locaisCriados.push(
        novoLocal
    );


    mostrarInformacoes(
        marcador,
        novoLocal
    );


    marcador.openPopup();


    adicionando = false;

});


// ========================================
// ALTERAR SOMBRA
// ========================================

function salvarSombra(id) {

    let local = locaisCriados.find(
        item => item.id === id
    );


    if (!local) {

        local = locais.find(
            item => item.id === id
        );

    }


    if (!local) {
        return;
    }


    const select = document.getElementById(
        `sombra-${id}`
    );


    if (!select) {
        return;
    }


    local.sombra = select.value;


    const cor = escolherCor(
        local.sombra
    );


    local.marcador.setStyle({

        color: cor,

        fillColor: cor

    });


    mostrarInformacoes(
        local.marcador,
        local
    );


    local.marcador.openPopup();

}


// ========================================
// EXCLUIR LOCAL
// ========================================

function excluirLocal(id) {

    let local = locaisCriados.find(
        item => item.id === id
    );


    if (!local) {

        local = locais.find(
            item => item.id === id
        );

    }


    if (!local) {
        return;
    }


    const confirmar = confirm(
        "Tem certeza que deseja excluir este local?"
    );


    if (!confirmar) {
        return;
    }


    mapa.removeLayer(
        local.marcador
    );


    locaisCriados = locaisCriados.filter(
        item => item.id !== id
    );

}