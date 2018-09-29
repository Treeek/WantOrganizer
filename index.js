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
	} catch (err) {
		console.warn(err);
	}
}

boot();