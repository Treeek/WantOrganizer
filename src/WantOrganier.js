const fetch = require("node-fetch");
const getList = require("./src/planilha");
const tipoResolver = require("./src/tipo-resolver");
const urlScryfall = "https://api.scryfall.com/cards/named?exact=";



async function boot() {
	try {

		const listaTipos = [];
		const listaPolida = [];
		const list = await getList();
		for (const row of list) {
			let carta = await fetch(urlScryfall + row.nome).then((res) => {
				return res.json();
			}).then((carta) => {
				return {
					nome: carta.name,
					tipo: carta.type_line,
					quantidade: row.quantidade
				};
			});
			listaPolida.push(carta);
		}
		for (const carta of listaPolida) {
			let tipoCarta = carta.tipo;
			tipoCarta = tipoResolver.limparTipo(tipoCarta);
			if (!listaTipos.includes(tipoCarta)) {
				listaTipos.push(tipoCarta);
			}
		}
		listaTipos.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
		let qtdTotal = 0;
		for (const tipo of listaTipos) {
			console.log(tipo.toUpperCase());
			let qtdCarta = 0;
			for (const carta of listaPolida) {
				if (tipoResolver.limparTipo(carta.tipo) == tipo) {
					qtdCarta += parseInt(carta.quantidade);
					console.log("\t", carta.nome);
				}
			}
			qtdTotal += qtdCarta;
			console.log("\ttotal:", qtdCarta);
		}
		console.log("total:", qtdTotal, "cartas");
	} catch (err) {
		console.warn("Erro:", err);
	}
}

boot();