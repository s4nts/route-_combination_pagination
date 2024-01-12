function gerarRotas() {
    const cidadesInput = document.getElementById("cidadesInput").value;
    const resultado = document.getElementById("output");
    resultado.innerHTML = "";

    const numColunas = 2;

    // Dividir a entrada em linhas e remover linhas vazias
    const linhas = cidadesInput.split('\n').filter(function (linha) {
        return linha.trim() !== '';
    });

    const cidades = linhas.map(function (linha) {
        return linha.trim();
    });

    const totalCidades = cidades.length;
    const itensPorPagina = 1809; // Defina o número de combinações por página
    const numPaginas = Math.ceil(totalCidades * totalCidades / itensPorPagina);
    
    const table = document.createElement("table");
    resultado.appendChild(table);

    const thead = document.createElement("thead");
    table.appendChild(thead);

    const headerRow = document.createElement("tr");
    thead.appendChild(headerRow);

    const criarCabecalho = (texto) => {
        const th = document.createElement("th");
        th.textContent = texto;
        headerRow.appendChild(th);
    };

    criarCabecalho("ORIGEM");
    criarCabecalho("DESTINO");

    const tbody = document.createElement("tbody");
    table.appendChild(tbody);

    let paginaAtual = 1;

    const mostrarPagina = (pagina) => {
        tbody.innerHTML = "";

        const inicio = (pagina - 1) * itensPorPagina;
        const fim = Math.min(inicio + itensPorPagina, totalCidades * totalCidades);

        const rotasEncontradas = new Set();

        for (let i = inicio; i < fim; i++) {
            const origemIndex = Math.floor(i / totalCidades);
            const destinoIndex = i % totalCidades;

            const origem = cidades[origemIndex];
            const destino = cidades[destinoIndex];

            const rota = origem + " - " + destino;

            if (!rotasEncontradas.has(rota)) {
                const row = document.createElement("tr");

                const cellOrigem = document.createElement("td");
                cellOrigem.textContent = origem;
                row.appendChild(cellOrigem);

                const cellDestino = document.createElement("td");
                cellDestino.textContent = destino;
                row.appendChild(cellDestino);

                tbody.appendChild(row);

                rotasEncontradas.add(rota);
            }
        }
    };

    mostrarPagina(paginaAtual);

    // Adicionar botões de navegação
    const criarBotao = (texto, onClick) => {
        const button = document.createElement("button");
        button.textContent = texto;
        button.addEventListener("click", onClick);
        resultado.appendChild(button);
    };

    criarBotao("Anterior", () => {
        if (paginaAtual > 1) {
            paginaAtual--;
            mostrarPagina(paginaAtual);
        }
    });

    criarBotao("Próxima", () => {
        if (paginaAtual < numPaginas) {
            paginaAtual++;
            mostrarPagina(paginaAtual);
        }
    });
}
