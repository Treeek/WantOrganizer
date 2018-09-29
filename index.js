const fetch = require("node-fetch");
const getList = require("./planilha");
const urlScryfall = "https://api.scryfall.com/cards/named?exact=";


async function boot() {
	try {
		const list = await getList();
		for (const row of list) {
			fetch(urlScryfall + row.nome).then((res) => {
				return res.json();
			}).then((carta) => {
				console.log(carta.name, carta.type_line);
			});
		}

	} catch (err) {
		console.warn(err);
	}
}
boot();