const listaSupertipos = [
	"Basic",
	"Legendary",
	"Ongoing",
	"Snow",
	"World"
];

exports.limparTipo = function (tipoCarta) {

	for (const superTipo of listaSupertipos) {
		tipoCarta = tipoCarta.replace(superTipo, "");
	}
	tipoCarta = tipoCarta.split(" —")[0];
	tipoCarta = tipoCarta.split(" //")[0];
	tipoCarta = tipoCarta.replace(/ /g, "");
	return tipoCarta;
};