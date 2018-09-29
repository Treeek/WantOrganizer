const fetch = require("node-fetch");
const getList = require("./planilha");
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
			const tipoCarta = carta.tipo.split(" —")[0];
			if (!listaTipos.includes(tipoCarta)) {
				listaTipos.push(tipoCarta);
			}
		}
		listaTipos.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
		for (const tipo of listaTipos) {
			console.log(tipo.toUpperCase());
			let qtd = 0;
			for (const carta of listaPolida) {
				if (carta.tipo.split(" —")[0] == tipo) {
					qtd++;
					console.log("\t", carta.nome);
				}
			}
			console.log("\ttotal:", qtd);
		}
		console.log("total:", listaPolida.length);
	} catch (err) {
		console.warn("Erro:", err);
	}
}

boot();