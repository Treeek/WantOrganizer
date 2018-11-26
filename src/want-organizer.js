const getList = require("./planilha");
const fetch = require("node-fetch");

const WantOrganizer = {};

WantOrganizer.want = async function (linkPlanilha) {
	try {
		const listaTipos = [];
		const listaCartas = [];
		for (const carta of await getList(linkPlanilha)) {
			await fetchCarta(carta.nome).then((cartaJson) => {
				cartaJson.quantidade = carta.quantidade;
				cartaJson.tipo = tipoResolver(cartaJson.tipo);
				listaCartas.push(cartaJson);
				if (!listaTipos.includes(cartaJson.tipo)) {
					listaTipos.push(cartaJson.tipo);
				}
			});
		}
		listaTipos.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
		let want = {};
		want.total = 0;
		for (const tipo of listaTipos) {
			let qtdCarta = 0;
			for (const carta of listaCartas) {
				if (carta.tipo === tipo) {
					qtdCarta += parseInt(carta.quantidade);
					want[tipo] = carta;
				}
			}
			want.total += qtdCarta;
		}
		return JSON.stringify(want);
	} catch (err) {
		console.log(err);
	}
};

function tipoResolver(tipos) {
	const tiposArray = ["Land", "Creature", "Enchantment", "Artifact", "Planeswalker", "Instant", "Sorcery"];
	let maior = tiposArray.length;
	tipos.forEach(tipo => {
		if (tiposArray.indexOf(tipo) < maior && tiposArray.indexOf(tipo) > -1) {
			maior = tiposArray.indexOf(tipo);
		}
	});
	return tiposArray[maior];
}


async function fetchCarta(nomeCarta) {
	try {
		let res = await fetch(`https://api.magicthegathering.io/v1/cards?name="${nomeCarta}"&rarity=Mythic Rare|Common|Uncommon|Rare|Basic Land`);
		let cartas = await res.json(); //diferentes versões da mesma carta
		let carta = cartas.cards[0];
		return {
			nome: carta.name,
			tipo: carta.types,
			raridade: carta.rarity
		};
	} catch (err) {
		console.log(err);
	}
}

module.exports = WantOrganizer;